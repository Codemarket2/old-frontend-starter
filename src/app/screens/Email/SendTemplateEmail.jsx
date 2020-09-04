import React, { useState } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { showLoading, hideLoading } from "react-redux-loading";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Button, Form, FormGroup, Input } from "reactstrap";

import UnAuthorised from "../../components/UnAuthorised";

const SEND_TEMPLATE_EMAIL = gql`
  mutation SendTemplateEmail(
    $userId: String!
    $emails: [String]
    $templateName: String!
    $businessName: String!
  ) {
    sendTemplateEmail(
      userId: $userId
      emails: $emails
      templateName: $templateName
      businessName: $businessName
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

const SendTemplateEmail = (props) => {
  const [sendTemplateEmail] = useMutation(SEND_TEMPLATE_EMAIL);
  const { loading, error, data } = useQuery(GET_ALL_EMAILS);
  const [selectedOption, setSelectedOption] = useState();
  const [templateOptions, setTemplateOptions] = useState([
    { value: "offer", label: "Offer" },
    { value: "vivek", label: "vivek" },
  ]);
  const [payload, setPayload] = useState({
    emails: [],
    templateName: "",
    businessName: "",
    disabled: false,
  });

  const handleSelect = (e) => {
    setSelectedOption(e);
    setPayload({
      ...payload,
      emails: e.value.emails,
      businessName: e.value.businessName,
    });
  };

  const handleSelectTemplate = (e) => {
    setPayload({
      ...payload,
      templateName: e.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.dispatch(showLoading());
    setPayload({
      ...payload,
      disabled: true,
    });

    sendTemplateEmail({
      variables: {
        userId: props.userId,
        emails: payload.emails,
        templateName: payload.templateName,
        businessName: payload.businessName,
      },
    })
      .then(() => {
        props.dispatch(hideLoading());
        alert(
          `Email Succesfully send to ` + JSON.stringify(payload.businessName)
        );
        setPayload({
          emails: [],
          templateName: "",
          businessName: "",
          disabled: false,
        });
      })
      .catch((err) => {
        props.dispatch(hideLoading());
        alert(`Something went wrong. Please try again!`);
        console.log("====================================");
        console.log(err);
        console.log("====================================");
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
          <Select
            placeholder={"Mailing List"}
            onChange={handleSelect}
            options={options}
            required
          />
        </FormGroup>
        <FormGroup>
          <Select
            placeholder={"Select Email Template"}
            onChange={handleSelectTemplate}
            options={templateOptions}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            size="lg"
            type="text"
            name="templateName"
            placeholder="Template Name"
            value={payload.templateName}
            onChange={(e) =>
              setPayload({ ...payload, templateName: e.target.value })
            }
          />
        </FormGroup>
        <Button
          disabled={payload.disabled}
          type="submit"
          color="primary"
          size="lg"
          block
        >
          Send Template Email
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

export default connect(mapStateToProps)(SendTemplateEmail);
