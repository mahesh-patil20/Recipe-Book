const Fuse = require('fuse.js');
const mongoose = require('mongoose');

const recipeModel = require('../models/recipe');

const getRecipes = async (req, res) => {
    try {
        console.log("Inside getRecipes")
        const recipes = await recipeModel.find({});
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Server Error in GetRecipes" });
    }
}
const getUserRecipes = async (req, res) => {
    try {
        console.log("Inside getUserRecipes")
        const userID = req.body.userID;
        // console.log(userID);
        const recipe = await recipeModel.find({ userOwner: userID });
        // console.log(recipe);
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: "Server Error in getUserRecipes" });
    }
}
const addRecipe = async (req, res) => {
    try {
        console.log("Inside addRecipe")
        const recipe = await recipeModel.create(req.body);
        res.json(recipe);

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
const getRecipe = async (req, res) => {
    try {
        console.log("Inside getRecipe")
        // console.log("Req Body is : ", req.body);
        const myrecipe = await recipeModel.findOne({ _id: req.body.recipeID });
        // console.log("Recipe is : ", myrecipe);
        res.json(myrecipe);
    } catch (error) {
        res.status(500).json({ message: "Server Error in Update Recipe" });
    }
}
const updateRecipe = async (req, res) => {
    try {

        console.log("Inside updateRecipe")
        // console.log("Req Body is : ", req.body);
        const filter = { _id: req.body._id };
        const update = { title: req.body.title, description: req.body.description, ingredients: req.body.ingredients, instructions: req.body.instructions, tips: req.body.tips, youtubeLink: req.body.youtubeLink };
        const newRecipe = await recipeModel.findOneAndUpdate(filter, update, {
            new: true
        });
        // const newRecipe = await recipeModel.findOne({ _id: req.body._id });
        // console.log("newRecipe is : ", newRecipe);
        res.json(newRecipe);

    } catch (error) {
        res.status(500).json({ message: "Server Error in Update Recipe" });
    }
}
const deleteRecipe = async (req, res) => {
    try {
        console.log("Inside deleteRecipe")
        console.log("Req Body RecipeId is : ", req.body.recipeId);
        await recipeModel.deleteOne({ _id: req.body.recipeId });
        // alert("Recipe deleted successfully");
        // console.log({ message: "Recipe deleted successfully" });
        res.json({ message: "Recipe deleted successfully" });
        // window.location.reload();

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

const searchRecipes = async (req, res) => {
    try {
        console.log("Inside searchRecipes")
        const searchQuery = req.body.search;
        console.log("Search Query is : ", searchQuery);
        const recipes = await recipeModel.find({});
        const options = {
            keys: ['title'], // Search for the 'title' property
            threshold: 0.3, // Adjust the search threshold (0 to 1, lower values are more permissive)
        };
        const fuse = new Fuse(recipes, options);
        const searchResults = fuse.search(searchQuery);
        res.json(searchResults);
    } catch (error) {
        res.status(500).json({ message: "Server Error in searchRecipes" });
    }
}


module.exports = {
    getRecipes,
    getUserRecipes,
    addRecipe,
    getRecipe,
    deleteRecipe,
    updateRecipe,
    searchRecipes
}