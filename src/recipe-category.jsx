import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export default class RecipeCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.showRecipe = this.showRecipe.bind(this);
  }
  styleToggle() {
    this.setState({ active: !this.state.active });
  }
  showRecipe(recipe) {
    this.props.viewRecipe(recipe);
    this.props.setModeToView("view");
    }
  render() {
    let Classes = ["category-header"];
    if (!this.state.active) {
      Classes.push("collapsed");
    } else {
      Classes.push("highlight");
    }
    return (
      <div className={Classes.join(" ")}>
        <h2 onClick={e => this.styleToggle(e.target)}>{this.props.name} <span className="right">({this.props.recipes.length})</span></h2>
        <ul>
          {this.props.recipes.map((recipe, index) => (
            <li key={index.toString()} onClick={() => this.showRecipe(recipe)}>{recipe.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
