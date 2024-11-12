const sequelize = require('../config/connection');
const { User} = require('../models');
const { Post} = require('../models');

const userData = require('./userData.json');
const postData = require('./dd.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of postData) {
    await Post.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
