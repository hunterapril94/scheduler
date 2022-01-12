import { useState,useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";
require('dotenv').config()

const api = process.env.REACT_APP_WEBSOCKET_URL

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });  
  useEffect(() => {Promise.all([
  
    axios.get(api + '/api/days'),
    axios.get(api + '/api/appointments'),
    axios.get(api + '/api/interviewers')
    
    ]).then((all) => {  console.log(api)
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })},[]
  );

    function appointmentIncluded(id) {
      if(state.appointments[id].interview === null) {
        return false;
      } else {

        console.log(state.appointments[id])
        return true;
      }
      
    }

  function bookInterview(id, interview) {
    const appointmentThere = appointmentIncluded(id) 
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
    let days;
    for(let day of state.days) {
      if(day.appointments.includes(id) && appointmentThere === false) {
        correctDay = {...day, spots: day.spots-1};
        days = state.days.splice(correctDay.id-1, 1, correctDay)
      } else {
        correctDay = day
        days = state.days
      }
    }
  
    return(axios.put(api + `/api/appointments/${id}`, {...appointment})
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

    return(axios.delete(api + `/api/appointments/${id}`)
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