import User from "../models/user";
import Item from "../models/item";
import Article from "../models/article";
import Settings from "../models/settings";

const userObject = (user) => {
  return {
    ...user._doc,
    _id: user.id,
    birthday: new Date(user._doc.birthday).toISOString(),
    createdAt: new Date(user._doc.createdAt).toISOString(),
    updatedAt: new Date(user._doc.updatedAt).toISOString(),
  };
};
const itemObject = (item) => {
  return item
    ? {
        ...item._doc,
        _id: item.id,
      }
    : null;
};
const settingsObject = (settings) => {
  return settings
    ? {
        ...settings._doc,
        _id: settings.id,
        birthday: new Date(settings._doc.birthday).toISOString(),
      }
    : null;
};
const articleObject = (article) => {
  return {
    ...article._doc,
    _id: article.id,
    timestamp: new Date(article._doc.timestamp).toISOString(),
  };
};

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find({});
      return users.map((user) => ({
        ...userObject(user),
      }));
    },
    user: async (_, { id }) => {
      const user = await User.findById(id);
      if (user) {
        return {
          ...userObject(user),
        };
      }
      return null;
    },
    items: async () => {
      const items = await Item.find({});
      return items.map((item) => ({
        ...itemObject(item),
      }));
    },
    articles: async () => {
      const articles = await Article.find({});
      return articles.reverse().map((article) => ({
        ...articleObject(article),
      }));
    },
    article: async (_, { id }) => {
      const article = await Article.findById(id);
      return articleObject(article);
    },
    settings: async (_, { id = "" }) => {
      // Finds a settings document based on a user id
      const settings = await Settings.findOne({ _user: id });
      return settingsObject(settings);
    },
  },
  Mutation: {
    updateSettings: async (_, { settingsInput }) => {
      const { _user } = settingsInput;

      const settings = await Settings.findOneAndUpdate(
        { _user },
        {
          ...settingsInput,
        },
        { new: true }
      );

      if (settings) {
        return {
          ...settingsObject(settings),
        };
      }

      return null;
    },
    createItem: async (_, { newItemInput }) => {
      const item = new Item({
        ...newItemInput,
      });

      const newItem = await item.save();

      return newItem;
    },
    createArticle: async (_, { articleInput }) => {
      const { title, body, sections, image, author } = articleInput;

      const article = new Article({
        title,
        body,
        image,
        author,
        timestamp: Date.now(),
        sections,
      });
      const savedArticle = await article.save();

      return { ...articleObject(savedArticle) };
      // return savedArticle;
    },
  },
};

export default resolvers;
