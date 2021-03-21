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

  type Settings {
    _id: ID!
    _user: ID!
    admin: Boolean!
    likes: [Item!]!
    gender: String!
    build: String!
    height: Float!
    birthday: String!
    shoeSize: Float!
    favBrands: [String!]
    sustainable: String!
    fit: String!
    favColours: [String!]!
    pantsSize: String!
    sweaterSize: String!
    shirtSize: String!
    styleIcons: [String!]!
    favInfluencers: [String!]!
  }

  type Item {
    _id: ID!
    name: String
    brand: String
    description: String
    season: String
    category: String
    occasions: [String]
    colours: [String]
    material: String
    price: Float
    images: [String]
    build: [String]
    sizes: [String]
    link: String
  }

  input NewItemInput {
    name: String!
    brand: String!
    description: String!
    season: String!
    category: String!
    occasions: [String!]!
    colours: [String!]!
    material: String!
    price: Float!
    images: [String!]!
    sizes: [String!]!
    build: [String!]!
    link: String!
  }

  type ArticleSection {
    image: String
    title: String
    body: String
  }

  type Article {
    _id: ID!
    author: String
    title: String
    body: String
    image: String
    timestamp: String
    sections: [ArticleSection!]
  }
  input ArticleSectionInput {
    image: String!
    title: String!
    body: String!
  }

  input ArticleInput {
    title: String!
    author: String!
    body: String!
    image: String!
    sections: [ArticleSectionInput!]
  }

  input LikeItemInput {
    user: String!
    item: String!
  }

  type Query {
    users: [User!]!
    user(id: String): User
    items: [Item!]
    articles: [Article!]
    article(id: String!): Article
    settings(id: String!): Settings
  }

  input SettingsInput {
    _user: ID!
    gender: String
    build: String
    height: Float
    birthday: String
    favBrands: [String!]
    sustainable: String
    fit: String
    favColours: [String!]
    shoeSize: Float
    pantsSize: String
    sweaterSize: String
    shirtSize: String
    styleIcons: [String!]
    favInfluencers: [String!]
    likes: [ID!]
  }

  type Mutation {
    updateSettings(settingsInput: SettingsInput!): Settings
    createItem(newItemInput: NewItemInput!): Item
    createArticle(articleInput: ArticleInput!): Article
    likeItem(likeItemInput: LikeItemInput!): Settings
  }
`;

export default typeDefs;
