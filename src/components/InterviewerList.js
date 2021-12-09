import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map((i)=>{
    return(
      <InterviewerListItem 
        name={i.name}
        key={i.id}
        avatar={i.avatar}
        selected={i.id===props.value}
        setInterviewer={()=> props.onChange(i.id)}
      />
    )

  })
  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}