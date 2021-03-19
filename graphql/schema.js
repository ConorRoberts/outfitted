import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    image: String!
    createdAt: String!
    updatedAt: String!
  }

  type Settings{
    _id:ID!
    _user:ID!
    gender:String!
    height:Int!
    birthday:String!
    admin:Boolean!
    build:String!
  }

  input SettingsInput{
    _user:ID!
    gender:String!
    height:Int!
    birthday:String!
    build:String!
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
    author:String
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
    author:String!
    body: String!
    image:String!
    sections: [ArticleSectionInput!]
  }

  type Query {
    users: [User!]!
    user(id: String): User
    items: [Item!]
    articles: [Article!]
    article(id:String!): Article
    settings(id:String!): Settings
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
    updateSettings(settingsInput: SettingsInput!): Settings
  }
`;

export default typeDefs;
