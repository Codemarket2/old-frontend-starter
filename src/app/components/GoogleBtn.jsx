import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { setAuthUser } from "../redux/actions/auth";
import { connect } from "react-redux";

const CLIENT_ID =
  "958151766684-svc59ja9gm5bs2v568o5q1neiettu5g7.apps.googleusercontent.com";

class GoogleBtn extends Component {
  onSuccess = (response) => {
    console.log("Google response ----------");
    console.log(response);
    console.log(response.profileObj);
    let user = {
      attributes: {
        name: response.profileObj.name,
        email: response.profileObj.email,
        imageUrl: response.profileObj.imageUrl,
      },
      response,
    };

    this.props.dispatch(setAuthUser(user));

    localStorage.setItem("frontend-starter", JSON.stringify(user));
  };

  onFailure(response) {
    alert("Something went wrong please try again!");
  }

  render() {
    return (
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="SIGN IN WITH GOOGLE"
        onSuccess={this.onSuccess}
        onFailure={this.onFailure}
        cookiePolicy={"single_host_origin"}
        responseType="code,token"
      />
    );
  }
}

export default connect()(GoogleBtn);
