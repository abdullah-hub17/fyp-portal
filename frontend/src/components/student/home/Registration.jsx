import React, { useEffect, useState } from "react";
import "../studentstylings/Registration.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader";
import toast from "react-hot-toast";
import {
  Register_Student_FYP,
  STUDENT_CURRENT_SUPERVISORS,
  clearErrors,
  clearMessages,
} from "../../../redux/actions/studentAction";

const Registration = () => {
  const initialFormData = {
    supervisorname: "",
    projecttitle: "",
    teamleader1name: "",
    member2name: "",
    member3name: "",
    regid1: "",
    regid2: "",
    regid3: "",
    gpa1: "",
    gpa2: "",
    gpa3: "",
    file: "",
  };
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState(initialFormData);

  const dispatch = useDispatch();
  const { error, loading, message, success, supervisors } = useSelector(
    (state) => state.STUDENT_FYP_REGISTRATION
  );

  const {
    supervisorname,
    projecttitle,
    teamleader1name,
    member2name,
    member3name,
    regid1,
    regid2,
    regid3,
    gpa1,
    gpa2,
    gpa3,
  } = formData;

  const changeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit_handeler = (e) => {
    e.preventDefault();
    var form = new FormData();
    form.set("projecttitle", projecttitle);
    form.set("supervisorname", supervisorname);
    form.set("teamleader1name", teamleader1name);
    form.set("member2name", member2name);
    form.set("member3name", member3name);
    form.set("regid1", regid1);
    form.set("regid2", regid2);
    form.set("regid3", regid3);
    form.set("gpa1", gpa1);
    form.set("gpa2", gpa2);
    form.set("gpa3", gpa3);
    form.set("file", file);

    dispatch(
      Register_Student_FYP({
        supervisorname,
        projecttitle,
        teamleader1name,
        member2name,
        member3name,
        regid1,
        regid2,
        regid3,
        gpa1,
        gpa2,
        gpa3,
        file,
      })
    );
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

    dispatch(STUDENT_CURRENT_SUPERVISORS());
  }, [success, message, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="student_registration_main-container">
            <h4 className="h4-top">
              Final Year Project Management and Tracking System
            </h4>
            <h1 className="h1-studentregistration">Student FYP Enrolled</h1>
            <div className="registration_container">
              <form
                className="formclass"
                onSubmit={submit_handeler}
                enctype="multipart/form-data"
                method="post"
              >
                <div className="form-row1">
                  <div className="form-group1">
                    <label htmlFor="supervisorname">Supervisor</label>
                    <select
                      type="text"
                      className="form-control"
                      id="supervisorname"
                      name="supervisorname"
                      value={supervisorname}
                      onChange={changeHandler}
                    >
                      <option value="" defaultValue selected>
                        Select
                      </option>
                      {supervisors &&
                        supervisors.map((supervisor) => (
                          <option key={supervisor._id} value={supervisor.name}>
                            {supervisor.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group1">
                    <label htmlFor="projecttitle">Project Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      id="projecttitle"
                      name="projecttitle"
                      value={projecttitle}
                      onChange={changeHandler}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="teamleader1name">Team lead</label>
                    <input
                      type="text"
                      className="form-control1"
                      id="teamleader1name"
                      name="teamleader1name"
                      placeholder="name"
                      value={teamleader1name}
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="regid1">Registration id</label>
                    <input
                      type="text"
                      className="form-control"
                      id="regid1"
                      name="regid1"
                      placeholder="ID"
                      value={regid1}
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gpa1"> CGPA</label>
                    <input
                      type="text"
                      className="form-control"
                      id="gpa1"
                      name="gpa1"
                      placeholder="CGPA"
                      value={gpa1}
                      onChange={changeHandler}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="member2name">Member 2</label>
                    <input
                      type="text"
                      className="form-control1"
                      id="member2name"
                      name="member2name"
                      placeholder="name"
                      value={member2name}
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="regid2">Registration Id</label>
                    <input
                      type="text"
                      className="form-control"
                      id="regid2"
                      name="regid2"
                      placeholder="ID"
                      value={regid2}
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gpa2"> CGPA</label>
                    <input
                      type="text"
                      className="form-control"
                      id="gpa2"
                      name="gpa2"
                      placeholder="CGPA"
                      value={gpa2}
                      onChange={changeHandler}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="member3name">Member 3</label>
                    <input
                      type="text"
                      className="form-control1"
                      id="member3name"
                      name="member3name"
                      placeholder="name"
                      value={member3name} // member_three_name
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="regid3">Registration Id</label>
                    <input
                      type="text"
                      className="form-control"
                      id="regid3"
                      name="regid3"
                      placeholder="ID"
                      value={regid3}
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gpa3">CGPA</label>
                    <input
                      type="text"
                      className="form-control"
                      id="gpa3"
                      name="gpa3"
                      placeholder="CGPA"
                      value={gpa3}
                      onChange={changeHandler}
                    />
                  </div>
                </div>

                <h2>Project Proposal</h2>

                <div className="form-group">
                  <input
                    type="file"
                    className="form-control"
                    accept="application/pdf"
                    required
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>

                <div className="form-group button-group">
                  <button className="button-studentregistration" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Registration;
