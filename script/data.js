// User
const testUser1 = {
  "email": "test1@gmail.com",
  "password": "admintest1"
}
// Exhibition
const testExhibition1 = {
  id: 1,
  title: "test exhibition 1",
  description: "test exhibition 1 description",
  type: "visual_arts",
  start_date: "2019-02-27",
  performer: "artscenter",
  cover_id: 1
}

const testExhibition2 = {
  id: 2,
  title: "test exhibition 2",
  description: "test exhibition 2 description",
  type: "film",
  start_date: "2019-02-27",
  performer: "ChiaHsin",
  cover_id: 2
}

const testExhibition3 = {
  id: 3,
  title: "test exhibition 3 ChiaHsin",
  description: "test exhibition 3 description",
  type: "visual_arts",
  start_date: "2018-02-27",
  performer: "ChiaHsin",
  cover_id: 3
}

// Information
const testInformation1 = {
  id: 1,
  title: "test information 1",
  description: "test information 1 description",
  start_date: "2019-01-02",
  isActive: "true"
}

// Publication
const testPublication1 = {
  id: 1,
  name: "test1",
  author: "yc&ch",
}

const testMedia1 = {
  id: 1,
  file: "1.jpg",
  note: "test 1.jpg",
  semester: "201902",
  exhibition_id: 1
}

const testMedia2 = {
  id: 2,
  file: "2.jpg",
  note: "test 2.jpg",
  semester: "201902",
}

const testMedia3 = {
  id: 3,
  file: "3.jpg",
  note: "test 3.jpg",
  semester: "201902",
}

const testMedia4 = {
  id: 4,
  file: "4.jpg",
  note: "test 4.jpg",
  semester: "201802",
}

module.exports = {
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
}