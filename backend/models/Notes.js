const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    //foreign key: user id 
    // to link notes schema to user schema so that notes are visible to particular user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user' // reference model name
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model('notes', NotesSchema);