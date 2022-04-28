import React, { useState } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { useForm, Controller } from "react-hook-form";
import { useSessionDispatch, LoginFormState } from "../session";
import { useHistory } from "react-router-dom";
import { register } from "../fakeAuth";

const RegisterForm = () => {
  const dispatch = useSessionDispatch();
  let history = useHistory();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, errors, control, formState } = useForm({
    mode: "onChange"
  });
  const onSubmit = async (values: LoginFormState) => {
    setLoading(true);
    try {
      await register(values);
      dispatch({ type: "loginRegister", payload: values });
      setLoading(false);
    } catch {}
    history.push("/login");
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          Register New Account
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
              color="blue"
              fluid
              size="large"
              loading={loading}
            >
              Register
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default RegisterForm;
