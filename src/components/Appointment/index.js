import React from "react";
import 'components/Appointment/styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY"
const SHOW = "SHOW"
const CREATE = "CREATE"


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);
  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/>}
      {mode === EMPTY && <Empty onAdd={()=>{transition(CREATE)}} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => {
        back();
        console.log("cancelled");
        }}/>}
    </article>
  )
}