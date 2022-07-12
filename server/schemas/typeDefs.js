// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String
    
    
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }

  type Query {
    users: [User]
  }

  type Auth {
    token: ID!
    user: User
  }


`;

// export the typeDefs
module.exports = typeDefs;