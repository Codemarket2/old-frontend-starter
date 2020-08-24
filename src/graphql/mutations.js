/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOneTeam = /* GraphQL */ `
  mutation CreateOneTeam(
    $slug: String!
    $title: String!
    $description: String!
  ) {
    createOneTeam(slug: $slug, title: $title, description: $description) {
      _id
      slug
      title
      description
    }
  }
`;
export const updateOneTeam = /* GraphQL */ `
  mutation UpdateOneTeam(
    $id: ID!
    $slug: String
    $title: String
    $description: String
  ) {
    updateOneTeam(
      id: $id
      slug: $slug
      title: $title
      description: $description
    ) {
      _id
      slug
      title
      description
    }
  }
`;
export const deleteOneTeam = /* GraphQL */ `
  mutation DeleteOneTeam($id: ID!) {
    deleteOneTeam(id: $id)
  }
`;
export const createOneService = /* GraphQL */ `
  mutation CreateOneService(
    $slug: String!
    $title: String!
    $description: String!
  ) {
    createOneService(slug: $slug, title: $title, description: $description) {
      _id
      slug
      title
      description
    }
  }
`;
export const updateOneService = /* GraphQL */ `
  mutation UpdateOneService(
    $id: ID!
    $slug: String
    $title: String
    $description: String
  ) {
    updateOneService(
      id: $id
      slug: $slug
      title: $title
      description: $description
    ) {
      _id
      slug
      title
      description
    }
  }
`;
export const deleteOneService = /* GraphQL */ `
  mutation DeleteOneService($id: ID!) {
    deleteOneService(id: $id)
  }
`;
export const createOneTherapie = /* GraphQL */ `
  mutation CreateOneTherapie(
    $slug: String!
    $title: String!
    $description: String!
  ) {
    createOneTherapie(slug: $slug, title: $title, description: $description) {
      _id
      slug
      title
      description
    }
  }
`;
export const updateOneTherapie = /* GraphQL */ `
  mutation UpdateOneTherapie(
    $id: ID!
    $slug: String
    $title: String
    $description: String
  ) {
    updateOneTherapie(
      id: $id
      slug: $slug
      title: $title
      description: $description
    ) {
      _id
      slug
      title
      description
    }
  }
`;
export const deleteOneTherapie = /* GraphQL */ `
  mutation DeleteOneTherapie($id: ID!) {
    deleteOneTherapie(id: $id)
  }
`;
export const createOneIvdrip = /* GraphQL */ `
  mutation CreateOneIvdrip(
    $slug: String!
    $title: String!
    $description: String!
  ) {
    createOneIvdrip(slug: $slug, title: $title, description: $description) {
      _id
      slug
      title
      description
    }
  }
`;
export const updateOneIvdrip = /* GraphQL */ `
  mutation UpdateOneIvdrip(
    $id: ID!
    $slug: String
    $title: String
    $description: String
  ) {
    updateOneIvdrip(
      id: $id
      slug: $slug
      title: $title
      description: $description
    ) {
      _id
      slug
      title
      description
    }
  }
`;
export const deleteOneIvdrip = /* GraphQL */ `
  mutation DeleteOneIvdrip($id: ID!) {
    deleteOneIvdrip(id: $id)
  }
`;
