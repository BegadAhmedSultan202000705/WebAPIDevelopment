import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../componenets/Button";
import { fetchMyRecipes } from "../api";
import { selectAccessToken } from "../help/select";

const MyRecipes = () => {
  const navigate = useNavigate();
  const accessToken = useSelector(selectAccessToken);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!accessToken) {
      console.error("Access Token is undefined, redirecting to login...");
      navigate("/login");
      return;
    }

    const getMyRecipes = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMyRecipes(accessToken);
        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          throw new Error("Unexpected data format received");
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setErrorMessage(error.toString());
      } finally {
        setIsLoading(false);
      }
    };

    getMyRecipes();
  }, [accessToken, navigate]);

  const handleCreateNewRecipe = () => {
    navigate("/newrecipe");
  };

  const styles = {
    container: {
      padding: "20px",
      textAlign: "center",
    },
    heading: {
      fontSize: "28px",
      marginBottom: "20px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      borderRadius: "5px",
      backgroundColor: "#007bff",
      color: "white",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    list: {
      marginTop: "20px",
    },
    listItem: {
      marginBottom: "10px",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      textAlign: "left",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>My Recipes</h1>
      <Button
        text="Create New Recipe"
        onClick={handleCreateNewRecipe}
        style={styles.button}
      />
      {errorMessage && <p>{errorMessage}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div style={styles.list}>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe._id} style={styles.listItem}>
                {recipe.name}
              </div>
            ))
          ) : (
            <p>No recipes found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
