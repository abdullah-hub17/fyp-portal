import { Button, FormControl, Input, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPassword, clearErrors, clearMessages } from '../redux/actions/studentAction';
import toast from 'react-hot-toast';

const ForgotPassword = () => {

    const history = useNavigate();
    const dispatch = useDispatch();
    const {message, error} = useSelector((state) => state.FORGOT_PASSWORD);
    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
      };
 
      useEffect(() => {
      
           if (error) {
            toast.error(error);
          dispatch(clearErrors());
        }
    
        if (message) {
            toast.success(message); 
            dispatch(clearMessages());
             }  
      }, [dispatch, error, message]);
    

    return (
        <>
              <div className="main_div">
              <div className="container_1">
                     <div className="auth">    
                      <form className="form login__form" onSubmit={forgotPasswordSubmit}>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => {setEmail(e.target.value)}}
                            value={email}
                            required
                          />
                        </FormControl>
    
                        <Stack spacing={4} direction="row" flex justifyContent={"space-between"}>
                          <Button colorScheme="blue" size="sm" type="submit">
                            Submit
                          </Button>
    
                          <Button variant={"ghost"} size="sm" type="button" onClick={() => history("/")}>
                            Back
                          </Button>
                        </Stack>
                      </form>
                        </div>
                    </div>
                    </div>
                  </>
               
     );
}

export default ForgotPassword;