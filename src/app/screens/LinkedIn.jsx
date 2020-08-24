import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";
import axios from "axios";
import { connect } from "react-redux";

import UnAuthorised from "../components/UnAuthorised";

const LinkedIn = ({ authenticated }) => {
  const [data, setData] = useState();

  const [payload, setPayload] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://z7mpnrc3c5.execute-api.us-west-2.amazonaws.com/default/docker-linkedin-lambda?username=${payload.username}&password=${payload.password}`
      )
      .then((res) => {
        setPayload({
          username: "",
          password: "",
        });
        setData(JSON.stringify(res.data));
      })
      .catch((err) => {
        alert("Something went wrong please try again!");
        setData(JSON.stringify(err));
      });
  };

  if (!authenticated) {
    return <UnAuthorised redirectPath="/data/linkedin" />;
  }

  return (
    <div className="mt-3 px-5">
      <h1 className="text-center">LinkedIn</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            size="lg"
            type="text"
            name="username"
            placeholder="Username"
            value={payload.username}
            onChange={(e) =>
              setPayload({ ...payload, username: e.target.value })
            }
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            size="lg"
            type="text"
            name="password"
            placeholder="Password"
            value={payload.password}
            onChange={(e) =>
              setPayload({ ...payload, password: e.target.value })
            }
            required
          />
        </FormGroup>
        <Button type="submit" color="primary" size="lg" block>
          Get Data
        </Button>
        <FormGroup>
          <div className="mt-4">
            {data && <Alert color="primary">{data}</Alert>}
          </div>
        </FormGroup>
      </Form>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
    userId: auth.authenticated ? auth.data.attributes.sub : null,
  };
};

export default connect(mapStateToProps)(LinkedIn);
