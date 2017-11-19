import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export default class viewForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }
  handleEdit(e) {
      e.preventDefault();
      this.props.setModeToEdit("edit");
  }
  render() {
    return (
      <div className="read-recipe">
        <h3>{this.props.recipe.name}</h3>
        <ul>
          <li>Prep time: {this.props.recipe.prep}</li>
          <li>Servings: {this.props.recipe.serves}</li>
        </ul>
        <h3>Ingredients </h3>
        <ul>
          {this.props.recipe.ingredients.map((item, index) => (
            <li key={index.toString()}>{item}</li>
          ))}
        </ul>
        <h3>Instructions</h3>
        <p>{this.props.recipe.instructions}</p>
                <button className="remove" onClick={e => this.handleEdit(e)}>
          edit
        </button>
        <button
          className="remove"
          onClick={e => this.props.removeOld(e, this.props.recipe)}
        >
          delete
        </button>

      </div>
    )
  }
}
