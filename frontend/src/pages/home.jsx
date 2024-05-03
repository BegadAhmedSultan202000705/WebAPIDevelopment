import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToast } from "../storing/noti_bar";
import { setSavedRecipes } from "../storing/recipes";
import { destroyAccessToken } from "../api";
import { getSavedRecipes } from "../api";

import Search from "../componenets/search";
import Button from "../componenets/Button";
import Recipe from "../componenets/Recipe";
import UnauthorizedPage from "../pages/Unauth";
import {
  selectAccessToken,
  selectSavedRecipes,
  selectUserData,
} from "../help/select";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector(selectUserData);
  const accessToken = useSelector(selectAccessToken);
  const savedRecipes = useSelector(selectSavedRecipes);

  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 20px",
      backgroundColor: "#5f27cd",
      color: "#fff",
    },
    appHeader: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    userDetails: {
      display: "flex",
      alignItems: "center",
    },
    userName: {
      marginRight: "10px",
      fontSize: "16px",
      color: "#fff",
    },
    appContainer: {
      padding: "20px",
    },
    savedRecipesHeading: {
      fontSize: "20px",
      fontWeight: "bold",
      margin: "20px 0",
    },
    savedRecipesList: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
    },
  };

  const handleLogout = async () => {
    await destroyAccessToken({ accessToken });
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const res = await getSavedRecipes({ accessToken });
        const { savedRecipes } = await res.json();
        dispatch(setSavedRecipes({ savedRecipes }));
        localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
      } catch (error) {
        dispatch(
          setToast({ status: "failure", displayMessage: JSON.stringify(error) })
        );
      }
    };
    fetchSavedRecipes();
  }, [accessToken, dispatch]);

  if (!accessToken) {
    return <UnauthorizedPage />;
  }

  const handleGoToMyRecipes = () => {
    navigate("/Myrecipes");
  };

  return (
    <>
      {/* Navigation bar */}
      <div style={styles.nav}>
        <h1 style={styles.appHeader}>Bego Cooks</h1>
        <div style={styles.userDetails}>
          <Button text="My Recipes" onClick={handleGoToMyRecipes} />
          <div style={styles.userName}>{userData.name}</div>
          <Button className="logout" text="Logout" onClick={handleLogout} />
        </div>
      </div>

      {/* App container */}
      <div style={styles.appContainer}>
        {/* Search component */}
        <Search />

        <hr />

        {/* Saved Recipes heading */}
        <h3 style={styles.savedRecipesHeading}>Saved Recipes</h3>

        {/* Saved recipes list */}
        <div style={styles.savedRecipesList}>
          {(savedRecipes || []).map(
            ({ spoonacularRecipeId, title, image, imageType }) => (
              <Recipe
                key={spoonacularRecipeId}
                imageType={imageType}
                title={title}
                imageUrl={image}
                id={spoonacularRecipeId}
                className="saved-item"
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
