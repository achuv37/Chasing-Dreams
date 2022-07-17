import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_PLACE = gql`
  mutation savePlace($newPlace: PlaceInput!) {
    savePlace(newPlace: $newPlace) {
      _id
      username
      email
      savedPlaces {
        placeId
        placeName
        placeInfo
        placeDescription
        placeType
      }
    }
  }
  
`;

export const REMOVE_PLACE = gql`
  mutation removePlace($placeId: ID!) {
    removePlace(placeId: $placeId) {
      _id
      username
      email
      savedPlaces {
        placeId
        placeName
        placeInfo
        placeDescription
        placeType
      }
    }
  }
  
`;


