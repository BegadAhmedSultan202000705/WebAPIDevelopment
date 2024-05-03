import React from "react";
import { useNavigate } from "react-router-dom";
import RecipeButton from "../componenets/RecipeButton";

const Recipe = ({ id: recipeId, imageUrl, title, imageType, className }) => {
  const navigate = useNavigate();

  const cardClasses = `card ${className}`;

  const styles = {
    card: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      overflow: "hidden",
      margin: "10px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      transition: "box-shadow 0.3s ease-in-out",
    },
    cardItemDetail: {
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    cardImage: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
    },
    cardTitle: {
      fontSize: "16px",
      fontWeight: "bold",
      margin: "10px 0",
      textAlign: "center",
      color: "#333",
    },
    cardTagBlue: {
      color: "#007bff",
    },
  };

  const handleClick = () => {
    navigate(`/recipes/${recipeId}`);
  };

  return (
    <div style={styles.card} className={cardClasses} onClick={handleClick}>
      {/* Card item details */}
      <div style={styles.cardItemDetail} onClick={handleClick}>
        <img src={imageUrl} alt={title} style={styles.cardImage} />
        <h3 style={{ ...styles.cardTitle, ...styles.cardTagBlue }}>{title}</h3>
      </div>

      {/* Recipe button */}
      <RecipeButton
        recipeId={recipeId}
        imageUrl={imageUrl}
        title={title}
        imageType={imageType}
      />
    </div>
  );
};

export default Recipe;
