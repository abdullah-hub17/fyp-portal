import React, { useState } from "react";
import "./../../coordinatorstylings/examSty/ScheduleExam.css";

const ScheduleExam = () => {
  const [examType, setExamType] = useState("");
  const [venue, setVenue] = useState("");
  const [panel, setPanel] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [scheduledExams, setScheduledExams] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExam = {
      examType,
      venue,
      panel,
      date,
      time,
    };

    setScheduledExams([...scheduledExams, newExam]);

    //   sendEmail(examType, date, time);

    //   const sendEmail = (examType, date, time) => {
    //     emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    //       examType: examType,
    //       date: date,
    //       time: time,
    //     });
    //  };
  };

  return (
    <div className="container-SE">
      <form className="form-SE" onSubmit={handleSubmit}>
        <label className="label-SE">
          <div className="new2">Exam Type:</div>
          <select
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
          >
            <option className="opt-SE" value="">
              Select Exam Type
            </option>
            <option className="opt-SE" value="exam2">
              Orientation
            </option>
            <option className="opt-SE" value="exam1">
              Proposal
            </option>
            <option className="opt-SE" value="exam2">
              Mid-2
            </option>
            <option className="opt-SE" value="exam2">
              Final-2
            </option>
            <option className="opt-SE" value="exam2">
              Mid-3
            </option>
            <option className="opt-SE" value="exam2">
              Final-3
            </option>
          </select>
        </label>
        <br />
        <label className="label-SE">
          <div className="new2">Venue:</div>
          <select value={venue} onChange={(e) => setVenue(e.target.value)}>
            <option className="opt-SE" value="">
              Select Venue
            </option>
            <option className="opt-SE" value="venue1">
              Venue 1
            </option>
            <option className="opt-SE" value="venue2">
              Venue 2
            </option>
            <option className="opt-SE" value="venue3">
              Venue 3
            </option>
          </select>
        </label>
        <br />
        <label className="label-SE">
          <div className="new2">Panels:</div>
          <select value={panel} onChange={(e) => setPanel(e.target.value)}>
            <option className="opt-SE" value="">
              Select Panel
            </option>
            <option className="opt-SE" value="Panel1">
              Panel 1
            </option>
            <option className="opt-SE" value="Panel2">
              Panel 2
            </option>
            <option className="opt-SE" value="Panel3">
              Panel 3
            </option>
          </select>
        </label>
        <br />
        <label className="label-SE">
          <div className="new2">Date:</div>
          <input
            className="input-SE"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <label className="label-SE">
          <div className="new2">Time:</div>
          <input
            className="input-SE"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <button className="btn button" type="submit">
          Schedule
        </button>
        <button className="btn button" type="submit">
          Send Email
        </button>
      </form>
      <h2 className="panel-SE">Scheduled Exams</h2>
      <ul className="ulist-SE">
        {scheduledExams.map((exam, index) => (
          <li className="list-SE" key={index}>
            <b>{exam.examType}</b> on {exam.date} at {exam.time} in {exam.venue}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleExam;
