const KEY = "vda_neutral_clean_v1";

const initialState = {
  consent:false,
  user:null,
  activeSession:null,
  journal:[]
};

export function loadState(){
  try{
    return {...initialState, ...JSON.parse(localStorage.getItem(KEY) || "{}")};
  }catch{
    return {...initialState};
  }
}

export function saveState(state){
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function resetActiveSession(state){
  state.activeSession = null;
  saveState(state);
}

export function addJournalEntry(state, result){
  state.journal.unshift({
    id:`entry_${Date.now()}`,
    date:new Date().toISOString(),
    test:result.kind,
    title:result.title,
    summary:result.summary,
    details:result.details,
    coach:result.coach,
    scores:result.scores,
    mode:"neutre officiel"
  });
  saveState(state);
}
