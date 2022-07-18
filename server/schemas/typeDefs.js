// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String
    placeCount: Int
    savedPlaces: [Place]
  }

  type Place {
    placeId: ID!
    placeName: String
    placeInfo: String
    placeDescription: String
    placeType: String
    placeImage: String
  }

  input PlaceInput {
    placeId: String
    placeName: String
    placeInfo: String
    placeDescription: String
    placeType: String
    placeImage: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savePlace(newPlace: PlaceInput!): User
    removePlace(placeId: ID!): User
  }

  type Query {
    
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }


`;

// export the typeDefs
module.exports = typeDefs;