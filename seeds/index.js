// TODO: find a generator to generate fake yet realistic client / job information!
const jobSeeds = require('./jobs.json')
const userSeeds = require('./users.json')
const serviceSeeds = require('./services.json')
const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect('mongodb://localhost/fleetsheets', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});


db.Service.deleteMany({})
    .then(() => db.Service.collection.insertMany(serviceSeeds))
    .then((data) => {
        console.log(data.result.n + ' services inserted')
        db.Job.deleteMany({})
            .then(() => db.Job.collection.insertMany(jobSeeds))
            .then((data) => {
                console.log(data.result.n + ' jobs inserted')
                db.User.deleteMany({})
                    .then(() => db.User.collection.insertMany(userSeeds))
                    .then((data) => {
                        console.log(data.result.n + ' users inserted')
                        process.exit(0)
                    })
            })


    })
    .catch((err) => {
        console.log(err)
        process.exit(1)

    })
