import React from "react";
import 'components/Appointment/styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import useApplicationData from "hooks/useApplicationData";

const EMPTY = "EMPTY"
const SHOW = "SHOW"
const CREATE = "CREATE"
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"


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
  props.bookInterview(props.id, interview).then(transition(SHOW)).catch(err=>transition(ERROR_SAVE, true))

}
function onDelete() {
  transition(CONFIRM)
}
function onConfirm() {  
  transition(DELETING, true)
  props.cancelInterview(props.id).then(transition(EMPTY)).catch(err=>transition(ERROR_DELETE, true))

}
  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer.name} onDelete={onDelete} onEdit={()=>{transition(EDIT)}}/>}
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
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={() => {
        back();
        console.log("cancelled");
        }} onSave={save}/>}
      {mode === ERROR_DELETE && <Error message="There was an error deleting your message" onClose={back}/>}
      {mode === ERROR_SAVE && <Error message="There was an error saving your message" onClose={back}/>}

    </article>
  )
}