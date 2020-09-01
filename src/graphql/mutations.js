/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOneIvdrip = /* GraphQL */ `
  mutation CreateOneIvdrip(
    $description: String!
    $slug: String!
    $title: String!
  ) {
    createOneIvdrip(description: $description, slug: $slug, title: $title) {
      _id
      description
      slug
      title
    }
  }
`;
export const createOneService = /* GraphQL */ `
  mutation CreateOneService(
    $description: String!
    $slug: String!
    $title: String!
  ) {
    createOneService(description: $description, slug: $slug, title: $title) {
      _id
      description
      slug
      title
    }
  }
`;
export const createOneTeam = /* GraphQL */ `
  mutation CreateOneTeam(
    $description: String!
    $slug: String!
    $title: String!
  ) {
    createOneTeam(description: $description, slug: $slug, title: $title) {
      _id
      description
      slug
      title
    }
  }
`;
export const createOneTherapie = /* GraphQL */ `
  mutation CreateOneTherapie(
    $description: String!
    $slug: String!
    $title: String!
  ) {
    createOneTherapie(description: $description, slug: $slug, title: $title) {
      _id
      description
      slug
      title
    }
  }
`;
export const deleteOneIvdrip = /* GraphQL */ `
  mutation DeleteOneIvdrip($id: ID!) {
    deleteOneIvdrip(id: $id)
  }
`;
export const deleteOneService = /* GraphQL */ `
  mutation DeleteOneService($id: ID!) {
    deleteOneService(id: $id)
  }
`;
export const deleteOneTeam = /* GraphQL */ `
  mutation DeleteOneTeam($id: ID!) {
    deleteOneTeam(id: $id)
  }
`;
export const deleteOneTherapie = /* GraphQL */ `
  mutation DeleteOneTherapie($id: ID!) {
    deleteOneTherapie(id: $id)
  }
`;
export const sendEmail = /* GraphQL */ `
  mutation SendEmail(
    $email: String!
    $message: String!
    $subject: String!
    $userId: String!
  ) {
    sendEmail(
      email: $email
      message: $message
      subject: $subject
      userId: $userId
    ) {
      _id
      email
      message
      subject
      userId
    }
  }
`;
export const updateOneIvdrip = /* GraphQL */ `
  mutation UpdateOneIvdrip(
    $description: String
    $id: ID!
    $slug: String
    $title: String
  ) {
    updateOneIvdrip(
      description: $description
      id: $id
      slug: $slug
      title: $title
    ) {
      _id
      description
      slug
      title
    }
  }
`;
export const updateOneService = /* GraphQL */ `
  mutation UpdateOneService(
    $description: String
    $id: ID!
    $slug: String
    $title: String
  ) {
    updateOneService(
      description: $description
      id: $id
      slug: $slug
      title: $title
    ) {
      _id
      description
      slug
      title
    }
  }
`;
export const updateOneTeam = /* GraphQL */ `
  mutation UpdateOneTeam(
    $description: String
    $id: ID!
    $slug: String
    $title: String
  ) {
    updateOneTeam(
      description: $description
      id: $id
      slug: $slug
      title: $title
    ) {
      _id
      description
      slug
      title
    }
  }
`;
export const updateOneTherapie = /* GraphQL */ `
  mutation UpdateOneTherapie(
    $description: String
    $id: ID!
    $slug: String
    $title: String
  ) {
    updateOneTherapie(
      description: $description
      id: $id
      slug: $slug
      title: $title
    ) {
      _id
      description
      slug
      title
    }
  }
`;
