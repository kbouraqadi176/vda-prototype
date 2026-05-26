import { WOUNDS, PCM_TYPES, RESULT_TEXTS } from "./data.js";

export function shuffle(items){
  const copy = [...items];
  for(let i = copy.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function drawBalancedCycle(questions, categories, perCategory = 4){
  const buckets = Object.fromEntries(categories.map(category => [category, shuffle(questions.filter(q => q.category === category))]));
  const lot = [];
  for(let cycle = 0; cycle < perCategory; cycle++){
    const categoryOrder = shuffle(categories);
    for(const category of categoryOrder){
      const next = buckets[category]?.[cycle];
      if(next) lot.push({...next, originalIndex: questions.indexOf(next)});
    }
  }
  return lot;
}

export function drawSimple(questions, count){
  return shuffle(questions).slice(0, count).map(q => ({...q, originalIndex: questions.indexOf(q)}));
}

export function applyPresentationFilter(question, context){
  // Important: in the neutral base, this returns the same wording.
  // Later, optional universes can transform title/prompt only after the raw draw.
  return {
    ...question,
    presentationMode: context?.mode || "neutral",
    rawQuestionId: question.id,
    rawOriginalIndex: question.originalIndex
  };
}

export function scoreVda(answers){
  const scores = Object.fromEntries(WOUNDS.map(w => [w, 0]));

  const addAnswer = answer => {
    const weight = answer?.weight ?? 1;
    Object.entries(answer?.scores || {}).forEach(([key, value]) => {
      scores[key] = (scores[key] || 0) + (value * weight);
    });
  };

  answers.forEach(answer => {
    if(Array.isArray(answer)) answer.forEach(addAnswer);
    else addAnswer(answer);
  });

  return normalizeScores(scores);
}

export function scorePcm(rankings){
  const scores = Object.fromEntries(PCM_TYPES.map(t => [t, 0]));
  const maxPoints = PCM_TYPES.length;
  rankings.forEach(rankedAnswers => {
    rankedAnswers.forEach((answer, index) => {
      scores[answer.type] += maxPoints - index;
    });
  });
  return normalizeScores(scores);
}

export function scoreShadow(answers){
  const scores = {};
  answers.forEach(answer => {
    scores[answer.key] = (scores[answer.key] || 0) + 1;
  });
  return normalizeScores(scores);
}

function normalizeScores(scores){
  const ordered = Object.entries(scores).sort((a,b) => b[1] - a[1]);
  const top = Math.max(ordered[0]?.[1] || 1, 1);
  return ordered.map(([key, score]) => ({key, score, percent: Math.round((score / top) * 100)}));
}

export function buildVdaResult(scored){
  const main = scored[0];
  const second = scored[1];
  const text = RESULT_TEXTS.wounds[main.key];
  const secondText = RESULT_TEXTS.wounds[second.key];
  return {
    kind:"vda",
    title:`Lecture principale : ${text.label}`,
    summary:`Tes réponses semblent indiquer ${text.summary}`,
    details:[
      `Besoin possible : ${text.need}`,
      `Nuance secondaire : ${secondText.label} peut aussi colorer certaines réactions.`,
      `Prochain pas : ${text.step}`
    ],
    coach:[
      `Hypothèse principale : ${text.label} (${main.percent}%).`,
      `Hypothèse secondaire : ${secondText.label} (${second.percent}%).`,
      "À vérifier en entretien : contexte réel, intensité, répétition, ressources déjà présentes."
    ],
    scores:scored
  };
}

export function buildPcmResult(scored){
  const base = scored[0];
  const phase = scored[1];
  const baseText = RESULT_TEXTS.pcm[base.key];
  const phaseText = RESULT_TEXTS.pcm[phase.key];
  return {
    kind:"pcm",
    title:`Base : ${base.key} · Phase : ${phase.key}`,
    summary:`Tes classements semblent indiquer une base ${base.key} et une phase ${phase.key}. Les autres étages sont lus en pourcentage relatif, pas comme une identité figée.`,
    details:[
      `Besoins psychologiques principaux : ${baseText.need}.`,
      `Canal conseillé : ${baseText.channel}.`,
      `Signal de stress possible : ${phaseText.stress}.`,
      `Prochain pas : ${baseText.step}`
    ],
    coach:[
      `Base PCM : ${base.key} fixée à 100%.`,
      `Phase PCM : ${phase.key} lue comme deuxième axe principal.`,
      "Les autres scores servent à lire la disponibilité relative des autres étages."
    ],
    scores:scored
  };
}

export function buildShadowResult(scored){
  const main = scored[0];
  const text = RESULT_TEXTS.shadow[main.key];
  return {
    kind:"shadow",
    title:`Réaction forte : ${main.key}`,
    summary:`Tes réponses semblent indiquer une tendance à passer par ${main.key} quand l’émotion devient forte. Ce n’est pas une faute : c’est une tentative de protection à comprendre.`,
    details:[
      `Besoin caché possible : ${text.need}.`,
      `Piste de régulation : ${text.regulation}`
    ],
    coach:[
      `Mécanisme observé : ${main.key}.`,
      "À lire avec prudence : chercher la fonction protectrice avant de chercher à corriger le comportement."
    ],
    scores:scored
  };
}
