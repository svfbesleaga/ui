import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { useForm, Controller } from "react-hook-form";
import { useSessionDispatch, LoginFormState } from "../session";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { signin, register } from "../fakeAuth";

type LoginRegisterFormProps = {
  type: "Login" | "Register";
  color: "teal" | "blue";
};

const LoginRegisterForm = ({ type, color }: LoginRegisterFormProps) => {
  const dispatch = useSessionDispatch();
  let history = useHistory();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, errors, control, formState, reset } = useForm({
    mode: "onChange"
  });
  const onSubmit = async (values: LoginFormState) => {
    setLoading(true);
    try {
      switch (type) {
        case "Login":
          await signin(values);
          break;
        case "Register":
          await register(values);
      }
      dispatch({ type: "loginRegister", payload: values });
      reset({ email: "", password: "" });
      setLoading(false);
      switch (type) {
        case "Login":
          history.push("/");
          break;
        case "Register":
          history.push("/login");
      }
    } catch {
      reset({ email: "", password: "" });
      dispatch({ type: "loginRegister", payload: { email: "", password: "" } });
      setLoading(false);
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color={color} textAlign="center">
          Log-in to your account
        </Header>
        <Form onSubmit={handleSubmit(onSubmit)} size="large">
          <Segment stacked>
            <Controller
              as={Form.Input}
              name="email"
              control={control}
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Email Address"
              rules={{
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Please enter a valid email address"
                }
              }}
              error={
                errors.email
                  ? {
                      content: "Please enter a valid email address",
                      pointing: "below"
                    }
                  : false
              }
            />
            <Controller
              as={Form.Input}
              name="password"
              control={control}
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              rules={{
                required: true
              }}
              error={
                errors.password
                  ? {
                      content: "Please enter your password",
                      pointing: "below"
                    }
                  : false
              }
            />
            <Button
              disabled={!formState.isValid}
              type="submit"
              color={color}
              fluid
              size="large"
              loading={loading}
            >
              {type}
            </Button>
          </Segment>
        </Form>
        {type === "Login" ? (
          <Message>
            New Account? <Link to="/register">Register</Link>
          </Message>
        ) : (
          ""
        )}
      </Grid.Column>
    </Grid>
  );
};

export default LoginRegisterForm;
