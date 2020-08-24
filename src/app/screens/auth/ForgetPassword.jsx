import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      code: "",
      password: "",
      confirmPassword: "",
      verify: false,
      disabled: false,
    };
  }

  forgetPassword = () => {
    const { email } = this.state;
    this.setState({ ...this.state, disabled: true });
    Auth.forgotPassword(email)
      .then((res) => {
        this.setState({
          disabled: false,
          verify: true,
        });
      })
      .catch(({ message }) => {
        this.setState({ ...this.state, disabled: false });
        alert(message);
      });
  };

  resetPassword = () => {
    const { email, code, password, confirmPassword } = this.state;

    if (password === confirmPassword) {
      Auth.forgotPasswordSubmit(email, code, password)
        .then((res) => {
          this.setState({
            code: "",
            email: "",
            password: "",
            confirmPassword: "",
            disabled: false,
          });
        })
        .catch((err) => {
          this.setState({ ...this.state, disabled: false });
          alert(err.message);
        });
    } else {
      Alert("Password and Confirm Password doesn't Match!");
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { verify } = this.state;
    this.setState({ ...this.state, disabled: true });
    if (verify) {
      this.resetPassword();
    } else {
      this.forgetPassword();
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
    const {
      email,
      code,
      password,
      confirmPassword,
      disabled,
      verify,
    } = this.state;
    if (verify) {
      return (
        <div className="mt-4">
          <h1 className="text-center">Reset Password</h1>
          <small className="text-center">
            Verification code has been send to {email}
          </small>
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
          <Form onSubmit={this.handleSubmit}>
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
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                onChange={this.handleChange}
                value={confirmPassword}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                required
              />
            </FormGroup>
            <div class="d-flex justify-content-between">
              <Button type="submit" color="primary" disabled={disabled}>
                Reset Password
              </Button>
            </div>
          </Form>
        </div>
      );
    } else {
      return (
        <div className="mt-4">
          <h1 className="text-center">Get Password Reset Code</h1>
          <Form onSubmit={this.handleSubmit}>
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
            <div class="d-flex justify-content-between">
              <Button type="submit" color="primary" disabled={disabled}>
                Forget Password
              </Button>
              <Link to="/signup">
                <small>Create new account? SignUp</small>
              </Link>
            </div>
          </Form>
        </div>
      );
    }
  }
}
