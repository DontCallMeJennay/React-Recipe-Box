import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import RecipeCategory from "./recipe-category";
import RecipeBox from "./recipe-box";
import AddNewRecipeForm from "./add-new-recipe-form";

import App from "./App.jsx";
import { AppContainer } from 'react-hot-loader';


const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('react-container')
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./App.jsx", () => {
    render(App)
  });
}