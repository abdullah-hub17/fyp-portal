import React, { useState, useEffect } from "react";

import { Student_FYP_3, clearErrors, clearMessages } from "../../../redux/actions/studentAction";

import "../studentstylings/Fyp3.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader";
import toast from "react-hot-toast";

const Fyp3 = () => {
  const [file, setFile] = useState(""); // Corrected variable name
  const dispatch = useDispatch();
  const { error, loading, message, success } = useSelector(
    (state) => state.STUDENT_FYP_3
  );

  const handleDocumentSubmit = (e) => {
    e.preventDefault()
    
      // Dispatch the Redux action to upload the document
      dispatch(Student_FYP_3(file));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessages());
    }
    if (success === "null" && message) {
      toast.error(message);
      dispatch(clearMessages());
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [success, message, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="student_fyp3_main_div">
          <h4 className="h4-fyp3">
            Final Year Project Management and Tracking System
          </h4>
          <h1 className="h1-fyp3">FYP 3</h1>

          <div className="student_fyp3_upload_document">
            <h2 className="h2-fyp3">Upload Document</h2>
            <form onSubmit={handleDocumentSubmit} enctype="multipart/form-data">

            <input
              className="input-fyp3"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept="/*"
              />
            <button className="button-fyp3" type="submit">
              Submit Document
            </button>
              </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Fyp3;
