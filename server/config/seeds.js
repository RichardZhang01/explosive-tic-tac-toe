const db = require('./connection');
const { User } = require('../models');

db.once('open', async () => {
  
  await User.deleteMany();

  await User.insertMany([
    {
      username: 'John',
      email: 'john@email.com',
      password: 'john123'
    },
    {
      username: 'althea',
      email: 'althea@email.com',
      password: 'althea123'
    },
    {
      username: 'richard',
      email: 'richard@email.com',
      password: 'richard123'
    }
  ]);

  console.log('users seeded');

  process.exit();
});
