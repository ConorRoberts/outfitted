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
    _id: ID!
    name: String
    brand: String
    description: String
    season: String
    category: String
    occasion: [String]
    colours: [String]
    material: String
    price: Float
    images: [String]
    build: [String]
  }

  type ArticleSection {
    image: String
    title: String
    body: String
  }

  type Article {
    _id:ID!
    title: String
    body: String
    image:String
    timestamp:String
    sections: [ArticleSection!]
  }
  input ArticleSectionInput {
    image: String!
    title: String!
    body: String!
  }

  input ArticleInput {
    title: String!
    body: String!
    image:String!
    sections: [ArticleSectionInput!]
  }

  type Query {
    users: [User!]!
    user(id: String): User
    items: [Item!]
    articles: [Article!]
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
    createArticle(articleInput: ArticleInput!): Article
  }
`;

export default typeDefs;
