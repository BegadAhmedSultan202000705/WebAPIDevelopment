import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import RecipeDetails from "../componenets/Details";

import UnauthorizedPage from "../pages/Unauth";

import { selectRecipes, selectSavedRecipes } from "../help/select";

const styles = {
  container: {
    padding: "20px",
  },
  unauthorizedMessage: {
    fontSize: "18px",
    margin: "20px 0",
    color: "#d9534f",
  },
  homeLink: {
    color: "#007bff",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

const RecipeDetailPage = () => {
  const { recipeId } = useParams();

  const { recipes: { results = [] } = {} } = useSelector(selectRecipes);
  const savedRecipes = useSelector(selectSavedRecipes);

  const findRecipe = (recipeList) => {
    for (const recipe of recipeList) {
      if (
        Number(recipe.id || recipe.spoonacularRecipeId) === Number(recipeId)
      ) {
        return recipe;
      }
    }
    return null;
  };

  const recipe = findRecipe(results) || findRecipe(savedRecipes);

  if (recipe) {
    const { id, image, title, imageType, spoonacularRecipeId } = recipe;
    return (
      <div style={styles.container}>
        <RecipeDetails
          id={id || spoonacularRecipeId}
          imageUrl={image}
          title={title}
          imageType={imageType}
        />
      </div>
    );
  } else {
    return (
      <div style={styles.container}>
        <UnauthorizedPage
          path="/home"
          displayMessage="The recipe you are looking for is not available. Please visit the homepage to check more."
        />
        <p style={styles.unauthorizedMessage}>
          The recipe you are looking for is not available.
        </p>
        <a href="/home" style={styles.homeLink}>
          Please visit the homepage to check more.
        </a>
      </div>
    );
  }
};

export default RecipeDetailPage;
