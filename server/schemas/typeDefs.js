// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String
    hotelCount: Int
    savedHotels: [Hotel]
  }

  type Hotel {
    hotelId: ID!
    name: String
    description: String
    link: String
    reviews: String
  }

  input HotelInput {
    name: String
    description: String
    link: String
    reviews: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveHotel(newHotel: HotelInput!): User
    removeHotel(hotelId: ID!): User
  }

  type Query {
    users: [User]
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }


`;

// export the typeDefs
module.exports = typeDefs;