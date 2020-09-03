import React, { useState } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { showLoading, hideLoading } from "react-redux-loading";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Button, Form, FormGroup, Input } from "reactstrap";

import UnAuthorised from "../components/UnAuthorised";

const SEND_EMAIL = gql`
  mutation SendEmail(
    $userId: String!
    $emails: [String]
    $subject: String!
    $message: String!
  ) {
    sendEmail(
      userId: $userId
      emails: $emails
      subject: $subject
      message: $message
    ) {
      userId
    }
  }
`;

const GET_ALL_EMAILS = gql`
  query GetAllEmails {
    getAllEmails {
      _id
      emails
      businessName
    }
  }
`;

const Email = (props) => {
  const [sendEmail] = useMutation(SEND_EMAIL);
  const { loading, error, data } = useQuery(GET_ALL_EMAILS);
  const [selectedOption, setSelectedOption] = useState();
  const [payload, setPayload] = useState({
    emails: [],
    subject: "",
    message: "",
    disabled: false,
  });
  // const [options, setOptions] = useState([
  //   { value: "contactvivekvt@gmail.com", label: "contactvivekvt@gmail.com" },
  //   { value: "contactvivekvt1@gmail.com", label: "contactvivekvt1@gmail.com" },
  //   { value: "contactvivekvt2@gmail.com", label: "contactvivekvt2@gmail.com" },
  // ]);

  const handleSelect = (e) => {
    setSelectedOption(e);
    setPayload({
      ...payload,
      emails: e.value.emails,
    });
  };

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
        emails: payload.emails,
        subject: payload.subject,
        message: payload.message,
      },
    })
      .then(() => {
        props.dispatch(hideLoading());
        alert(`Email Succesfully send to ` + JSON.stringify(payload.emails));
        setPayload({
          emails: [],
          subject: "",
          message: "",
          disabled: false,
        });
      })
      .catch((err) => {
        props.dispatch(hideLoading());
        alert(`Something went wrong. Please try again!`);
        // console.log("====================================");
        // console.log(err);
        // console.log("====================================");
        setPayload({
          ...payload,
          disabled: false,
        });
      });
  };

  if (!props.authenticated) {
    return <UnAuthorised redirectPath="/email" />;
  }

  if (loading) return null;
  if (error) return `Error! ${error.message}`;

  const options = data.getAllEmails.map((d) => ({
    value: d,
    label: d.businessName,
  }));

  return (
    <div className="mt-5 px-5">
      {/* {JSON.stringify(payload)} */}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Select onChange={handleSelect} options={options} required />
        </FormGroup>
        {/* <FormGroup>
          <Input
            size="lg"
            type="email"
            name="email"
            placeholder="Email"
            value={payload.email}
            onChange={(e) => setPayload({ ...payload, email: e.target.value })}
            required
          />
        </FormGroup> */}
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
