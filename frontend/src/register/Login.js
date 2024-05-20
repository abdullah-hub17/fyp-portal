// IMPORTS -
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  clearMessages,
  login,
  register,
} from "../redux/actions/authAction";
import Loader from "../components/Loader";
import { FormControl, Button, Input, Stack, Select } from "@chakra-ui/react";
import "../styles/Login.css";

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const { isAuth, message, loading, error, user } = useSelector(
    (state) => state.AUTH
  );
  console.log(user);
  const [state, setState] = useState(false);
  const [heading, setHeading] = useState("Login");

  const submitLogin = (event) => {
    event.preventDefault();
    const form = new FormData();
    form.set("email", loginEmail);
    form.set("password", loginPassword);

    dispatch(login(form, role));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

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

    const form = new FormData();
    form.set("email", email);
    form.set("password", password);
    form.set("name", name);

    dispatch(register(form));
  };

  const changeState = (e) => {
    e.preventDefault();
    setHeading("Register");
    setState(true);
  };

  const revertState = (e) => {
    e.preventDefault();
    setHeading("Login");
    setState(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
      dispatch(clearMessages());
    }

    if (message && !error) {
      toast.success(message);
      dispatch(clearMessages());
    }

    if (isAuth && user?.role === "student") {
      history("/dashboard");
    } else if (isAuth && user?.role === "coordinator") {
      history("/CoordinatorDashboard");
    } else if (isAuth && user?.role === "supervisor") {
      history("/superdashboard");
    }
  }, [error, message, dispatch, isAuth, history, user?.role]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="main_div">
          <div className="container_1">
            <h1 className="fyp-header-1">FYP PORTAL</h1>
            {!state ? (
              <>
                <div className="auth">
                  <h1 className="head">{heading}</h1>

                  <form className="form login__form" onSubmit={submitLogin}>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setLoginEmail(e.target.value)}
                        value={loginEmail}
                      />
                    </FormControl>

                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setLoginPassword(e.target.value)}
                        value={loginPassword}
                      />
                    </FormControl>

                    <FormControl>
                      <Select
                        placeholder="Select Role"
                        onChange={(e) => setRole(e.target.value)}
                        required={true}
                      >
                        <option value="student">Student</option>
                        <option value="supervisor">Supervisor</option>
                        <option value="coordinator">Coordinator</option>
                      </Select>
                    </FormControl>

                    <Stack spacing={4} direction="row" flex justifyContent={"space-between"}>
                      <Button colorScheme="blue" size="sm" type="submit">
                        Proceed
                      </Button>

                      <Button variant="ghost" size="sm" type="button" onClick={() => history("/password/forgot")}>
                        Forgot Password?
                      </Button>
                    </Stack>
                  </form>

                  <div className="signup-1" onClick={changeState}>
                    {" "}
                    Don't have an account?
                    <button type="button">click here</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="auth">
                  <h1 className="head">{heading}</h1>

                  <form className="form login__form" onSubmit={registerSubmit}>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    </FormControl>

                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </FormControl>

                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </FormControl>

                    <Stack spacing={4} direction="row" align="center">
                      <Button colorScheme="blue" size="sm" type="submit">
                        Proceed
                      </Button>
                    </Stack>
                  </form>

                  <div className="signup-1" onClick={revertState}>
                    {" "}
                    Already have an account?
                    <button type="button">click here</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
