import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToast } from "../storing/noti_bar";
import { createRecipe } from "../api";
import Button from "../componenets/Button";
import { selectAccessToken } from "../help/select";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);

  const [recipeInfo, setRecipeInfo] = useState({
    name: "",
    category: "",
    instructions: "",
    ingredients: "",
    cookingTime: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipeInfo({ ...recipeInfo, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const newRecipe = await createRecipe({ recipeInfo, accessToken });

      console.log("New recipe created:", newRecipe);

      dispatch(
        setToast({
          status: "success",
          displayMessage: "Recipe Created Successfully",
        })
      );

      navigate("/Myrecipes");
    } catch (error) {
      console.error("Error creating recipe:", error);

      dispatch(setToast({ status: "failure", displayMessage: error.message }));
    }

    setIsLoading(false);
  };

  const styles = {
    form: {
      maxWidth: "500px",
      margin: "20px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      fontSize: "24px",
      marginBottom: "20px",
      textAlign: "center",
    },
    formField: {
      display: "block",
      width: "100%",
      marginBottom: "10px",
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    textarea: {
      display: "block",
      width: "100%",
      marginBottom: "10px",
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      height: "100px",
    },
    button: {
      display: "block",
      width: "100%",
      padding: "10px 20px",
      fontSize: "16px",
      borderRadius: "5px",
      backgroundColor: "#007bff",
      color: "white",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <form onSubmit={handleFormSubmit} style={styles.form}>
      <h1 style={styles.heading}>Create New Recipe</h1>
      {/* Recipe form fields */}
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={recipeInfo.name}
          onChange={handleInputChange}
          style={styles.formField}
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={recipeInfo.category}
          onChange={handleInputChange}
          style={styles.formField}
        />
      </label>
      <label>
        Instructions:
        <textarea
          name="instructions"
          value={recipeInfo.instructions}
          onChange={handleInputChange}
          style={styles.textarea}
        />
      </label>
      <label>
        Ingredients:
        <textarea
          name="ingredients"
          value={recipeInfo.ingredients}
          onChange={handleInputChange}
          style={styles.textarea}
        />
      </label>
      <label>
        Cooking Time:
        <input
          type="text"
          name="cookingTime"
          value={recipeInfo.cookingTime}
          onChange={handleInputChange}
          style={styles.formField}
        />
      </label>

      {/* Submit Button */}
      {!isLoading ? (
        <Button type="submit" text="Create Recipe" style={styles.button} />
      ) : (
        <div>Loading...</div>
      )}
    </form>
  );
};

export default CreateRecipe;
