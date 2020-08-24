import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";
import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading";

import UnAuthorised from "../components/UnAuthorised";

const Yelp = ({ dispatch, authenticated, userId }) => {
  const [data, setData] = useState();
  const [disabled, setDisabled] = useState(false);

  const [payload, setPayload] = useState({
    keyword: "",
    city: "",
    limit: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(showLoading());
    setDisabled(true);
    axios
      .get(
        `https://nl7ntow788.execute-api.us-east-2.amazonaws.com/default/lambda_fargate?name=${userId}&keyword=${payload.keyword}&city=${payload.city}&limit=${payload.limit}`
      )
      .then((res) => {
        dispatch(hideLoading());
        setDisabled(false);
        setPayload({
          keyword: "",
          city: "",
          limit: "",
        });
        setData(JSON.stringify(res.data));
      })
      .catch((err) => {
        dispatch(hideLoading());
        setDisabled(false);
        alert("Something went wrong please try again!");
        setData(JSON.stringify(err));
      });
  };

  if (!authenticated) {
    return <UnAuthorised redirectPath="/data/yelp" />;
  }

  return (
    <div className="mt-3 px-5">
      <h1 className="text-center">Yelp</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            size="lg"
            type="text"
            name="keyword"
            placeholder="Keyword"
            value={payload.keyword}
            onChange={(e) =>
              setPayload({ ...payload, keyword: e.target.value })
            }
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            size="lg"
            type="text"
            name="city"
            placeholder="City"
            value={payload.city}
            onChange={(e) => setPayload({ ...payload, city: e.target.value })}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            size="lg"
            type="number"
            name="limit"
            placeholder="Limit"
            value={payload.limit}
            onChange={(e) => setPayload({ ...payload, limit: e.target.value })}
            required
          />
        </FormGroup>
        <Button
          type="submit"
          disabled={disabled}
          color="primary"
          size="lg"
          block
        >
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

export default connect(mapStateToProps)(Yelp);
