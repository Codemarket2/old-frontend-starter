import React, { useState } from "react";
import { connect } from "react-redux";
import { showLoading, hideLoading } from "react-redux-loading";
import { useMutation, gql } from "@apollo/client";
import { Button, Form, FormGroup, Input } from "reactstrap";

import UnAuthorised from "../../components/UnAuthorised";

const CreateEmailTemplate = gql`
  mutation CreateEmailTemplate(
    $templateName: String!
    $subject: String!
    $body: String!
  ) {
    createEmailTemplate(
      templateName: $templateName
      subject: $subject
      body: $body
    )
  }
`;

const Email = (props) => {
  const [createEmailTemplate] = useMutation(CreateEmailTemplate);

  const [payload, setPayload] = useState({
    templateName: "",
    subject: "",
    body: "",
    disabled: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.dispatch(showLoading());
    setPayload({
      ...payload,
      disabled: true,
    });

    createEmailTemplate({
      variables: {
        templateName: payload.templateName,
        subject: payload.subject,
        body: payload.body,
      },
    })
      .then(() => {
        props.dispatch(hideLoading());
        alert(
          `Succesfully created new Tempalte ` +
            JSON.stringify(payload.templateName)
        );
        setPayload({
          templateName: "",
          subject: "",
          body: "",
          disabled: false,
        });
      })
      .catch((err) => {
        props.dispatch(hideLoading());
        alert(`Something went wrong. Please try again!`);
        console.log(err);
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
            type="text"
            name="templateName"
            placeholder="Template Name"
            value={payload.templateName}
            onChange={(e) =>
              setPayload({ ...payload, templateName: e.target.value })
            }
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            size="lg"
            type="text"
            name="subject"
            placeholder="Subject eg Hello {{businessName}}"
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
            name="body"
            placeholder="Body eg How are you {{businessName}}"
            value={payload.body}
            onChange={(e) => setPayload({ ...payload, body: e.target.value })}
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
          Create Template Email
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
