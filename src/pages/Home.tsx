import React from "react";
import { Button } from "semantic-ui-react";
import { useSessionDispatch } from "../session";
import { useHistory } from "react-router-dom";

function Home() {
  const dispatch = useSessionDispatch();
  let history = useHistory();

  const handleClick = () => {
    dispatch({ type: "logout", payload: { email: "", password: "" } });
    history.push("/login");
  };

  return <Button onClick={handleClick}>Signout</Button>;
}

export default Home;
