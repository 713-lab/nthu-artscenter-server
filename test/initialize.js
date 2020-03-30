const {
  db
} = require('../dist/config/database');
const {
  User
} = require('../dist/models/User');
const { Exhibition } = require('../dist/models/Exhibition');
const { Media } = require('../dist/models/Media');
const { Information } = require('../dist/models/Information');
const { Publication } = require('../dist/models/Publication');

const {
  testUser1,
  testExhibition1,
  testExhibition2,
  testExhibition3,
  testInformation1,
  testPublication1,
  testMedia1,
  testMedia2,
  testMedia3,
  testMedia4
} = require('./data');

const initialize = async () => {
  try {
    await db.sync({
      force: true
    });
    const user = await User.create(testUser1)
    console.log(`create user email=${user.email}`);
    //exhibition 1
    const exhibition1 = await Exhibition.create(testExhibition1);
    const exhibition2 = await Exhibition.create(testExhibition2);
    const exhibition3 = await Exhibition.create(testExhibition3);

    const information1 = await Information.create(testInformation1);

    const publication1 = await Publication.create(testPublication1);
    
    await Media.create(testMedia1);
    await Media.create(testMedia2);
    await Media.create(testMedia3);
    await Media.create(testMedia4);

    console.log("OK");
    await db.close();
  } catch (err) {
    console.log(err)
    await db.close();
  }
}

initialize();