import React, { useState } from "react";
import { connect } from "react-redux";
import { showLoading, hideLoading } from "react-redux-loading";
import { useMutation, gql } from "@apollo/client";
import { Button, Form, FormGroup, Input } from "reactstrap";

import UnAuthorised from "../components/UnAuthorised";

const SEND_EMAIL = gql`
  mutation SendEmail(
    $userId: String!
    $email: String!
    $subject: String!
    $message: String!
  ) {
    sendEmail(
      input: {
        userId: $userId
        email: $email
        subject: $subject
        message: $message
      }
    ) {
      email
    }
  }
`;

const Email = (props) => {
  const [sendEmail] = useMutation(SEND_EMAIL);
  const [payload, setPayload] = useState({
    email: "",
    subject: "",
    message: "",
    disabled: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.dispatch(showLoading());
    setPayload({
      ...payload,
      disabled: true,
    });
    sendEmail({
      variables: {
        userId: props.userId,
        email: payload.email,
        subject: payload.subject,
        message: payload.message,
      },
    })
      .then(() => {
        props.dispatch(hideLoading());
        alert(`Email Succesfully send to ${payload.email}`);
        setPayload({
          email: "",
          subject: "",
          message: "",
          disabled: false,
        });
      })
      .catch((err) => {
        props.dispatch(hideLoading());
        alert(`Something went wrong. Please try again!`);
        setPayload({
          ...payload,
          disabled: false,
        });
      });
  };

  if (!props.authenticated) {
    return <UnAuthorised redirectPath="/email" />;
  }

  return (
    <div className="mt-5 px-5">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            size="lg"
            type="email"
            name="email"
            placeholder="Email"
            value={payload.email}
            onChange={(e) => setPayload({ ...payload, email: e.target.value })}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            size="lg"
            type="text"
            name="subject"
            placeholder="Subject"
            value={payload.subject}
            onChange={(e) =>
              setPayload({ ...payload, subject: e.target.value })
            }
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            size="lg"
            type="textarea"
            name="message"
            placeholder="Message"
            value={payload.message}
            onChange={(e) =>
              setPayload({ ...payload, message: e.target.value })
            }
            required
          />
        </FormGroup>
        <Button
          disabled={payload.disabled}
          type="submit"
          color="primary"
          size="lg"
          block
        >
          Send Email
        </Button>
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

export default connect(mapStateToProps)(Email);
