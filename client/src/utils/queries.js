import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      placeCount
      savedPlaces {
        placeId
        placeName
        placeInfo
        placeDescription
        placeType
        placeImage
      }
      
    }
  }
`;