import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDeleteSavedRecipe, setSaveRecipe } from "../storing/recipes";
import { setToast } from "../storing/noti_bar";
import { deleteRecipe, saveRecipe } from "../api";
import Button from "../componenets/Button";
import { selectAccessToken, selectSavedRecipes } from "../help/select";
import { Loader } from "../util/Loader";

const RecipeButton = ({ recipeId, title, imageUrl, imageType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recipeId: isRecipeDetailPage } = useParams();

  const [isRecipeSaved, setIsRecipeSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const savedRecipes = useSelector(selectSavedRecipes);
  const accessToken = useSelector(selectAccessToken);

  const styles = {
    button: {
      padding: "10px 15px",
      borderRadius: "5px",
      backgroundColor: isRecipeSaved ? "#ff4d4d" : "#4CAF50",
      color: "white",
      cursor: "pointer",
      border: "none",
      transition: "background-color 0.3s ease",
    },
    loader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  useEffect(() => {
    setIsRecipeSaved(
      savedRecipes.some(
        ({ spoonacularRecipeId }) =>
          Number(spoonacularRecipeId) === Number(recipeId)
      )
    );
  }, [savedRecipes, recipeId]);

  const toggleSave = async () => {
    setIsLoading(true);
    try {
      if (!isRecipeSaved) {
        const recipeInfo = {
          spoonacularRecipeId: recipeId,
          title,
          image: imageUrl,
          imageType,
        };
        const response = await saveRecipe({ recipeInfo, accessToken });
        const { msg } = await response.json();
        if (response.ok) {
          dispatch(setSaveRecipe({ recipe: recipeInfo }));
          localStorage.setItem(
            "savedRecipes",
            JSON.stringify([...savedRecipes, recipeInfo])
          );
          dispatch(setToast({ status: "success", displayMessage: msg }));
          setIsRecipeSaved(true);
        } else {
          dispatch(setToast({ status: "failure", displayMessage: msg }));
        }
      } else {
        const response = await deleteRecipe({ recipeId, accessToken });
        const { msg } = await response.json();
        if (response.ok) {
          dispatch(setDeleteSavedRecipe({ recipeId }));
          const updatedSavedRecipes = savedRecipes.filter(
            ({ spoonacularRecipeId }) =>
              Number(spoonacularRecipeId) !== Number(recipeId)
          );
          localStorage.setItem(
            "savedRecipes",
            JSON.stringify(updatedSavedRecipes)
          );
          dispatch(setToast({ status: "success", displayMessage: msg }));
          setIsRecipeSaved(false);
        } else {
          dispatch(setToast({ status: "failure", displayMessage: msg }));
        }
      }
    } catch (error) {
      dispatch(
        setToast({ status: "failure", displayMessage: JSON.stringify(error) })
      );
    }
    setIsLoading(false);
    if (isRecipeDetailPage) {
      navigate("/home");
    }
  };

  return (
    <>
      {/* Loader during loading state */}
      {isLoading && (
        <div style={styles.loader}>
          <Loader />
        </div>
      )}

      {/* Button for save/unsave action */}
      {!isLoading && (
        <Button
          text={isRecipeSaved ? "Unsave" : "Save"}
          onClick={toggleSave}
          style={styles.button}
        />
      )}
    </>
  );
};

export default RecipeButton;
