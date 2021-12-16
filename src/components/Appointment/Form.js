import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import { useState } from "react";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const [error, setError] = useState("");
  const reset = function() {
    setStudent("")
    setInterviewer("")
    setError("")
  }
  function validate() {
    // validates that all required info is passed
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Interviewer cannot be blank")
      return;
    }
  
    props.onSave(student, interviewer);
    setError("")
  }
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
            data-testid="student-name-input"

          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={()=>{props.onCancel(); reset();}}>Cancel</Button>
          <Button confirm onClick={()=> {validate()}}>Save</Button>
        </section>
      </section>
    </main>
  )
}