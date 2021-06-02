import React, { useContext, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthResponse, Context, ContextType } from "./data/context";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Playground from "./pages/Playground";
import Register from "./pages/Register";

interface routesProps {}

const Routes: React.FC<routesProps> = () => {
  const { setLoggedIn, isLoading, setIsLoading, setUserData } = useContext(
    Context
  ) as ContextType;

  useEffect(() => {
    const rawData = localStorage.getItem("userData");
    if (rawData) {
      const data = JSON.parse(rawData) as AuthResponse;
      setUserData(data);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setIsLoading(false);
  }, [setLoggedIn, setIsLoading, setUserData]);

  if (isLoading) {
    return (
      <div className="has-text-centered">
        <h1 className="subtitle">Loading....</h1>
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/playground" component={Playground} />
      <Redirect to="/" />
    </Switch>
  );
};
export default Routes;
