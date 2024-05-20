

import React, { useState } from "react";
import "./../../coordinatorstylings/clo/CreateClo.css";

const CreateCLO = () => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [clos, setCLOs] = useState([]);

  const availableQuestions = [
    { id: 1, text: 'Question 1' },
    { id: 2, text: 'Question 2' },
    { id: 3, text: 'Question 3' },
    // Add more questions as needed
  ];

  const handleQuestionSelect = (question) => {
    setSelectedQuestions([...selectedQuestions, question]);
  };

  const handleCLORemove = (index) => {
    const updatedCLOs = [...clos];
    updatedCLOs.splice(index, 1);
    setCLOs(updatedCLOs);
  };

  const handleCLOCreate = () => {
    setCLOs([...clos, selectedQuestions]);
    setSelectedQuestions([]);
  };

  return (
    <div className="create-clo-container">
      <h2 className="create-clo-heading">Create CLO</h2>
      <h3>Select Questions</h3>
      <ul className="question-list">
        {availableQuestions.map((question) => (
          <li key={question.id} className="question-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                onChange={() => handleQuestionSelect(question)}
                checked={selectedQuestions.includes(question)}
              />
              {question.text}
            </label>
          </li>
        ))}
      </ul>
      <button className="create-clo-button" onClick={handleCLOCreate}>Create CLO</button>
      <h3>Created CLOs</h3>
      <ul className="created-clo-list">
        {clos.map((clo, index) => (
          <li key={index} className="clo-item">
            CLO {index + 1}
            <button className="remove-button" onClick={() => handleCLORemove(index)}>Remove</button>
            <ul>
              {clo.map((question) => (
                <li key={question.id}>{question.text}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateCLO;
