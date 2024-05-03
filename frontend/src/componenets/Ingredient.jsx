import React from "react";

const styles = {
  ingredientData: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
};

const Ingredient = ({ ingredient }) => {
  const name = ingredient.name || "";
  const amount = ingredient.amount || {};
  const metric = amount.metric || {};
  const unit = metric.unit || "";
  const value = metric.value || "";

  return (
    <tr>
      <td style={styles.ingredientData}>{name}</td>
      <td style={styles.ingredientData}>{unit}</td>
      <td style={styles.ingredientData}>{value}</td>
    </tr>
  );
};

export default Ingredient;
