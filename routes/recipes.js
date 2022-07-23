const express = require('express');
const fs = require("fs");
const router = express.Router();

const fileDirName = __dirname + "/../data/recipe.json";

/* GET users listing. */
router.get('/all', function(req, res, next) {
    fs.readFile(fileDirName, "utf8", (err, jsonString) => {
        res.send(jsonString)
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        console.log("File data:", jsonString);
    });
});

router.post('/newRecipe',function (req, res, next){
    console.log(req.body)
    const {recipe} = req.body;
    console.log(recipe)
    fs.readFile(fileDirName, function (err, data) {
        const json = JSON.parse(data);
        json.push(recipe)

        fs.writeFile(fileDirName, JSON.stringify(json),err => {
                if (err) {
                    console.log('Error writing file', err)
                } else {
                    console.log('Successfully wrote file')
                    res.send('Recipe added succesfully')
                }
            }
        )
    })
});

router.delete("/delete/:index",function (req, res){
    const recipeIndex =parseInt(req.params.index)


   /* const findRecipeIndexByID = (recipe, title) => {
        for(let i = 0; i < recipe.length; i++){
            if(recipe[i].title === title){
                return i
            }
        }
        return null;
    }*/

    fs.readFile(fileDirName, function (err, data) {
        const recipes = JSON.parse(data)
        //const recipeIndex = findRecipeIndexByID(recipes, title)
            recipes.splice(recipeIndex, 1);
            console.log(recipes)

            fs.writeFile(fileDirName, JSON.stringify(recipes), err => {
                    if (err) {
                        console.log('Error writing file', err)
                    } else {
                        console.log('Successfully deleted file')
                        res.send('Recipe deleted successfully')
                    }
                }
            )
    })
})

router.delete("/deleteAll",function (req, res,next){

    fs.writeFile(fileDirName, JSON.stringify([]),err => {
            if (err) {
                console.log('Error writing file', err)
                res.send(err)
            } else {

                console.log('Successfully deleted file')
                res.send('Recipe deleted successfully')
            }
        }
    )
})


module.exports = router;
