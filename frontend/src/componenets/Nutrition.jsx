import React from "react";

const styles = {
  nutritionData: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
};

const Nutrition = ({ nutrient }) => {
  const {
    name = "",
    unit = "",
    amount = "",
    percentOfDailyNeeds = "",
  } = nutrient;

  return (
    <tr>
      <td style={styles.nutritionData}>{name}</td>
      <td style={styles.nutritionData}>{unit}</td>
      <td style={styles.nutritionData}>{amount}</td>
      <td style={styles.nutritionData}>{percentOfDailyNeeds}</td>
    </tr>
  );
};

export default Nutrition;
