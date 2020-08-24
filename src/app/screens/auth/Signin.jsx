import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import { showLoading, hideLoading } from "react-redux-loading";
import { setAuthUser } from "../../redux/actions/auth";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      disabled: false,
      verify: false,
      code: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.verify) {
      this.verifyAccount();
    } else {
      const { email, password } = this.state;
      this.props.dispatch(showLoading());
      this.setState({ ...this.state, disabled: true });
      Auth.signIn(email, password)
        .then((res) => {
          this.props.dispatch(hideLoading());
          const data = {
            attributes: res.attributes,
            signInUserSession: res.signInUserSession,
          };

          this.props.dispatch(setAuthUser(data));

          localStorage.setItem("90210wc-data", JSON.stringify(data));

          this.setState({ ...this.state, disabled: false });
        })
        .catch((err) => {
          this.props.dispatch(hideLoading());
          this.setState({ ...this.state, disabled: false });
          if (err.code === "UserNotConfirmedException") {
            this.sendVerificationCode(email);
          } else {
            alert(err.message);
          }
        });
    }
  };

  sendVerificationCode = (email) => {
    Auth.resendSignUp(email)
      .then(() => {
        this.setState({
          ...this.state,
          disabled: false,
          verify: true,
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          disabled: false,
        });
      });
  };

  verifyAccount = () => {
    const { email, code } = this.state;
    Auth.confirmSignUp(email, code)
      .then((res) => {
        this.setState({
          code: "",
          email: "",
          password: "",
          verify: false,
          disabled: false,
        });
      })
      .catch(() => {
        this.setState({ ...this.state, disabled: false });
        alert("Something went wrong please try again");
      });
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { email, password, disabled, verify, code } = this.state;
    if (verify) {
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
              <Button type="submit" color="primary">
                Verify
              </Button>
            </div>
          </Form>
        </div>
      );
    } else {
      return (
        <div className="mt-4">
          <h1 className="text-center">Sign In Form</h1>
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
              <Link to="/forgetpassword">
                <small>Forget Password</small>
              </Link>
              <Link to="/signup">
                <small>Create new account? SignUp</small>
              </Link>
            </div>
            <Button
              className="mt-2"
              type="submit"
              color="primary"
              disabled={disabled}
            >
              Sign In
            </Button>
          </Form>
        </div>
      );
    }
  }
}

export default connect()(Signin);
