const {
  db
} = require('../dist/config/database');
const {
  User
} = require('../dist/models/User');

const create_user = async () => {
  try {
    await db.sync({alter: true});
    const user = await User.create({
      "email": "test12345@gmail.com",
      "password": "admintest12345"
    })
    console.log(`user email=${user.email} create`);
    await db.close();
  } catch (err) {
    console.log(err)
    await db.close();
  }
}

create_user();