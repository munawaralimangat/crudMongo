const mongoose = require('mongoose');

const url = process.env.MONGO_URL;

async function connectDB() {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("database connected")
    } catch (err) {
        console.error('Error connecting to database:', err);
    }
}

module.exports = connectDB;














// const mongoose = require('mongoose')

// const url = process.env.MONGO_URL

// async function connectDB (){
//     try{
//         await mongoose.connect(url,{
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         })//it takes two parameters url/conncetion credentials and an object
//         .then(result => console.log("database connected"))
//         .catch(err => console.log(err))
//     }catch(err){
//         console.log(err)
//     }
// }

// module.exports = connectDB;

// async function connectDB() {
//     try {
//         await mongoose.connect(url, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });

//         const db = mongoose.connection;

//         db.on('error', (error) => {
//             console.error('Database connection error:', error);
//         });

//         db.once('open', () => {
//             console.log('Database connection opened');
//         });

//     } catch (err) {
//         console.error('Error connecting to database:', err);
//     }
// }
