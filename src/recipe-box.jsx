import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import RecipeCategory from "./recipe-category";

export default class RecipeBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="recipe-box">
        <h1>My Recipe Box</h1>
        <div className="edit">
          <button onClick={() => this.props.setMode("add")}>
            Add New Recipe
          </button>
        </div>
        {this.props.categories.map((cat, index) => (
          <RecipeCategory
            key={index.toString()}
            name={cat}
            setModeToView={this.props.setMode} 
            recipes={this.props.recipes[index]}
            viewRecipe={this.props.passActive}
          />
        ))}
      </div>
    );
  }
}