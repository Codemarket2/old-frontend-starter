import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link, Redirect } from "react-router-dom";

import { Auth } from "aws-amplify";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      verify: false,
      code: "",
      disabled: false,
      auth: false,
    };
  }

  signUp = () => {
    const { password, email, name } = this.state;

    Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email,
        name: name,
      },
    })
      .then((res) => {
        this.setState({
          password: "",
          name: "",
          verify: true,
          disabled: false,
        });
      })
      .catch((err) => {
        this.setState({ ...this.state, disabled: false });
        alert(err.message);
      });
  };

  confirmSignUp = () => {
    const { email, code } = this.state;
    Auth.confirmSignUp(email, code)
      .then((res) => {
        this.setState({
          code: "",
          email: "",
          disabled: false,
          auth: true,
        });
        // this.props.history.push("/signin");
      })
      .catch((err) => {
        this.setState({ ...this.state, disabled: false });
        alert(err.message);
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { verify } = this.state;
    this.setState({ ...this.state, disabled: true });
    if (verify) {
      this.confirmSignUp();
    } else {
      this.signUp();
    }
    e.target.reset();
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { email, password, name, code, verify, auth, disabled } = this.state;
    if (auth) {
      return <Redirect to="/signin" />;
    } else if (verify) {
      return (
        <div className="mt-4">
          <h1 className="text-center">Account Verification</h1>
          <small>Verification code has been sent to {email}</small>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="code">Verification Code</Label>
              <Input
                onChange={this.handleChange}
                value={code}
                type="text"
                name="code"
                id="code"
                placeholder="Code"
                required
              />
            </FormGroup>
            <div class="d-flex justify-content-between">
              <Button type="submit" color="primary" disabled={disabled}>
                Verify
              </Button>
            </div>
          </Form>
        </div>
      );
    } else {
      return (
        <div className="mt-4">
          <h1 className="text-center">Sign Up Form</h1>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                onChange={this.handleChange}
                value={name}
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                onChange={this.handleChange}
                value={email}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                onChange={this.handleChange}
                value={password}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
              />
            </FormGroup>
            <div class="d-flex justify-content-between">
              <Button type="submit" color="primary" disabled={disabled}>
                Sign Up
              </Button>
              <Link to="/signin">
                <small>Already have account? SignIn</small>
              </Link>
            </div>
          </Form>
        </div>
      );
    }
  }
}
