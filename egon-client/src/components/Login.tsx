import { AuthContext } from "../contexts/auth.context.tsx";
import { AuthUser } from "../interfaces/user.interface.ts";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, InputGroup, InputRightElement, InputLeftElement, Button, Stack } from '@chakra-ui/react';
import { EmailIcon } from "@chakra-ui/icons";
import "./Login.css";

const Login = () => {
  const { register, handleSubmit } = useForm<AuthUser>();
  const { logInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show)

  const handleLogIn = async (data: AuthUser): Promise<void> => {
    const userData = await logInUser(data);
    if (!userData) {
      navigate("/login");
    } else {
      navigate("/userDashboard")
    }
  }

  return (
    <div className="form__container">
      <div className="form__image">

      </div>
      <form className="form__element" action="" onSubmit={handleSubmit(handleLogIn)}>
        <div className="form__message">
          <p>Welcome back !</p>
          <p>Enter your details to sign in</p>
        </div>
          <Stack spacing={6}>
            <InputGroup w='md'>
              <InputLeftElement pointerEvents='none'>
                <EmailIcon color='gray.300' />
              </InputLeftElement>
              <Input type='tel' placeholder='Enter your email' {...register("email")} autoComplete="off" />
            </InputGroup>
            <InputGroup>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                {...register("password")}
                autoComplete="off"
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Stack>
 
        <button className="form__submit-btn" type="submit">Log in</button>
      </form>
    </div>

  )
}

export default Login

