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
    _user: User!
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
    recommendations:[Item!]!
  }

  type Item {
    _id: ID!
    name: String
    brand: String
    description: String
    seasons: [String]
    category: String
    occasions: [String]
    colours: [String]
    material: String
    price: Float
    images: [String]
    builds: [String]
    sizes: [String]
    link: String
  }

  input NewItemInput {
    name: String!
    brand: String!
    description: String!
    seasons: [String!]!
    category: String!
    occasions: [String!]!
    colours: [String!]!
    material: String!
    price: Float!
    images: [String!]!
    sizes: [String!]!
    builds: [String!]!
    link: String!
  }
  input UpdateItemInput {
    name: String
    brand: String
    description: String
    seasons: [String!]
    category: String
    occasions: [String!]
    colours: [String!]
    material: String
    price: Float
    images: [String!]
    sizes: [String!]
    builds: [String!]
    link: String
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
    featuredItems: [Item!]
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
    sections: [ArticleSectionInput]
    featuredItems: [String]
  }
  input UpdateArticleInput {
    title: String
    author: String
    body: String
    image: String
    sections: [ArticleSectionInput]
    featuredItems: [String]
  }

  input LikeItemInput {
    user: String!
    item: String!
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

  input RecommendationInput{
    user:String!
    item:String!
  }

  type Query {
    users: [Settings!]!
    user(id: String!): User
    items: [Item!]
    item(id:String!): Item
    articles: [Article!]
    article(id: String!): Article
    settings(id: String!): Settings
  }
  type Mutation {
    updateSettings(settingsInput: SettingsInput!): Settings
    createItem(newItemInput: NewItemInput!): Item
    createArticle(articleInput: ArticleInput!): Article
    likeItem(likeItemInput: LikeItemInput!): Settings
    createRecommendation(recommendationInput:RecommendationInput!): Settings
    updateItem(id:String!,updateItemInput:UpdateItemInput!):Item
    updateArticle(id:String!,updateArticleInput:UpdateArticleInput!):Article
  }
`;

export default typeDefs;
