#!/usr/bin/mongosh

// {A Document Body}

// show dbs
// show collections
// use student

// db.dropDatabase();

db.createCollection('students');

db.getCollection('students').insertOne({
    name: 'Spongebob',
    age: 30,
    gpa: 3.2

})

db.getCollection('students').insertMany([
    {
        name: 'Patrick', age: 38, gpa: 1.5, fullTime: true, graduation: null,
        courses: ['Biology','Chemistry','Algebra']
    },
    {
        name: 'Sandy', age: 27, gpa: 4.0, fullTime: true, graduation: null,
        courses: ['Biology','Chemistry','Calculus']

    },
    {
        name: 'Gary', age: 18, gpa: 2.5, fullTime: false, graduation: null,
        courses: ['Biology','Boolean Algebra','Calculus']
    },
    {
        name: 'Larry', age: 32, gpa: 2.8, fullTime: false, graduation: null,
        courses: ['Gym','Biology','Calculus'],
        address: 
            {
                street: '123 Fake St.',
                city: 'Bikini Bottom',
                zip: 12345
            }
    }

]);

db.student.find();
db.students.find().sort({name:-1});
db.students.find().sort({gba:-1});
db.students.find().sort({gba:-1}).limit(2);
// .find({query},{projection});
db.students.find({fullTime:false});
db.students.find({},{name:true});
db.students.find({},{_id:false,name:true,gpa:true});

db.students.updateOne({name:'Spongebob'},{$set:{
    name: 'Spongebob',
    age: 30,
    gpa: 3.2,
    fullTime: false, 
    graduation: null,
    courses: ['Gym','Biology','Calculus'],
    address:
        {
            street: '321 Fake St.',
            city: 'Bikini Bottom',
            zip: 54321
        }
} } );

db.students.updateOne({_id:ObjectId("6470024d43bf50b414fe5612")},{$unset:{fullTime:''}});

db.students.updateMany({},{$set:{fullTime:false}});
db.students.updateOne({_id:ObjectId("646ffcc643bf50b414fe560f")},{$unset:{fullTime:''}});
db.students.updateMany({fullTime:{$exists:false}},{$set:{fullTime:true}});

db.createCollection('items');
db.getCollection('items').insertMany([
    { 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
    { 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
    { 'item': 'xyz', 'price': 5, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') },
    { 'item': 'xyz', 'price': 5, 'quantity': 20, 'date': new Date('2014-04-04T11:21:39.736Z') },
    { 'item': 'abc', 'price': 10, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
    { 'item': 'def', 'price': 7.5, 'quantity': 5, 'date': new Date('2015-06-04T05:08:13Z') },
    { 'item': 'def', 'price': 7.5, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
    { 'item': 'abc', 'price': 10, 'quantity': 5, 'date': new Date('2016-02-06T20:20:13Z') },
  ]);
  
db.students.find({name:{$ne:'Larry'}});
db.students.find({age:{$gt:32}});
db.students.find({age:{$gte:32}});
db.students.find({age:{$lt:32}});
db.students.find({age:{$lte:32}});

db.students.find({name:{$in:['Spongebob','Patrick','Sandy']}});
db.students.find({name:{$nin:['Spongebob','Patrick','Sandy']}});

db.students.find({$and:[{fullTime:false},{age:{$gte:18}}]});
db.students.find({$or:[{fullTime:false},{age:{$lte:22}}]});
db.students.find({$nor:[{fullTime:true},{age:{$lte:18}}]});
db.students.find({age:{$not:{$gte:32}}});

db.student.find({name:"larry"}).explain('executionStats');
db.student.createIndex({name:1});
db.student.getIndexes();
db.student.dropIndex('name_1');
db.createCollection("teachers",{capped:true,size:409600000, max:100},{autoIndexId:false});
db.createCollection("courses",{capped:true,size:409600000, max:100},{autoIndexId:true});
db.courses.drop()