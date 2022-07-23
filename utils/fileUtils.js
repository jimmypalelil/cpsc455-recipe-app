import fs from "fs";

export const getRecipeListFromFile = () => {
    const fileData = fs.readFileSync('./data/recipe.json')
    return JSON.parse(fileData);
}
