import { gql } from "@apollo/client";

export const createAppointmentMutation = gql `
  mutation CreateAppointment(
    $title: String!
    $message: String!
    $start: Date!
    $end: Date!
  ) {
    createAppointment(
      input: { title: $title, message: $message, start: $start, end: $end }
    ) {
      title
    }
  }
`;

export const updateAppointmentMutation = gql `
  mutation UpdateAppointment(
    $id: ID!
    $title: String
    $message: String
    $start: Date
    $end: Date
  ) {
    updateAppointment(
      id: $id
      title: $title
      message: $message
      start: $start
      end: $end
    ) {
      title
    }
  }
`;

export const deleteAppointmentMutation = gql `
  mutation DeleteAppointment($id: ID!) {
    deleteAppointment(id: $id)
  }
`;