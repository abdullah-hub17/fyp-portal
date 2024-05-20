import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./../../coordinatorstylings/examSty/AssignExam.css";

const AssignExam = () => {
  const [createdExams, setCreatedExams] = useState([]);
  const [assignedExams, setAssignedExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch created exams from your API or source
  useEffect(() => {
    // Replace the following with your actual API call
    const fetchCreatedExams = async () => {
      try {
        const response = await fetch("your-api-endpoint/created-exams");
        const data = await response.json();
        setCreatedExams(data);
      } catch (error) {
        console.error("Error fetching created exams:", error);
      }
    };

    fetchCreatedExams();
  }, []);

  // Assign questions to a certain exam
  const assignQuestionsToExam = (exam) => {
    // Update the assigned exams list
    setAssignedExams([
      ...assignedExams,
      { ...exam, questions: [...selectedExam.questions] },
    ]);
    // Clear the selected exam and close the modal
    setSelectedExam(null);
    setIsModalOpen(false);
  };

  // Show questions popup modal
  const showQuestionsPopup = (exam) => {
    setSelectedExam(exam);
    setIsModalOpen(true);
  };

  // Close questions popup modal
  const closeQuestionsPopup = () => {
    setSelectedExam(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container-AE">
      <h2 className="h2-AE">Created Exams</h2>
      {createdExams.map((exam) => (
        <div key={exam.id}>
          <p>{exam.examType}</p>
          <p>{exam.batch}</p>
          <button onClick={() => showQuestionsPopup(exam)}>
            Assign Questions
          </button>
        </div>
      ))}

      <h2 className="h2-AE">Assigned Exams</h2>
      {assignedExams.map((exam) => (
        <div key={exam.id}>
          <p>{exam.examType}</p>
          <p>{exam.batch}</p>
          <button onClick={() => showQuestionsPopup(exam)}>
            Show Questions
          </button>
        </div>
      ))}

      {/* Questions Popup Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={closeQuestionsPopup}>
        <h2>
          {selectedExam &&
            `Assign Questions to ${selectedExam.examType} - ${selectedExam.batch}`}
        </h2>
        {/* Render questions for the selected exam */}
        {selectedExam && (
          <ul>
            {selectedExam.questions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        )}
        <button onClick={() => assignQuestionsToExam(selectedExam)}>
          Assign Questions
        </button>
        <button onClick={closeQuestionsPopup}>Close</button>
      </Modal>
    </div>
  );
};

export default AssignExam;
