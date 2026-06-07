import { VDA_QUESTIONS, PCM_QUESTIONS, SHADOW_QUESTIONS, WOUNDS } from "./data.js";
import { drawBalancedCycle, drawSimple, applyPresentationFilter, scoreVda, scorePcm, scoreShadow, buildVdaResult, buildPcmResult, buildShadowResult, shuffle } from "./engine.js";
import { loadState, saveState, resetActiveSession, addJournalEntry } from "./store.js";

const app = document.querySelector("#app");
let state = loadState();
let pendingResult = null;

const templates = {
  consent:"tpl-consent",
  identification:"tpl-identification",
  hub:"tpl-hub",
  test:"tpl-test",
  result:"tpl-result",
  journal:"tpl-journal",
  coach:"tpl-coach"
};

function render(templateName){
  const tpl = document.getElementById(templates[templateName]);
  app.replaceChildren(tpl.content.cloneNode(true));
}

function route(){
  if(!state.consent) return showConsent();
  if(!state.user) return showIdentification();
  if(state.activeSession) return showTest();
  return showHub();
}

function showConsent(){
  render("consent");
  document.getElementById("acceptConsent").onclick = () => {
    const checked = document.getElementById("consentCheck").checked;
    if(!checked) return alert("Coche le cadre de consentement pour continuer.");
    state.consent = true;
    saveState(state);
    route();
  };
}

function showIdentification(){
  render("identification");
  document.getElementById("saveIdentity").onclick = () => {
    const name = document.getElementById("playerName").value.trim() || "Utilisateur test";
    const coach = document.getElementById("coachName").value.trim();
    state.user = {id:`user_${Date.now()}`, name, coach};
    saveState(state);
    route();
  };
}

function showHub(){
  render("hub");
  document.getElementById("hubTitle").textContent = `Bienvenue ${state.user?.name || ""}`;
  const resumeBox = document.getElementById("resumeBox");
  resumeBox.innerHTML = `<strong>État</strong><br>${state.journal.length} résultat(s) enregistré(s).<br>${state.user?.coach ? `Coach associé : ${escapeHtml(state.user.coach)}` : "Aucun coach associé."}`;
  const vdaCount = drawBalancedCycle(VDA_QUESTIONS, WOUNDS, 4).length;
  document.getElementById("vdaTestBlurb").textContent = `${vdaCount} situations concrètes, tirées en cycle équilibré pour repérer des tendances possibles.`;
  document.querySelectorAll("[data-start-test]").forEach(btn => {
    btn.onclick = () => startTest(btn.dataset.startTest);
  });
}

function startTest(kind){
  const session = {
    id:`${kind}_${Date.now()}`,
    kind,
    createdAt:new Date().toISOString(),
    index:0,
    answers:[],
    filterAtDraw:{mode:"neutral"},
    lot:[]
  };
  if(kind === "vda") session.lot = drawBalancedCycle(VDA_QUESTIONS, WOUNDS, 4);
  if(kind === "pcm") session.lot = drawSimple(PCM_QUESTIONS, 12);
  if(kind === "shadow") session.lot = drawSimple(SHADOW_QUESTIONS, 10);
  state.activeSession = session;
  saveState(state);
  showTest();
}

function showTest(){
  render("test");
  const session = state.activeSession;
  const rawQuestion = session.lot[session.index];
  const q = applyPresentationFilter(rawQuestion, session.filterAtDraw);

  document.getElementById("testMeta").textContent = `${labelTest(session.kind)} · question ${session.index + 1} / ${session.lot.length}`;
  document.getElementById("questionTitle").textContent = q.title;
  document.getElementById("questionText").textContent = q.prompt;
  document.getElementById("progressBar").style.width = `${((session.index + 1) / session.lot.length) * 100}%`;

  document.getElementById("pauseTest").onclick = () => {
    saveState(state);
    alert("Pause enregistrée. À la prochaine ouverture, ce test reprendra ici.");
    showHubAfterPauseWarning();
  };
  document.getElementById("backHomeDuringTest").onclick = () => alert("Un test est actif. Mets en pause ou termine la question pour éviter de casser les réponses.");

  if(session.kind === "pcm") renderRankingQuestion(q);
  else if(session.kind === "vda") renderVdaDualChoiceQuestion(q);
  else renderSingleChoiceQuestion(q);
}

function renderSingleChoiceQuestion(q){
  const zone = document.getElementById("answerZone");
  zone.className = "answer-list";
  let selected = null;
  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.className = "answer-option";
    btn.type = "button";
    btn.innerHTML = `<span class="badge">${index + 1}</span><span>${escapeHtml(answer.text)}</span>`;
    btn.onclick = () => {
      selected = answer;
      zone.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    };
    zone.appendChild(btn);
  });
  document.getElementById("continueTest").onclick = () => {
    if(!selected) return alert("Choisis une réponse pour continuer.");
    advance(selected);
  };
}

function renderVdaDualChoiceQuestion(q){
  const zone = document.getElementById("answerZone");
  zone.className = "answer-list";
  const selected = [];
  const continueBtn = document.getElementById("continueTest");

  const help = document.createElement("p");
  help.className = "tiny-note";
  help.textContent = "Choisis 2 réponses : d’abord celle qui te ressemble le plus, puis une deuxième qui te parle aussi.";
  zone.appendChild(help);

  const refresh = () => {
    zone.querySelectorAll("button.answer-option").forEach((btn, index) => {
      const position = selected.indexOf(q.answers[index]);
      btn.classList.toggle("selected", position !== -1);
      const badge = btn.querySelector(".badge");
      badge.textContent = position === -1 ? String(index + 1) : (position === 0 ? "1er" : "2e");
    });
    continueBtn.disabled = selected.length !== 2;
  };

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.className = "answer-option";
    btn.type = "button";
    btn.innerHTML = `<span class="badge">${index + 1}</span><span>${escapeHtml(answer.text)}</span>`;
    btn.onclick = () => {
      const existingIndex = selected.indexOf(answer);
      if(existingIndex !== -1){
        selected.splice(existingIndex, 1);
      }else{
        if(selected.length >= 2) selected.shift();
        selected.push(answer);
      }
      refresh();
    };
    zone.appendChild(btn);
  });

  continueBtn.onclick = () => {
    if(selected.length !== 2) return alert("Choisis 2 réponses pour continuer : d’abord la plus proche de toi, puis une deuxième.");
    advance(selected.map((answer, index) => ({
      text: answer.text,
      scores: answer.scores,
      weight: index === 0 ? 1 : 0.5
    })));
  };

  refresh();
}

function renderRankingQuestion(q){
  const zone = document.getElementById("answerZone");
  const ranked = shuffle(q.answers);
  zone.className = "rank-list";
  drawRankedList(zone, ranked);
  document.getElementById("continueTest").onclick = () => advance([...ranked]);
}

function drawRankedList(zone, ranked){
  zone.innerHTML = "";
  ranked.forEach((answer, index) => {
    const row = document.createElement("div");
    row.className = "rank-item";
    row.innerHTML = `<span><strong>${index + 1}.</strong> ${escapeHtml(answer.text)}</span>`;
    const up = document.createElement("button");
    up.textContent = "↑";
    up.type = "button";
    up.disabled = index === 0;
    up.onclick = () => { [ranked[index - 1], ranked[index]] = [ranked[index], ranked[index - 1]]; drawRankedList(zone, ranked); };
    const down = document.createElement("button");
    down.textContent = "↓";
    down.type = "button";
    down.disabled = index === ranked.length - 1;
    down.onclick = () => { [ranked[index + 1], ranked[index]] = [ranked[index], ranked[index + 1]]; drawRankedList(zone, ranked); };
    row.append(up, down);
    zone.appendChild(row);
  });
}

function advance(answer){
  const session = state.activeSession;
  session.answers.push(answer);
  if(session.index + 1 >= session.lot.length){
    pendingResult = buildResult(session);
    resetActiveSession(state);
    return showResult(pendingResult);
  }
  session.index += 1;
  saveState(state);
  showTest();
}

function buildResult(session){
  if(session.kind === "vda") return buildVdaResult(scoreVda(session.answers));
  if(session.kind === "pcm") return buildPcmResult(scorePcm(session.answers));
  return buildShadowResult(scoreShadow(session.answers));
}

function showResult(result){
  render("result");
  document.getElementById("resultMeta").textContent = `${labelTest(result.kind)} · résultat neutre`;
  document.getElementById("resultTitle").textContent = result.title;
  document.getElementById("resultSummary").textContent = result.summary;
  document.getElementById("resultDetails").innerHTML = toList(result.details) + renderBars(result.scores);
  document.getElementById("coachDetails").innerHTML = toList(result.coach);
  document.getElementById("saveResult").onclick = () => {
    addJournalEntry(state, result);
    pendingResult = null;
    showJournal();
  };
}

function showJournal(){
  render("journal");
  const filterTest = document.getElementById("filterTest");
  const filterSearch = document.getElementById("filterSearch");
  const update = () => renderJournalList(filterTest.value, filterSearch.value.trim().toLowerCase());
  filterTest.onchange = update;
  filterSearch.oninput = update;
  update();
}

function renderJournalList(test, term){
  const list = document.getElementById("journalList");
  const entries = state.journal.filter(entry => {
    const okTest = test === "all" || entry.test === test;
    const corpus = `${entry.title} ${entry.summary} ${entry.mode} ${new Date(entry.date).toLocaleDateString("fr-FR")}`.toLowerCase();
    return okTest && (!term || corpus.includes(term));
  });
  if(!entries.length){
    list.innerHTML = `<section class="card"><p>Aucun résultat enregistré pour ce filtre.</p></section>`;
    return;
  }
  list.innerHTML = entries.map(entry => `
    <article class="journal-entry">
      <p class="eyebrow">${labelTest(entry.test)} · ${new Date(entry.date).toLocaleString("fr-FR")}</p>
      <details>
        <summary>${escapeHtml(entry.title)}</summary>
        <p>${escapeHtml(entry.summary)}</p>
        <div class="details-box">${toList(entry.details)}${renderBars(entry.scores)}</div>
      </details>
    </article>`).join("");
}

function showCoach(){
  render("coach");
  const panel = document.getElementById("coachPanel");
  if(!state.journal.length){
    panel.innerHTML = `<div class="notice"><strong>Aucune donnée</strong><span>Le coach verra les résultats enregistrés après les tests.</span></div>`;
    return;
  }
  panel.innerHTML = state.journal.map(entry => `
    <article class="journal-entry">
      <p class="eyebrow">${labelTest(entry.test)} · hypothèse de suivi</p>
      <h2>${escapeHtml(entry.title)}</h2>
      <p>${escapeHtml(entry.summary)}</p>
      <div class="details-box">${toList(entry.coach)}</div>
    </article>`).join("");
}

function showHubAfterPauseWarning(){
  app.innerHTML = `<section class="card narrow"><h1>Pause enregistrée</h1><p>Le test actif est sauvegardé. À la reprise, l’application affichera directement la question en cours.</p><div class="actions"><button class="primary" id="resumeNow" type="button">Reprendre maintenant</button></div></section>`;
  document.getElementById("resumeNow").onclick = showTest;
}

function labelTest(kind){
  return {vda:"Blessures de l’âme / VDA", pcm:"PCM", shadow:"Ombre"}[kind] || kind;
}

function toList(items){
  return `<ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderBars(scores){
  if(!scores?.length) return "";
  return `<div class="bars">${scores.map(s => `<div class="bar-row"><strong>${escapeHtml(s.key)}</strong><div class="bar-track"><span style="width:${s.percent}%"></span></div><span>${s.percent}%</span></div>`).join("")}</div>`;
}

function escapeHtml(value){
  return String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#039;",'"':"&quot;"}[char]));
}

document.addEventListener("click", event => {
  const action = event.target?.dataset?.action;
  if(!action) return;
  if(action === "home") return route();
  if(action === "journal") return showJournal();
  if(action === "coach") return showCoach();
});

route();
