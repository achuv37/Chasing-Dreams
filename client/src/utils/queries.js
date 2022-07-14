import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      hotelCount
      savedHotels {
        hotelId
        name
        description
        link
        reviews
      }
      
    }
  }
`;