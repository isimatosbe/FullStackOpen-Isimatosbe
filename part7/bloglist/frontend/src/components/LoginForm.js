import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";

const LoginForm = ({ username, resetUsername, password, resetPassword }) => {
  const dispatch = useDispatch();

  const loginHandler = (event) => {
    event.preventDefault();
    
    dispatch(loginUser(username.value, password.value));
    resetUsername()
    resetPassword()
  };
  return (
    <div class="mx-0 grid min-w-full py-10 px-10">
      <h2 class="text-center text-xl font-bold">Log in to application</h2>
      <form onSubmit={loginHandler} class="w-full">
        <div class="mb-2 block text-sm font-bold text-gray-700">
          Username:
          <input
            id="username"
            type="text"
            value={username.value}
            name="Username"
            onChange={username.onChange}
            class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div class="mb-2 block text-sm font-bold text-gray-700">
          Password:
          <input
            id="password"
            type="password"
            value={password.value}
            name="Password"
            onChange={password.onChange}
            class="focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div>
          <button
            id="login-button"
            type="submit"
            class="mt-3 items-center rounded bg-purple-900 py-2 px-4 font-bold text-white hover:bg-blue-400"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
};

export default LoginForm;
