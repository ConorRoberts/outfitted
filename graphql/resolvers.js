import User from "@models/user";
import Item from "@models/item";
import Article from "@models/article";
import Settings from "@models/settings";

const userObject = (user) => {
  return user
    ? {
        ...user._doc,
        _id: user.id,
      }
    : null;
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
  return article
    ? {
        ...article._doc,
        _id: article.id,
        // featuredItems:article._doc.featuredItems.map(item=>itemObject(item))
        timestamp: new Date(article._doc.timestamp).toISOString(),
      }
    : null;
};

const settingsFromId = async (id) => {
  const settings = await Settings.findOne({ _user: id }).populate("likes").populate("recommendations").populate("_user");
  return settingsObject(settings);
};

const articleFromId = async (id) => {
  const article = await Article.findOne({ _id: id }).populate("featuredItems");
  return article;
};

const resolvers = {
  Query: {
    users: async () => {
      const settings = await Settings.find({})
        .populate("_user")
        .populate("likes");
      return settings.map((e) => settingsObject(e));
    },
    user: async (_, { id }) => {
      const user = await User.findById(id);
      return userObject(user);
    },
    items: async () => {
      const items = await Item.find({});
      return items?.reverse();
      // return items.map((item) => ({
      //   ...itemObject(item),
      // }));
    },
    articles: async () => {
      const articles = await Article.find({}).populate("featuredItems");
      return articles.reverse().map((article) => ({
        ...articleObject(article),
      }));
    },
    article: async (_, { id }) => {
      const article = await Article.findById(id).populate("featuredItems");
      return articleObject(article);
    },
    settings: async (_, { id = "" }) => {
      const settings = await Settings.findOne({ _user: id }).populate("likes").populate("_user");
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
      const article = new Article({
        ...articleInput,
        timestamp: Date.now(),
      });
      const savedArticle = await article.save();

      return articleFromId(savedArticle._id);
    },
    likeItem: async (_, { likeItemInput }) => {
      const { user, item } = likeItemInput;
      const settings = await Settings.findOne({ _user: user });

      if (!settings) return null;
      if (!settings.likes.includes(item)) {
        settings.likes.push(item);
        await settings.save();
      }

      return settingsFromId(user);
    },
    createRecommendation: async (_, { recommendationInput }) => {
      const { user, item } = recommendationInput;
      const settings = await Settings.findOne({ _user: user });

      if (!settings) return null;
      if (!settings.recommendations.includes(item)) {
        settings.recommendations.push(item);
        await settings.save();
      }

      return settingsFromId(user);
    }
  },
};

export default resolvers;
