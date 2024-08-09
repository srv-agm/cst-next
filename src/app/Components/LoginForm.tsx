"use client";
import {
  loginAction,
  LoginFormState,
  ServerError,
  validationError,
} from "./actions";
import React from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useFormState, useFormStatus } from "react-dom";

export default function LoginForm() {
  //@ts-ignore
  const [state, action] = useFormState<LoginFormState>(loginAction, {
    username: "",
    password: "",
    message: "",
  });
  return (
    <Form action={action} className="d-flex flex-column">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          placeholder="john.doe@mail.com"
          name="username"
        />
        {(state?.errors as validationError)?.username && (
          <p className="text-danger text-sm">
            {(state?.errors as validationError)?.username}
          </p>
        )}
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" />
        {(state?.errors as validationError)?.password && (
          <p className="text-danger text-sm">
            {(state?.errors as validationError)?.password}
          </p>
        )}
      </Form.Group>
      {(state?.errors as ServerError)?.message && (
        <p className="text-danger text-sm">
          {(state?.errors as ServerError)?.message}
        </p>
      )}
      <LoginButton />
    </Form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      className="mt-2 text-center"
      variant="primary"
      type="submit"
      disabled={pending}
    >
      {!pending && "Login"}
      {pending && <Spinner size="sm" />}
    </Button>
  );
}
