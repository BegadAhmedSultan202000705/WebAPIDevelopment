import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthenticationPage from "./pages/authpage";
import HomePage from "./pages/home";
import Recipes from "./pages/Recipe";
import RecipeDetailPage from "./pages/Details";
import UnauthorizedPage from "./pages/Unauth";
import CreateRecipe from "./pages/createRecipe";
import MyRecipes from "./pages/myRecipes";

const styles = {
  appContainer: {
    padding: "20px",
    backgroundColor: "#f8f8f8",
    minHeight: "100vh",
  },
  routeContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
};

function App() {
  return (
    <div style={styles.appContainer}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthenticationPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:recipeId" element={<RecipeDetailPage />} />
          <Route path="/Myrecipes" element={<MyRecipes />} />
          <Route path="/newrecipe" element={<CreateRecipe />} />
          <Route
            path="*"
            element={
              <UnauthorizedPage
                path="/"
                displayMessage="You are not authorized to access this page. Please log in to continue."
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
