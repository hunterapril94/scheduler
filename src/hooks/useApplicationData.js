import { useState,useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });  
  useEffect(() => {Promise.all([
    axios.get('http://localhost:8001/api/days'),
    axios.get('http://localhost:8001/api/appointments'),
    axios.get('http://localhost:8001/api/interviewers')
    
    ]).then((all) => {
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })},[]
  );



  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // Logic to update spots
    let correctDay;
    for(let day of state.days) {
      if(day.appointments.includes(id)) {
        correctDay = {...day, spots: day.spots-1};
      }
    }
    const days = state.days.splice(correctDay.id-1, 1, correctDay)
    return(axios.put(`http://localhost:8001/api/appointments/${id}`, {...appointment})
      .then((res)=>{
          setState(prev=> ({...prev, appointments, ...days}))
      }))
  }  
  
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]:appointment
    }
        // Logic to choose which day to update spots
        let correctDay;
        for(let day of state.days) {
          if(day.appointments.includes(id)) {
            correctDay= {...day, spots: day.spots+1};
          }
        }

    const days = state.days.splice(correctDay.id-1, 1, correctDay)

    return(axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then((res)=>{
      if(res.status < 400) {
        setState(prev=> ({...prev, appointments, ...days}))

      }}))
  }
  const setDay = day => setState({ ...state, day });

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const dailyInterviewers = getInterviewersForDay(state, state.day)

  return { state, setDay, bookInterview, cancelInterview, dailyAppointments, dailyInterviewers }
}