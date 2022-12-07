import _ from 'lodash';

var sampleData = {
  apps: [
    { id: 1, title: 'Lorem', published: true, userId: 123 },
    { id: 2, title: 'Ipsum', published: false, userId: 123 },
    { id: 3, title: 'Dolor', published: true, userId: 456 },
    { id: 4, title: 'Sit', published: true, userId: 789 },
    { id: 5, title: 'Amet', published: false, userId: 123 },
    { id: 6, title: 'Et', published: true, userId: 123 }
  ],
  organizations: [
    { id: 1, name: 'Google', suspended: true, userId: 123 },
    { id: 2, name: 'Apple', suspended: false, userId: 456 },
    { id: 3, name: 'Fliplet', suspended: false, userId: 123 }
  ]
}

// @TODO: This is the model/class you should work out
// var User;

// User class
class User {
  constructor(user) {
    this.userId = user.id;
  }
}

User.prototype.select = function (select) {
  this.select = select;
  return this;
}

User.prototype.attributes = function (attributes) {
  this.attributes = attributes;
  return this;
}

User.prototype.where = function (where) {
  this.where = where;
  return this;
}

User.prototype.order = function (order) {
  this.order = order;
  return this;
}

User.prototype.findAll = function () {

  let selectedArr = _.get(sampleData, this.select);
  selectedArr = _.filter(selectedArr, ['userId', this.userId]);
  selectedArr = _.filter(selectedArr, this.where);
  selectedArr = _.map(selectedArr, obj => _.pick(obj, this.attributes));
  selectedArr = _.orderBy(selectedArr, this.order, ['asc']);

  return new Promise(function (resolve, reject) {
    resolve(selectedArr);
  });
}

User.prototype.findOne = function () {

  let selectedArr = _.result(sampleData, this.select);
  selectedArr = _.filter(selectedArr, ['userId', this.userId]);
  let singleObject = _.find(selectedArr, this.where);
  singleObject = _.pick(singleObject, this.attributes);

  return new Promise(function (resolve, reject) {
    resolve(singleObject);
  });
}

// ------------------------------------------
// You shouldn't need to edit below this line

var user = new User({
  id: 123
});

// Mimic what a ORM-like query engine would do by filtering the
// "sampleData" based on the query and the expected result example.
// Hint: lodash can be quite handly in dealing with this.
user
  .select('apps')
  .attributes(['id', 'title'])
  .where({ published: true })
  .order(['title'])
  .findAll()
  .then(function (apps) {
    // The expected result is for the "apps" array is:
    // [ { id: 6, title: 'Et' }, { id: 1, title: 'Lorem' } ]
    console.log(apps);
  })

//console.log('---------------------------------------');
var user1 = new User({
  id: 123
});

user1
  .select('organizations')
  .attributes(['id', 'name'])
  .where({ suspended: false })
  .findOne()
  .then(function (organization) {
    // The expected result is for the "organization" object is:
    // { id: 3, name: 'Fliplet' }
    console.log(organization);
  })