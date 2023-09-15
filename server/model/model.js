const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const User = mongoose.model("User",Schema)
module.exports = User;













// // Define a Mongoose schema
// const dataSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     email: String
// });

// // Create a Mongoose model
// const DataDB = mongoose.model('DataDB', dataSchema);

// // Create a document
// const newData = new DataDB({
//     name: 'John Doe',
//     age: 30,
//     email: 'john@example.cotm'
// });
// console.log('Data saved to the database');
// // Save the document to the database
// await newData.save();
