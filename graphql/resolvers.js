import User from "@models/user";
import Item from "@models/item";
import Article from "@models/article";
import Settings from "@models/settings";
import Feedback from "@models/feedback";

const formatUser = (user) => {
  return user
    ? {
      ...user._doc,
      _id: user.id,
    }
    : null;
};
const formatItem = (item) => {
  return item
    ? {
      ...item._doc,
      _id: item.id,
    }
    : null;
};

const formatSettings = (settings) => {
  return settings
    ? {
      ...settings._doc,
      _id: settings.id,
      birthday: new Date(settings._doc.birthday).toISOString(),
      recommendations: settings._doc.recommendations.map(e => ({
        item: e.item,
        _id: e.id,
        timeLive: new Date(e.timeLive).toISOString(),
        timeRecommended: new Date(e.timeRecommended).toISOString(),
        body: e.body
      })),
    }
    : null;
};
const articleObject = (article) => {
  return article
    ? {
      ...article._doc,
      _id: article.id,
      timestamp: new Date(article._doc.timestamp).toISOString(),
    }
    : null;
};

/**
 * Format feedback document to be used by GQL
 * @param {} feedback 
 * @returns 
 */
const formatFeedback = ({ _doc }) => {
  return {
    ..._doc,
    timestamp: new Date(_doc.timestamp).toISOString(),
    creator: formatUser(_doc.creator)
  }
}

/**
 * Grab feedback document from ID
 * @param {} id 
 * @returns 
 */
const getFeedback = async (id) => {
  const feedback = await Feedback.findById(id).populate("creator");
  return formatFeedback(feedback);
}

const getItem = async (id) => {
  const item = await Item.findById(id);
  return formatItem(item);
};

const getSettings = async (id) => {
  const settings = await Settings.findOne({ _user: id }).populate([{
    path: "likes",
    model: Item
  },
  {
    path: "_user",
    model: User
  },
  {
    path: "recommendations.item",
    model: Item
  }])

  return formatSettings(settings);
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
        .populate("likes")
        .populate("recommendations");
      return settings.map((e) => formatSettings(e));
    },
    user: async (_, { id }) => {
      const user = await User.findById(id);
      return formatUser(user);
    },
    items: async () => {
      const items = await Item.find({});
      return items?.reverse();
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
    item: async (_, { id }) => {
      return getItem(id);
    },
    settings: async (_, { id = "" }) => {
      return getSettings(id);
    },
    getAllFeedback: async () => {
      const result = await Feedback.find({}).populate("creator");

      return result.map(e => formatFeedback(e));
    }
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
          ...formatSettings(settings),
        };
      }

      return null;
    },
    createItem: async (_, { id, newItemInput }) => {
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
    likeItem: async (_, { userId, itemId }) => {
      const settings = await Settings.findOne({ _user: userId });

      // If there is no settings object to mutate, end
      if (!settings) return null;

      // Decide whether to remove or append the item ID
      if (settings.likes.includes(itemId)) {
        settings.likes.pull(itemId);
      } else {
        settings.likes.push(itemId);
      }

      await settings.save();

      return getSettings(userId);
    },
    createRecommendation: async (_, { recommendationInput }) => {
      const { user, item, timeLive, timeRecommended, body } = recommendationInput;
      const settings = await Settings.findOne({ _user: user });

      if (!settings) return null;

      // Default for recommendations if it's not already there
      if (!settings.recommendations) {
        settings.recommendations = [];
      }

      if (!settings.recommendations.map(e => e.item).includes(item)) {
        settings.recommendations.push({ item, timeLive, timeRecommended, body });
        await settings.save();
      }

      return getSettings(user);
    },
    updateItem: async (_, { id, updateItemInput }) => {
      await Item.findByIdAndUpdate(id, { ...updateItemInput });

      return getItem(id);
    },
    updateArticle: async (_, { id, updatedArticle }) => {
      await Article.findByIdAndUpdate(id, { ...updatedArticle });

      return articleFromId(id);
    },
    createFeedback: async (_, { createFeedbackInput }) => {
      const feedback = new Feedback({ ...createFeedbackInput });

      await feedback.save();

      return await getFeedback(feedback.id);
    },
    deleteRecommendation: async (_, { userId, recommendationId }) => {
      const updatedSettings = await Settings.findOneAndUpdate({ _user: userId }, {
        $pull: {
          recommendations: { _id: recommendationId }
        }
      }, { new: true })

      return updatedSettings;
    }
  },
};

export default resolvers;
