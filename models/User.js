const mongoose = require('mongoose');
// const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String, require: true
    },
    email: {
        type: String, require: true, unique: true
    },
    password: {
        type: String, require: true
    },
    subdomain: {
        type: String, require: true
    }
},
{
    collection: 'User',
});

// UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", UserSchema);