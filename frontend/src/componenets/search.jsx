import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPreferences, setRecipes } from "../storing/recipes";
import { setToast } from "../storing/noti_bar";
import Button from "../componenets/Button";
import { getRecipes } from "../api";
import { selectAccessToken } from "../help/select";
import { PREFERENCES } from "../help/const";
import { isEqualStrings } from "../help/validate";

const Search = () => {
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPreference, setCurrentPreference] = useState({
    diet: [],
    intolerances: [],
    cuisine: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const styles = {
    preferenceContainer: {
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      marginBottom: "20px",
    },
    preferenceHeading: {
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    preferenceTagsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    },
    preferenceTag: {
      padding: "8px 12px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    selectedTag: {
      backgroundColor: "#007bff",
      color: "white",
    },
    getRecipesBtn: {
      marginTop: "20px",
    },
  };

  const handleClick = ({ preferenceName, value }) => {
    const preference = currentPreference[preferenceName];
    const isIncluded = preference.includes(value);

    const updatedPreferences = isIncluded
      ? preference.filter((option) => !isEqualStrings([option, value]))
      : [...preference, value];

    setCurrentPreference({
      ...currentPreference,
      [preferenceName]: updatedPreferences,
    });

    dispatch(
      setPreferences({
        preferences: {
          ...currentPreference,
          [preferenceName]: updatedPreferences,
        },
      })
    );
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await getRecipes({
        accessToken,
        preferences: currentPreference,
      });

      const recipes = await response.json();
      dispatch(setRecipes({ recipes }));
      localStorage.setItem("recipes", JSON.stringify(recipes));
      navigate("/recipes");
    } catch (error) {
      dispatch(
        setToast({ status: "failure", displayMessage: JSON.stringify(error) })
      );
    }
    setIsLoading(false);
  };

  return (
    <>
      {/* Preference container */}
      <div style={styles.preferenceContainer}>
        <h3>What's your pick?</h3>
        {PREFERENCES.map(({ name: preferenceName, options }) => (
          <div key={preferenceName}>
            <h2 style={styles.preferenceHeading}>{preferenceName}</h2>
            <div style={styles.preferenceTagsContainer}>
              {options.map(({ name: optionName, value }) => {
                const isOptionIncluded =
                  currentPreference[preferenceName].includes(value);
                return (
                  <button
                    key={value}
                    style={{
                      ...styles.preferenceTag,
                      ...(isOptionIncluded && styles.selectedTag),
                    }}
                    onClick={() => handleClick({ preferenceName, value })}
                  >
                    {optionName}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Get Recipes button */}
      <Button
        text={"Get Recipes"}
        onClick={handleSearch}
        isLoading={isLoading}
        className="get-recipes-btn"
        style={styles.getRecipesBtn}
      />
    </>
  );
};

export default Search;
