import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export default class editForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.recipe;
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
    handleChange(e) {
    e.preventDefault();
      let param = e.target.id;
      this.setState({ [param]: e.target.value });
      console.log(e.target.value);
  }
    handleUpdate(e, state) {
    e.preventDefault();
    this.props.updateRecipe(e, this.state);
    this.props.setModeToView("view");
  }
  render() {
  return (
      <div className="edit-form">             
        <form>    
        <h2>[EDITING] {this.props.recipe.name}</h2>    
        <fieldset>
          <legend>Recipe category</legend>

          <label htmlFor="category">Category: </label>
          <select id="newCat" selected={this.state.cat} onChange={e => this.handleChange(e)}>
              <option value="0">Breakfast</option>
              <option value="1">Lunch</option>
              <option value="2">Dinner</option>
              <option value="3">Snacks</option>
              <option value="4">Dessert</option>
          </select>
</fieldset>
<fieldset>
<legend>Recipe info</legend>
          <label htmlFor="name">Name: </label>
          <input 
          type="text"
          id="name" 
          value= {this.state.name} 
          onChange={e => this.handleChange(e)}
           />
            <label htmlFor="prep">Prep time: </label>
            <input
              type="text"
              id="prep"
              value={this.state.prep}
              onChange={e => this.handleChange(e)}
            />
            <br />
            <label htmlFor="serves">No. of servings: </label>
            <input
              type="text"
              id="serves"
              value={this.state.serves}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>
          
          <fieldset>
          <legend>Ingredients</legend>
            <input
              type="text"
              id="ingredients"
              placeholder="comma-separated list"
              value={this.state.ingredients}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>
          <fieldset>
          <legend>Instructions</legend>
          <textarea
            id="instructions"
            value={this.state.instructions}
            onChange={e => this.handleChange(e)}
          />
          </fieldset>
          <div className="remove">
          <button
          className="remove"
          onClick={e => this.handleUpdate(e, this.state)}
        >
          update
        </button>
          <button
            className="remove"
            onClick={e => this.props.removeOld(e, this.props.activeRecipe)}
          >
            delete
          </button>
        </div>
        </form>
      </div>
    )
}
  }
