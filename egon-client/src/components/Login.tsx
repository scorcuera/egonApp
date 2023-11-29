import { AuthContext } from "../contexts/auth.context.tsx";
import { AuthUser } from "../interfaces/user.interface.ts";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { logInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogIn = async (data: AuthUser) => {
    const isLoggedIn = await logInUser(data);
    console.log(isLoggedIn);
    if (isLoggedIn == undefined) {
      navigate("/login");
    }
    navigate("/userDashboard")
  }

  return (
    <div className="form__container">
      <div className="form__image">

      </div>
      <form className="form__element" action="" onSubmit={handleSubmit(handleLogIn)}>
        <div className="form__message">
          <p>Welcome !</p>
          <p>Enter your details to sign in</p>
        </div>
        <div className="form__input-container">
          <div className="form__input">
            <label>User email</label>
            <input type="text" {...register("UserEmail")} />
          </div>
          <div className="form__input">
            <label>Password</label>
            <input type="text" {...register("Password")} />
          </div>
        </div>
        <button className="form__submit-btn" type="submit">Log in</button>
      </form>
    </div>

  )
}

export default Login
