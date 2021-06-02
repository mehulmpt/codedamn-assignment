import React, { useContext, useState } from "react";
import { useMutation } from "react-query";
import { RegisterApi } from "src/utils/Apis";
import { Link, Redirect } from "react-router-dom";
import { Context, ContextType } from "src/data/context";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn, loggedIn, setUserData } = useContext(
    Context
  ) as ContextType;

  const RegisterMutation = useMutation(() => RegisterApi(email, password), {
    onSuccess: (response) => {
      setUserData(response.data);
      setLoggedIn(true);
      localStorage.setItem("userData", JSON.stringify(response.data));
    },
    onError: (error: Error) => {
      console.log(error.message);
      alert("Something went wrong");
    },
  });

  const handleRegister = () => {
    if (!email.trim().length) {
      alert("email cannot be empty");
      return;
    }
    if (!password.trim().length) {
      alert("password cannot be empty");
      return;
    }
    RegisterMutation.mutate();
  };

  if (loggedIn) {
    return <Redirect to="/playground" />;
  }

  return (
    <div className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-two-fifths">
            <h1 className="title has-text-centered">Register</h1>
            <div className="field">
              <label className="label">Email</label>
              <div className="control ">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control ">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>

            <button className="button is-primary mt-5" onClick={handleRegister}>
              Register
            </button>

            <div className="mt-5">
              <Link to="login">Already have an account? Login Here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
