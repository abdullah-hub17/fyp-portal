import React, { useState } from "react";
import "./../../coordinatorstylings/examSty/CreateExam.css";

const CreateExam = () => {
  const [exam, setExam] = useState({ examName: "", examType: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExam({ ...exam, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(exam);
  };

  return (
    <div className="container-CE">
      <h2 className="title-CE">Create Exam</h2>
      <form className="form-CE" onSubmit={handleSubmit}>
        <label className="label-CE">
          <div className="new1">Exam Name:</div>
          <input
            className="input-CE"
            type="text"
            name="examName"
            value={exam.examName}
            onChange={handleChange}
          />
        </label>
        <label className="label-CE">
          <div className="new1">Exam Type:</div>
          <select name="examType" value={exam.examType} onChange={handleChange}>
            <option className="opt-CE" value="">
              Select Exam Type
            </option>
            <option className="opt-CE" value="Orientation">
              Orientation
            </option>
            <option className="opt-CE" value="Proposal">
              Proposal
            </option>
            <option className="opt-CE" value="Mid-Term">
              Mid-2
            </option>
            <option className="opt-CE" value="Final-Term">
              Final-2
            </option>
            <option className="opt-CE" value="Mid-Term">
              Mid-3
            </option>
            <option className="opt-CE" value="Mid-Term">
              Final-3
            </option>
          </select>
        </label>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateExam;
