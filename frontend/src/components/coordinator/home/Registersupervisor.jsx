import React, { useEffect, useState } from "react";
import "../coordinatorstylings/Registersupervisor.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader";
import toast from "react-hot-toast";
import {
  Coordinator_Register_SUPERVISOR,
  clearErrors,
  clearMessages,
} from "../../../redux/actions/coordinatorAction";

const Registersupervisor = () => {
  const initialFormData = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const dispatch = useDispatch();
  const { error, loading, message, success } = useSelector(
    (state) => state.COORDINATOR_CREATE_ANNOUNCEMENT
  );
  

  const { name, email, password } = formData;

  const changeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit_handeler = (e) => {
    e.preventDefault();
    var form = new FormData();

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.match(passwordRegex)) {
      toast.error(
        "Password must contain at least 8 characters including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
      );
      return;
    }
  
    form.append("name", name);
    form.append("email", email);
    form.append("password", password);
  
    
  
    dispatch(Coordinator_Register_SUPERVISOR(form)   
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
    
  }, [success, message, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container-two">
            <h1 className="title-two">REGISTER SUPERVISOR</h1>
            <div className="inner-two">
              <form className="form-two" onSubmit={submit_handeler} encType="multipart/form-data" method="post">
                <label className="label-two">
                  Name:
                  <input
                    type="text"
                    className="input-two"
                    id="name"
                    name="name"
                    value={name}
                    onChange={changeHandler}
                  />
                </label>
                <br />
                <label className="label-two">
                  Email:
                  <input
                    className="input-two"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={changeHandler}
                  />
                </label>
                <br />
                <label className="label-two">
                  Password:
                  <input
                    className="input-two"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={changeHandler}
                  />
                </label>

                <button className="btn" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Registersupervisor;
