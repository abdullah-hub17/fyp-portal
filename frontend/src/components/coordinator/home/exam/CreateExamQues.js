import React, { useState } from "react";
import "./../../coordinatorstylings/examSty/CreateExamQues.css";

const CreateExamQues = () => {
  const [question, setQuestion] = useState("");
  // const [options, setOptions] = useState([]);
  // const [answer, setAnswer] = useState("");
  const [questionsList, setQuestionsList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let questionObject = {
      question: question,
      // options: options,
      // answer: answer,
    };
    setQuestionsList([...questionsList, questionObject]);
    setQuestion("");
    // setOptions([]);
    // setAnswer("");
  };

  // const handleAddOption = () => {
  //   setOptions([...options, ""]);
  // };

  const handleChange = (e, index) => {
    if (index !== undefined) {
      // let updatedOptions = [...options];
      // updatedOptions[index] = e.target.value;
      // setOptions(updatedOptions);
    } else {
      switch (e.target.name) {
        case "question":
          setQuestion(e.target.value);
          break;
        // case "answer":
        //   setAnswer(e.target.value);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="container-CEQ">
      <h1 className="title-CEQ">Create Exam Questions</h1>
      <form className="form-CEQ" onSubmit={handleSubmit}>
        <div className="inner-CEQ">
          <label className="label-CEQ">Question:</label>
          <input
            className="input-CEQ"
            type="text"
            name="question"
            value={question}
            onChange={handleChange}
          />
        </div>
        {/* <div className="inner-CEQ">
          <label className="label-CEQ">Options:</label>
          {options.map((option, index) => (
            <input
              className="input-CEQ"
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleChange(e, index)}
            />
          ))}
          <button className="btn" type="button" onClick={handleAddOption}>
            Add Option
          </button>
        </div> */}
        {/* <div className="inner-CEQ">
          <label>Answer:</label>
          <input
            className="input-CEQ"
            type="text"
            name="answer"
            value={answer}
            onChange={handleChange}
          />
        </div> */}
        <button className="btn" type="submit">
          Add Question
        </button>
      </form>
      <div className="inner-CEQ">
        <h2 className="listTitle-CEQ">Questions List:</h2>
        <ul className="ulist-CEQ">
          {questionsList.map((question, index) => (
            <li key={index}>{question.question}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateExamQues;
