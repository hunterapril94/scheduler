import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(transitionMode, replace=false) {
  
    setMode(transitionMode);
    if(!replace && history > 1) {

      setHistory(prev => [...prev, transitionMode]);
    }
  }
  function back() {
    if(history.length > 1) {
      let newHistory = history.slice(0, -1)
      setHistory({...newHistory})
      setMode(history[history.length-1])
    } else {
      setMode(history[0])
    }
  }
  return  {mode, transition, back};
}