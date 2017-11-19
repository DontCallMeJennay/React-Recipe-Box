import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import RecipeCategory from "./recipe-category";
import RecipeBox from "./recipe-box";
import AddNewRecipeForm from "./add-new-recipe-form";
import EditForm from "./edit-form"
import ViewForm from "./view-form"


const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Snacks", "Desserts"];
const RECIPES = [
    [{
            cat: 0,
            id: 0,
            name: "Scrambled eggs",
            prep: "5 minutes",
            serves: 1,
            ingredients: ["2 raw eggs", "1/4 cup milk", "salt and pepper to taste"],
            instructions: "Crack eggs into pan, stir in milk, and stir over medium heat until eggs are set. Season to taste and serve hot."
        },
        {
            cat: 0,
            id: 1,
            name: "Bacon",
            prep: "10 minutes",
            serves: 1,
            ingredients: ["4 strips bacon"],
            instructions: "Fry over low-medium heat until crispy but not crunchy. Serve with eggs."
        }
    ],
    [{
            cat: 1,
            id: 2,
            name: "Peanut butter sandwich",
            prep: "5 minutes",
            serves: 1,
            ingredients: ["Crunchy peanut butter", "2 slices bread"],
            instructions: "Spread peanut butter thickly over bread. Slap together. Enjoy. Wash down with glass of milk."
        },
        {
            cat: 1,
            id: 3,
            name: "Glass of milk",
            prep: "10 seconds",
            serves: 1,
            ingredients: ["glass", "milk"],
            instructions: "Pour milk in glass. Drink.  (Not out of the carton, you heathen.) "
        }
    ],
    [{
        cat: 2,
        id: 4,
        name: "Pot roast",
        prep: "9-12 hours",
        serves: 8,
        ingredients: [
            "3 lb chuck roast",
            "1 quart beef broth",
            "2 yellow onions",
            "1 lb raw carrots",
            "1 lb red potatoes",
            "1 large parsnip",
            "1 Tbsp minced garlic",
            "salt and pepper to taste"
        ],
        instructions: "Season meat and roast in oven at 400' until well browned on outside. Wash and chop vegetables. When meat is browned, layer onions and garlic in crock pot, then add meat, then add remaining vegetables on top. Pour in beef broth. Turn crock pot on low and cook overnight or until tender, 8-12 hours."
    }],
    [{
        cat: 3,
        id: 5,
        name: "Potato chips",
        prep: "instant",
        serves: "1",
        ingredients: ["bag of potato chips"],
        instructions: "Open. Eat. Don't get crumbs everywhere."
    }],
    [{
        cat: 4,
        id: 6,
        name: "Ben & Jerry's",
        prep: "instant",
        serves: "1",
        ingredients: ["pint of ice cream"],
        instructions: "Open. Eat. Guilt optional."
    }]
];


export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: RECIPES,
            categories: CATEGORIES,
            activeRecipe: RECIPES[0][0],
            mode: "view",
            rID: 10
        };
        this.updateActive = this.updateActive.bind(this);
        this.setMode = this.setMode.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.updateRecipe = this.updateRecipe.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.updateStorage = this.updateStorage.bind(this);
    }
    componentDidMount() {
        if (localStorage.recipeData) {
            this.setState({ recipes: JSON.parse(localStorage.getItem("recipeData")) });
        }
    }
    updateActive(recipe) {
        this.setState({
            activeRecipe: recipe,
            editing: false
        });
    }
    updateStorage() {
      localStorage.setItem("recipeData", JSON.stringify(this.state.recipes));
    }
    setMode(mode) {
        this.setState({ mode: mode });
    }
    addRecipe(e, data) {
        e.preventDefault();
        if (
            data.cat &&
            data.id &&
            data.name &&
            data.prep &&
            data.serves &&
            data.ingredients &&
            data.instructions
        ) {
            this.setState({ rID: this.state.rID + 1 });
            let i = data.cat;
            let list = data.ingredients;
            data.ingredients = list.split(",");
            let addedRecipe = this.state.recipes;
            addedRecipe[i].push(data);
            this.setState({ recipes: addedRecipe });
            this.updateStorage();
        } else {
            alert("Please enter a value for all fields in the recipe form.");
        }
    }

    updateRecipe(e, data) {
        e.preventDefault();
        let newRecipes = this.state.recipes;
        let x = data.cat;
        let a = 0, b = 0;
        if(data.newCat) {
            let y = data.newCat;
            delete data.newCat;
            newRecipes[y].push(data);
            //TODO: Splice recipe out of previous category
        } else {
        for(let i=0; i < newRecipes[x].length; i++) {
            if (newRecipes[x][i].id === data.id) {
                newRecipes[x][i] = data;
                a = x;
                b = i;
            }
        }
    }
        this.setState({
            recipes: newRecipes,
            activeRecipe: newRecipes[a][b]
        })
        this.updateStorage();
    }
    
    deleteRecipe(e, data) {
        e.preventDefault();
        if (confirm("Are you sure you want to delete " + data.name + "?")) {
            let recipes = this.state.recipes;
            let x = [];
            recipes[data.cat].forEach(function(obj) {
                if (obj.id !== data.id) {
                    x.push(obj);
                }
            });
            recipes[data.cat] = x;
            this.setState({
                recipes: recipes,
                activeRecipe: recipes[0][0]
            });
        }
        this.updateStorage();
    }
    render() {
        let rightSide = null;
        if (this.state.mode === "add") {
            rightSide = ( <AddNewRecipeForm 
                addNew = { this.addRecipe } rID = { this.state.rID }/>
            );
        } else if (this.state.mode === "edit") {
            rightSide = (<EditForm
                recipe = {this.state.activeRecipe}
                setModeToView = {this.setMode}
                updateRecipe={this.updateRecipe}
             />)
        } else {    //this.state.mode === "view"
            rightSide = ( <ViewForm 
                recipe = { this.state.activeRecipe }
                passActive = { this.updateActive } 
                setModeToEdit = {this.setMode}
                updateRecipe = {this.updateRecipe} 
                removeOld = { this.deleteRecipe }
                />
            );
        }
        return ( 
          <main>
            <RecipeBox 
                recipes = { this.state.recipes } 
                categories = { this.state.categories } 
                passActive = { this.updateActive } 
                setMode = { this.setMode } 
            /> 
            { rightSide } 
          </main>
        );
    }
}