import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    image: String!
    createdAt: String!
    updatedAt: String!
    gender: String
    height: Float
    build: String
    birthday: String
  }

  type Item {
    _id:ID!
    name: String
    brand: String
    description: String
    season: String
    category: String
    occasion: String
    colours: [String]
    material: String
    price: Float
    image: String
  }

  type Query {
    users: [User!]!
    user(id: String): User
    items: [Item!]
  }

  type Mutation {
    updateUserPrefs(
      gender: String!
      id: ID!
      build: String!
      height: Float!
      birthday: String!
    ): User
    createItem(
      name: String
      brand: String
      description: String
      season: String
      category: String
      occasion: String
      colours: [String]
      material: String
      price: Float
      image: String
    ): Item
  }
`;

export default typeDefs;
