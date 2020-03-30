const {
  db
} = require('../dist/config/database');
const {
  User
} = require('../dist/models/User');

const clean_user = async () => {
  try {
    await User.sync({force: true});
    console.log("clean db done")
    const users = await User.findAll();
    console.log(users);
    await db.close();
  } catch (err) {
    console.log(err);
    await db.close();
  }
}

clean_user();