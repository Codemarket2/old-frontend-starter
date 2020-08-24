import { gql } from "@apollo/client";

export const getMenuQuery = gql`
  query GetAllMenu {
    getAllTeams {
      title
      slug
      description
    }

    getAllIvdrips {
      title
      slug
      description
    }

    getAllTherapies {
      title
      slug
      description
    }

    getAllServices {
      title
      slug
      description
    }
  }
`;

export const getAppointmentsQuery = gql`
  {
    getAppointments {
      _id
      title
      message
      start
      end
    }
  }
`;
