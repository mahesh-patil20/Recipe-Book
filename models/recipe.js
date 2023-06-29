const mongoose = require('mongoose');


const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    ingredients: {
        type: String,
    },
    instructions: {
        type: String,
    },
    youtubeLink: {
        type: String,
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})


const recipeModel = mongoose.model('Recipe', recipeSchema);
module.exports = recipeModel;