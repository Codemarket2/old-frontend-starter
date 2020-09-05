import React, { useState } from "react";
import { connect } from "react-redux";
import { Storage } from "aws-amplify";
import { useQuery, useMutation, gql } from "@apollo/client";
import { v4 as uuid } from "uuid";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { showLoading, hideLoading } from "react-redux-loading";
import config from "../../aws-exports";
import UnAuthorised from "../components/UnAuthorised";

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;

const Upload_Image = gql`
  mutation UploadImage($title: String!, $imageUrl: String!) {
    uploadImage(title: $title, imageUrl: $imageUrl) {
      _id
    }
  }
`;

const GET_ALL_IMAGES = gql`
  query GetAllImages {
    getAllImages {
      _id
      title
      imageUrl
    }
  }
`;

function ImageUpload(props) {
  const [uploadImage] = useMutation(Upload_Image);
  const { loading, error, data, refetch } = useQuery(GET_ALL_IMAGES);
  const [file, updateFile] = useState(null);
  const [productName, updateProductName] = useState("");
  const [title, updateTitle] = useState("");
  const [disabled, updateDisabled] = useState(false);
  const [products, updateProducts] = useState([]);

  function handleChange(event) {
    const {
      target: { value, files },
    } = event;
    const fileForUpload = files[0];
    updateProductName(fileForUpload.name.split(".")[0]);
    updateFile(fileForUpload || value);
  }

  // upload the image to S3 and then save it in the GraphQL API
  async function handleSubmit(e) {
    e.preventDefault();
    updateDisabled(true);
    props.dispatch(showLoading());
    if (file) {
      const extension = file.name.split(".")[1];
      const { type: mimeType } = file;
      const key = `images/${uuid()}${productName}.${extension}`;
      const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
      // const inputData = { name: productName, image: url };

      try {
        await Storage.put(key, file, {
          contentType: mimeType,
        });

        await uploadImage({
          variables: {
            title: title,
            imageUrl: url,
          },
        });

        refetch();
        // updateProductName("");
        // updateFile(null);
        updateTitle("");
        props.dispatch(hideLoading());
        alert("Image Uploaded Succesfully");
        updateDisabled(true);
      } catch (err) {
        alert("Something went wrong please try again");
        updateDisabled(true);
        props.dispatch(hideLoading());
      }
    }
  }

  if (!props.authenticated) {
    return <UnAuthorised redirectPath="/email" />;
  }

  if (loading) return null;
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Form className="my-5" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            onChange={(e) => updateTitle(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">File</Label>
          <Input
            onChange={handleChange}
            type="file"
            name="file"
            id="exampleFile"
          />
        </FormGroup>
        <Button
          disabled={disabled}
          type="submit"
          color="primary"
          // size="lg"
          block
        >
          Upload Image
        </Button>
      </Form>
      <div>
        <h3 className="text-center">Uploaded Images List</h3>
        {data.getAllImages.map((item, i) => (
          <div key={i} className="text-center">
            <h6>{item.title}</h6>
            <div>
              <img width="200" alt={item.title} src={item.imageUrl} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
    userId: auth.authenticated ? auth.data.attributes.sub : null,
  };
};

export default connect(mapStateToProps)(ImageUpload);
