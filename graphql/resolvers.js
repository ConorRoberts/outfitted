import User from "../models/user";
import Item from "../models/item";
import Article from "../models/article";

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
  return {
    ...item._doc,
    _id: item.id,
  };
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
  },
  Mutation: {
    updateUserPrefs: async (_, { id, height, birthday, build, gender }) => {
      const user = await User.findByIdAndUpdate(
        id,
        {
          height,
          build,
          gender,
          birthday,
        },
        { new: true }
      );

      if (user) {
        return {
          ...userObject(user),
        };
      }

      return null;
    },
    createItem: async (
      _,
      {
        name,
        brand,
        description,
        season,
        type,
        occasion,
        colours,
        material,
        price,
        image,
      }
    ) => {
      const item = new Item({
        name,
        brand,
        description,
        season,
        type,
        occasion,
        colours,
        material,
        price,
        image,
      });

      const newItem = await item.save();

      return newItem;
    },
    createArticle: async (_, { articleInput }) => {
      const { title, body, sections, image } = articleInput;

      const article = new Article({
        title,
        body,
        image,
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
