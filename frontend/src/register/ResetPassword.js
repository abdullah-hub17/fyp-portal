// IMPORTS -
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormControl, Input, Stack } from "@chakra-ui/react";
import { clearErrors, resetPassword } from "../redux/actions/studentAction";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();

  console.log(token);

  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.FORGOT_PASSWORD);
  const history = useNavigate();

  const resetSubmitHandler = (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.match(passwordRegex)) {
      toast.error(
        "Password must contain at least 8 characters including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
      );
      return;
    }

    dispatch(resetPassword(token, password, confirmPassword));
  };

  useEffect(() => {
    if (success) {
      toast.success("Your password has been reset successfully");
      history("/");
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, success, history]);

  return (
    <div className="main_div">
      <div className="container_1">
        <div className="auth">
          <form className="form login__form" onSubmit={resetSubmitHandler}>
            <FormControl>
              <Input
                type="password"
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </FormControl>

            <FormControl>
              <Input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            </FormControl>

            <Stack
              spacing={4}
              direction="row"
              flex
              justifyContent={"space-between"}
            >
              <Button colorScheme="blue" size="sm" type="submit">
                Submit
              </Button>
            </Stack>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
