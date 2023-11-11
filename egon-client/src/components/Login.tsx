import AuthUser from "../../interfaces/user.interface.ts";
import loginHandler from "../handlers/loginHandler.tsx";

import { useForm } from "react-hook-form";

const Login = () => {
    const { register, handleSubmit } = useForm();

    const handleLogIn = async (data: AuthUser) => {
        await loginHandler(data);
    }

  return (
    <div>
            <form action="" onSubmit = {handleSubmit(handleLogIn)}>
                <label>User email</label>
                <input type="text" {...register("UserEmail")} />
                <br />
                <br />
                <label>Password</label>
                <input type="text" {...register("Password")} />
                <br />
                <button type="submit">Log in</button>
            </form>
        </div>
  )
}

export default Login
