import React, { useState } from "react";
import "./../../coordinatorstylings/clo/ManageClo.css";

const ManageClo = ({ cloList }) => {
  const [evaluationResults, setEvaluationResults] = useState([]);

  const evaluateCLO = () => {
    const results = cloList.map((clo) => ({
      clo,
      evaluation: clo.toLowerCase().includes("good") ? "Good CLO" : "Not Good CLO",
    }));

    setEvaluationResults(results);
  };

  return (
    <div>
      <h2>Evaluate CLOs</h2>
      <button onClick={evaluateCLO}>Evaluate CLOs</button>
      <ul>
        {evaluationResults.map((result, index) => (
          <li key={index}>
            {result.clo} - {result.evaluation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageClo;
