import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import { useState } from "react";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const reset = function() {
    setStudent("")
    setInterviewer("")
  }
  // const cancel = function() {
  //   return(reset, props.onCancel)
  // }
  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            onSubmit={(event)=>event.preventDefault()}
            className="appointment__create-input text--semi-bold"
            name="name"
            text="text"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            placeholder="Enter Student Name"

          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>Cancel</Button>
          <Button confirm onClick={()=> {props.onSave(student, interviewer)}}>Save</Button>
        </section>
      </section>
    </main>
  )
}