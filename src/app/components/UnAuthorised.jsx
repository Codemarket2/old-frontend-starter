import React from "react";
import { connect } from "react-redux";
import { setRedirectPath } from "../redux/actions/redirect";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const UnAuthorised = ({ dispatch, redirectPath }) => {
  const handleRedirect = () => {
    dispatch(setRedirectPath(redirectPath));
  };

  return (
    <div className="mt-3">
      <h2 className="text-center">Please Signin to access this page!</h2>
      <div className="d-flex justify-content-center">
        <Link onClick={handleRedirect} to="/signin">
          <Button color="primary">SignIn</Button>
        </Link>
      </div>
    </div>
  );
};

export default connect()(UnAuthorised);
