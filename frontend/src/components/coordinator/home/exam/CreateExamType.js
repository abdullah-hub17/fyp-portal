import React, { useState } from "react";
import "./../../coordinatorstylings/examSty/CreateExamType.css";

const ExamForm = () => {
  const [examTypes, setExamTypes] = useState([]);

  const handleAddExamType = (e) => {
    e.preventDefault();
    setExamTypes([...examTypes, e.target.examType.value]);
    e.target.examType.value = '';
  }

  const handleDeleteExamType = (index) => {
    const newExamTypes = [...examTypes];
    newExamTypes.splice(index, 1);
    setExamTypes(newExamTypes);
  }

  return (
    <div className="container-ET">
      <form className="form-ET" onSubmit={handleAddExamType}>
        <label className="label-ET">
          Exam Name:
          <input className="input-ET" type="text" name="examType" />
        </label>
        <button className="btn-primary-1" type="submit">Add</button>
      </form>
      <div className="inner-ET">
        {examTypes.map((examType, index) => (
          <div key={index}>
            {examType}
            <button className="btn-primary-2" onClick={() => handleDeleteExamType(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExamForm;