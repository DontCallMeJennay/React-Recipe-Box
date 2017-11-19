import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export default class AddNewRecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: null,
      id: this.props.rID,
      name: "",
      prep: "",
      serves: 1,
      ingredients: [],
      instructions: "",
      visible: this.props.visible
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleRadio(e) {
    let param = "cat";
    let val = e.target.value;
    let newState = { [param]: val };
    this.setState(newState);
  }

  handleChange(e) {
    let param = e.target.id;
    let val = e.target.value;
    let newState = { [param]: val };
    this.setState(newState);
  }
  handleSubmit(e) {
    this.props.addNew(e, this.state);
    this.setState({
      cat: null,
      id: this.props.rID,
      name: "",
      prep: "",
      serves: 1,
      ingredients: [],
      instructions: "",
      hidden: true
    });
  }

  render() {
    let Classes = ["addForm"];
    if (this.props.editing === false) {
      Classes.push("hidden");
    } else {
      Classes = [];
    }

    return (
      <section className={Classes.join(" ")}>
        <form onSubmit={e => this.handleSubmit(e)}>
          <h2>Add new recipe</h2>
          <fieldset className="radio">
            <legend>Recipe category</legend>
            <input
              type="radio"
              id="0"
              name="selectCategory"
              value="0"
              onChange={e => this.handleRadio(e)}
            />
            <label htmlFor="0">Breakfast</label>
            <input
              type="radio"
              id="1"
              name="selectCategory"
              value="1"
              onChange={e => this.handleRadio(e)}
            />
            <label htmlFor="1">Lunch</label>
            <input
              type="radio"
              id="2"
              name="selectCategory"
              value="2"
              onChange={e => this.handleRadio(e)}
            />
            <label htmlFor="2">Dinner</label>
            <input
              type="radio"
              id="3"
              name="selectCategory"
              value="3"
              onChange={e => this.handleRadio(e)}
            />
            <label htmlFor="3">Snacks</label>
            <input
              type="radio"
              id="4"
              name="selectCategory"
              value="4"
              onChange={e => this.handleRadio(e)}
            />
            <label htmlFor="4">Dessert</label>
          </fieldset>
          <fieldset className="display-as-table">
            <legend>Recipe info</legend>
            <label htmlFor="name">Recipe name: </label>
            <input
              id="name"
              type="text"
              value={this.state.name}
              onChange={e => this.handleChange(e)}
            />
            <label htmlFor="prep">Prep time: </label>
            <input
              id="prep"
              type="text"
              value={this.state.prep}
              onChange={e => this.handleChange(e)}
            />
            <label htmlFor="servings">No. of servings:</label>
            <input
              id="servings"
              type="number"
              min="1"
              onChange={e => this.handleChange(e)}
            />
            <label htmlFor="ingredients">List of ingredients: </label>
            <input
              id="ingredients"
              type="text"
              placeholder="comma-separated list"
              value={this.state.ingredients}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>
          <fieldset>
            <legend>Preparation instructions</legend>
            <textarea
              className="steps"
              id="instructions"
              value={this.state.instructions}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>
          <input
            id="saveChanges"
            type="submit"
            value="update"
            onClick={e => e.preventDefault}
          />
        </form>
      </section>
    );
  }
}

AddNewRecipeForm.propTypes = {
  cat: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.oneOf(["string", "number"]),
  prep: PropTypes.oneOf(["string", "number"]),
  serves: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf("string"),
  instructions: PropTypes.string,
  visible: PropTypes.bool.isRequired
};

AddNewRecipeForm.defaultProps = {
  cat: 0,
  id: 10,
  serves: 1,
  visible: false
}