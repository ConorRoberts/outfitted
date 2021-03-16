import User from "../models/user";
import Item from "../models/item";

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
  },
};

export default resolvers;
