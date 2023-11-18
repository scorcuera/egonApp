import { AuthContext } from "../contexts/auth.context.tsx";
import AuthUser from "../../interfaces/user.interface.ts";
import { useForm } from "react-hook-form";
import { useContext } from "react";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { logInUser } = useContext(AuthContext);

    const handleLogIn = async (data: AuthUser) => {
        logInUser(data);
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
