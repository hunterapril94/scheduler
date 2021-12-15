import React, {useState, useEffect} from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";

import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {state, setDay, bookInterview, cancelInterview, dailyAppointments, dailyInterviewers} = useApplicationData()
  useApplicationData();
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"></nav>

        <DayList days={state.days} value={state.day} onChange={setDay} />
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview)
          console.log(interview)
          return (
            <Appointment key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview}
            interviewers={dailyInterviewers}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview} />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
