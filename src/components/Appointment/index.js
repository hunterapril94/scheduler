import React from "react";
import 'components/Appointment/styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY"
const SHOW = "SHOW"
const CREATE = "CREATE"
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);
function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };
  transition(SAVING)
  props.bookInterview(props.id, interview).then(transition(SHOW, true))
}
function onDelete() {
  transition(CONFIRM)
}
function onConfirm() {
  transition(DELETING)
  props.cancelInterview(props.id).then(transition(EMPTY, true)).catch(err=>console.log(err.message))
}
  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer.name} onDelete={onDelete}/>}
      {mode === EMPTY && <Empty onAdd={()=>{transition(CREATE)}} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => {
        back();
        console.log("cancelled");
        }} onSave={save}/>}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm onCancel={() => {
        back();
        console.log("cancelled");
        }} onConfirm={onConfirm} message="Delete this Appointment?" />}
    </article>
  )
}