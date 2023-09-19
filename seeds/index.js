const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
   .then(() => {
       console.log("Mongo connention open!!")
   })
   .catch(err => {
       console.log("Error, Mongo Connection!!")
       console.log(err)
   })

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!!");
});

const sample = array =>  array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //your user id
            author: '64df9fa7aaa3f7900abee120',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,           
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus sint ex dolores fugit cum, cumque illum hic aliquam minus iure quos fugiat sapiente deleniti ratione molestias iste culpa eius quo.',
            price,
            geometry: { 
                    type: 'Point', 
                    coordinates: [ 
                        cities[random1000].longitude,
                        cities[random1000].latitude,
                ] 
                },
            images: [
                {
                  url: 'https://res.cloudinary.com/dzzreu09i/image/upload/v1694178449/YelpCamp/awfmzlqeo0slii5eilhe.jpg',
                  filename: 'YelpCamp/awfmzlqeo0slii5eilhe'
                },
                {
                  url: 'https://res.cloudinary.com/dzzreu09i/image/upload/v1694178890/YelpCamp/klfblaqdaebhcmnt34wa.jpg',
                  filename: 'YelpCamp/klfblaqdaebhcmnt34wa'
                }
              ] 
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});


// const sample = array => array[Math.floor(Math.random() * array.length)];


// const seedDB = async () => {
//     await Campground.deleteMany({});
//     for (let i = 0; i < 50; i++) {
//         const random1000 = Math.floor(Math.random() * 1000);
//         const camp = new Campground({
//             location: `${cities[random1000].city}, ${cities[random1000].state}`,
//             title: `${sample(descriptors)} ${sample(places)}`
//         })
//         await camp.save();
//     }
// }

// seedDB().then(() => {
//     mongoose.connection.close();
// })