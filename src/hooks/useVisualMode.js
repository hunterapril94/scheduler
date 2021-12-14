import React, {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(transitionMode, replace=false) {
    setMode(transitionMode);
    if(!replace) {

      setHistory(prev => [...prev, transitionMode]);
    }
  }
  function back() {
    if(history.length>1) {
      history.pop()
      setMode(history[history.length-1])
    }
  }
  return  {mode, transition, back};
}