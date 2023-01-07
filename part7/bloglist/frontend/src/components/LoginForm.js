import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";

const LoginForm = ({
  username,
  password,
}) => {
  const dispatch = useDispatch()

  const loginHandler = (event) => {
    event.preventDefault()

    dispatch(loginUser(username.value, password.value))
  }
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={loginHandler}>
        <div>
          Username
          <input
            id="username"
            type="text"
            value={username.value}
            name="Username"
            onChange={username.onChange}
          />
        </div>
        <div>
          Password
          <input
            id="password"
            type="password"
            value={password.value}
            name="Password"
            onChange={password.onChange}
          />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
};

export default LoginForm;
