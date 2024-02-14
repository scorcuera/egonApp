import { AuthUser } from "../interfaces/user.interface.ts";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service.ts";
import { Input, InputGroup, RadioGroup, Radio, InputRightElement, Flex, Button, Stack, Text } from '@chakra-ui/react';
import "./Login.css";

const Register = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const handleSignUp = async (data: AuthUser): Promise<void> => {
        const result = await authService.registerUser(data);
        console.log(result)
    }

    return (
        <div className="form__container">
            <div className="form__image">

            </div>
            <form className="form__element" action="" onSubmit={handleSubmit(handleSignUp)}>
                <div className="form__message">
                    <p>Create account</p>
                    <p>Enter your details to sign up</p>
                </div>
                <Stack spacing={6}>
                    <Flex w='md' flexDirection='column'>
                        <Text mb='8px'>Your name</Text>
                        <InputGroup w='md' flexDirection="column">
                            <Input
                                type='tel'
                                placeholder='Enter your user name'
                                {...register("Username")}
                                autoComplete="off"
                            />
                        </InputGroup>
                    </Flex>
                    <Flex flexDirection='column' mb='8px'>
                        <Text mb='8px'>Your email</Text>
                        <InputGroup w='md' flexDirection="column">
                            <Input
                                type='tel'
                                placeholder='Enter your email'
                                {...register("UserEmail")}
                                autoComplete="off"
                            />
                        </InputGroup>
                    </Flex>
                    <Flex flexDirection='column' mb='8px'>
                        <Text mb='8px'>Your role</Text>
                        <RadioGroup defaultValue='1'>
                            <Stack spacing={4} direction='row'>
                                <Radio
                                    value='1'
                                    {...register("UserRole")}>
                                    Trainer
                                </Radio>
                                <Radio
                                    value='2'
                                    {...register("UserRole")}>
                                    Manager
                                </Radio>
                            </Stack>
                        </RadioGroup>
                    </Flex>
                    <Flex flexDirection='column' w='md'>
                        <Text mb='8px'>Create a password</Text>
                        <InputGroup>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                {...register("Password")}
                                autoComplete="off"
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Flex>
                </Stack>

                <button className="form__submit-btn" type="submit">Sign up</button>
            </form>
        </div>

    )
}

export default Register

