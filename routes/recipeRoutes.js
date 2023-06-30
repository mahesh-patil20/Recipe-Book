const express = require("express");
const router = express.Router();

const { getRecipes, addRecipe, deleteRecipe, getRecipe, updateRecipe, getUserRecipes } = require('../controllers/recipeController');
// const UserModel = require("../models/users");

router.post('/', getRecipes);
router.post('/userrecipes', getUserRecipes);
router.post('/add', addRecipe);
router.post('/get/:id', getRecipe);
router.post('/update/:id', updateRecipe);
router.post('/delete', deleteRecipe);

module.exports = router;