import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRecipes } from "../storing/recipes";
import { setToast } from "../storing/noti_bar";

import { destroyAccessToken } from "../api";
import { getRecipes } from "../api";

import Recipe from "../componenets/Recipe";
import Button from "../componenets/Button";
import { Loader } from "../util/Loader";
import {
  selectAccessToken,
  selectPreferences,
  selectRecipes,
  selectUserData,
} from "../help/select";

const NUMBER_OF_RESULTS_PER_PAGE = 10;

const styles = {
  navbar: {
    padding: "10px 20px",
    backgroundColor: "#f8f8f8",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
  },
  navHeading: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  userDetail: {
    display: "flex",
    alignItems: "center",
  },
  userName: {
    marginRight: "10px",
  },

  itemsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "10px",
    padding: "20px",
  },
  itemBox: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#fff",
  },

  paginatorContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px",
  },
  paginatorButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "0 10px",
  },
  disabledButton: {
    backgroundColor: "#6c757d",
    cursor: "not-allowed",
  },

  pageTag: {
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    fontWeight: "bold",
    margin: "0 10px",
  },
};

const Recipes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isItemsLoading, setIsItemsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector(selectUserData);
  const accessToken = useSelector(selectAccessToken);
  const preferences = useSelector(selectPreferences);
  const { recipes: { results = [] } = {} } = useSelector(selectRecipes);

  const handleLogout = async () => {
    await destroyAccessToken({ accessToken });
    localStorage.clear();
    navigate("/");
  };

  const fetchRecipes = async ({ pageNumber }) => {
    setIsItemsLoading(true);
    try {
      const response = await getRecipes({
        accessToken,
        preferences: {
          ...preferences,
          offset: pageNumber,
          number: NUMBER_OF_RESULTS_PER_PAGE,
        },
      });

      const recipes = await response.json();
      setCurrentPage(pageNumber);
      dispatch(setRecipes({ recipes }));
      localStorage.setItem("recipes", JSON.stringify(recipes));
    } catch (error) {
      dispatch(
        setToast({ status: "failure", displayMessage: JSON.stringify(error) })
      );
    }
    setIsItemsLoading(false);
  };

  return (
    <>
      {/* Navbar */}
      <div style={styles.navbar}>
        <div className="nav">
          <h3 style={styles.navHeading}>
            Based on your preferences, we have...
          </h3>
          <div style={styles.userDetail}>
            <div style={styles.userName} className="icon-user">
              {userData.name}
            </div>
            <Button className="logout" text="Logout" onClick={handleLogout} />
          </div>
        </div>
      </div>

      {/* Recipes list */}
      <div style={styles.itemsContainer}>
        {isItemsLoading ? (
          <Loader />
        ) : (
          results.map(({ id, image, title, imageType }) => (
            <Recipe
              key={id}
              imageType={imageType}
              id={id}
              imageUrl={image}
              title={title}
              className="item-box"
              style={styles.itemBox}
            />
          ))
        )}
      </div>

      {/* Paginator */}
      <div style={styles.paginatorContainer}>
        <Button
          className="paginator"
          text="Go Back"
          onClick={() => fetchRecipes({ pageNumber: currentPage - 1 })}
          disabled={currentPage <= 1}
          style={{
            ...styles.paginatorButton,
            ...(currentPage <= 1 ? styles.disabledButton : {}),
          }}
        />
        <span style={styles.pageTag}>{"Page " + currentPage}</span>
        <Button
          className="paginator"
          text="Show More"
          onClick={() => fetchRecipes({ pageNumber: currentPage + 1 })}
          disabled={currentPage >= 3}
          style={{
            ...styles.paginatorButton,
            ...(currentPage >= 3 ? styles.disabledButton : {}),
          }}
        />
      </div>
    </>
  );
};

export default Recipes;
