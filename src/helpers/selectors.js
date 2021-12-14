export function getAppointmentsForDay(state, day) {
  let correctDay={};
  let appointments=[];
  for(let i=0; i<state.days.length; i++) {
    if(state.days[i].name === day) {
      correctDay=state.days[i]
    }
  }
  // console.log(correctDay);
  // console.log(correctDay.appointments)
  if(correctDay && correctDay.appointments) {
    for(let i=0; i < correctDay.appointments.length; i++) {
      let id = correctDay.appointments[i]
      appointments.push(state.appointments[`${id}`])
    }
  }
  return appointments
}

export function getInterview(state, interview) {
  let result=null;
  if(interview) {
    result = {
    student: interview.student,
    interviewer: {
      id: interview.interviewer,
      name: state.interviewers[interview.interviewer].name,
      avatar: state.interviewers[interview.interviewer].avatar
    }} 
  };
  return result;
}
export function getInterviewersForDay(state, day) {
  let correctDay={};
  let interviewers=[];
  for(let i=0; i<state.days.length; i++) {
    if(state.days[i].name === day) {
      correctDay=state.days[i]
    }
  }
  // console.log(correctDay);
  // console.log(correctDay.interviewers)
  if(correctDay && correctDay.interviewers) {
    for(let i=0; i < correctDay.interviewers.length; i++) {
      let id = correctDay.interviewers[i]
      interviewers.push(state.interviewers[`${id}`])
      // console.log(interviewers)
    }
  }
  return interviewers
}