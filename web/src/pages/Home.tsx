import React, { useContext } from "react";
import { Context, ContextType } from "src/data/context";
import { Redirect } from "react-router-dom";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { loggedIn } = useContext(Context) as ContextType;

  if (loggedIn) {
    return <Redirect to="/playground" />;
  } else {
    return <Redirect to="/login" />;
  }
};
export default Home;
