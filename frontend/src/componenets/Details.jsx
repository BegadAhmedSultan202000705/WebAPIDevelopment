import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToast } from "../storing/noti_bar";
import { getIngredients, getInstructions, getNutritionalInfo } from "../api";
import { selectAccessToken, selectUserData } from "../help/select";
import Instruction from "../componenets/Instruction";
import Nutrition from "../componenets/Nutrition";
import Ingredient from "../componenets/Ingredient";
import { Loader } from "../util/Loader";
import RecipeButton from "../componenets/RecipeButton";
import Button from "../componenets/Button";
import { destroyAccessToken } from "../api";

const LOCAL_STORAGE_KEYS = {
  instructions: (recipeId) => `${recipeId}-instructions`,
  nutritionalInfo: (recipeId) => `${recipeId}-nutritionalInfo`,
  ingredients: (recipeId) => `${recipeId}-ingredients`,
};

const styles = {
  navbar: {
    padding: "10px 20px",
    backgroundColor: "#f8f8f8",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
  },
  productDetail: {
    display: "flex",
    padding: "20px",
  },
  itemDetail: {
    marginRight: "20px",
  },
  productImage: {
    maxWidth: "300px",
    marginRight: "20px",
  },
  productBox: {
    display: "flex",
    flexDirection: "column",
  },
  productTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  container: {
    margin: "20px 0",
    padding: "10px 20px",
  },
  instructionHeading: {
    marginBottom: "10px",
  },
  ingredientBox: {
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeading: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
    fontWeight: "bold",
  },
  tableCell: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
};

const RecipeDetails = ({
  id = "",
  imageUrl = "",
  title = "",
  imageType = "",
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(selectAccessToken);
  const userData = useSelector(selectUserData);

  const [instructions, setInstructions] = useState([]);
  const [nutritionalInfo, setNutritionalInfo] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState({
    instructions: false,
    nutritionalInfo: false,
    ingredients: false,
  });

  const handleLogout = async () => {
    await destroyAccessToken({ accessToken });
    localStorage.clear();
    navigate("/");
  };

  const fetchInstructions = useCallback(async () => {
    const storedSteps = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.instructions(id))
    );
    if (storedSteps) {
      setInstructions(storedSteps);
    } else {
      setIsLoading((prevState) => ({ ...prevState, instructions: true }));
      try {
        const response = await getInstructions({ accessToken, recipeId: id });
        const { instructions } = await response.json();
        const { steps } = instructions[0];
        setInstructions(steps);
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.instructions(id),
          JSON.stringify(steps)
        );
      } catch (error) {
        dispatch(
          setToast({ status: "failure", displayMessage: JSON.stringify(error) })
        );
      }
      setIsLoading((prevState) => ({ ...prevState, instructions: false }));
    }
  }, [id, accessToken, dispatch]);

  const fetchNutritionalInfo = useCallback(async () => {
    const storedNutrients = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.nutritionalInfo(id))
    );
    if (storedNutrients) {
      setNutritionalInfo(storedNutrients);
    } else {
      setIsLoading((prevState) => ({ ...prevState, nutritionalInfo: true }));
      try {
        const response = await getNutritionalInfo({
          accessToken,
          recipeId: id,
        });
        const {
          nutritionalInfo: { nutrients },
        } = await response.json();
        setNutritionalInfo(nutrients);
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.nutritionalInfo(id),
          JSON.stringify(nutrients)
        );
      } catch (error) {
        dispatch(
          setToast({ status: "failure", displayMessage: JSON.stringify(error) })
        );
      }
      setIsLoading((prevState) => ({ ...prevState, nutritionalInfo: false }));
    }
  }, [id, accessToken, dispatch]);

  const fetchIngredients = useCallback(async () => {
    const storedIngredients = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.ingredients(id))
    );
    if (storedIngredients) {
      setIngredients(storedIngredients);
    } else {
      setIsLoading((prevState) => ({ ...prevState, ingredients: true }));
      try {
        const response = await getIngredients({ accessToken, recipeId: id });
        const {
          ingredients: { ingredients },
        } = await response.json();
        setIngredients(ingredients);
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.ingredients(id),
          JSON.stringify(ingredients)
        );
      } catch (error) {
        dispatch(
          setToast({ status: "failure", displayMessage: JSON.stringify(error) })
        );
      }
      setIsLoading((prevState) => ({ ...prevState, ingredients: false }));
    }
  }, [id, accessToken, dispatch]);

  useEffect(() => {
    fetchInstructions();
    fetchNutritionalInfo();
    fetchIngredients();
  }, [fetchInstructions, fetchNutritionalInfo, fetchIngredients]);

  return (
    <>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h1 style={styles.appHeader}>Recipe Details</h1>
        <div style={styles.userDetails}>
          <div style={styles.userName}>{userData.name}</div>
          <Button className="logout" text="Logout" onClick={handleLogout} />
        </div>
      </div>

      {/* Product detail */}
      <div style={styles.productDetail}>
        <div style={styles.itemDetail}>
          <img style={styles.productImage} src={imageUrl} alt={title} />
        </div>
        <div style={styles.productBox}>
          <h1 style={styles.productTitle}>{title}</h1>
          <RecipeButton
            recipeId={id}
            imageUrl={imageUrl}
            title={title}
            imageType={imageType}
          />
        </div>
      </div>

      {/* Instructions */}
      <div style={styles.container}>
        <h2 style={styles.instructionHeading}>Instructions</h2>
        <div style={styles.ingredientBox}>
          {isLoading.instructions && <Loader />}
          {!isLoading.instructions &&
            instructions.map(
              ({ ingredients = [], equipment = [], step }, idx) => (
                <Instruction
                  key={idx}
                  ingredients={ingredients}
                  equipment={equipment}
                  step={step}
                />
              )
            )}
        </div>
      </div>

      {/* Nutrients */}
      <div style={styles.container}>
        <h2 className="nutrient-heading">Nutrients</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeading}>Name</th>
              <th style={styles.tableHeading}>Unit</th>
              <th style={styles.tableHeading}>Amount</th>
              <th style={styles.tableHeading}>Percent of Daily Needs</th>
            </tr>
          </thead>
          <tbody>
            {isLoading.nutritionalInfo && <Loader />}
            {!isLoading.nutritionalInfo &&
              nutritionalInfo.map((nutrient, idx) => (
                <Nutrition key={idx} nutrient={nutrient} />
              ))}
          </tbody>
        </table>
      </div>

      {/* Ingredients */}
      <div style={styles.container}>
        <h2 className="ingredient-heading">Ingredients</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeading}>Name</th>
              <th style={styles.tableHeading}>Units</th>
              <th style={styles.tableHeading}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {isLoading.ingredients && <Loader />}
            {!isLoading.ingredients &&
              ingredients.map((ingredient, idx) => (
                <Ingredient key={idx} ingredient={ingredient} />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RecipeDetails;
