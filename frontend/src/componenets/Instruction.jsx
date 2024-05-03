import React from "react";

const styles = {
  instruction: {
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  heading: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  list: {
    paddingLeft: "20px",
    marginBottom: "10px",
  },
  listItem: {
    marginBottom: "5px",
    color: "#3498db",
  },
  stepContent: {
    fontSize: "14px",
    lineHeight: "1.5",
    marginTop: "10px",
  },
};

const Instruction = ({ ingredients = [], equipment = [], step = "" }) => {
  return (
    <div style={styles.instruction}>
      {/* Display ingredients if available */}
      {ingredients.length > 0 && (
        <>
          <h3 style={styles.heading}>Ingredients</h3>
          <ul style={styles.list}>
            {ingredients.map(({ name }, index) => (
              <li key={index} style={styles.listItem}>
                {name}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Display equipment if available */}
      {equipment.length > 0 && (
        <>
          <h3 style={styles.heading}>Equipment</h3>
          <ul style={styles.list}>
            {equipment.map(({ name }, index) => (
              <li key={index} style={styles.listItem}>
                {name}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Display step details */}
      <h3 style={styles.heading}>Step</h3>
      <p style={styles.stepContent}>{step}</p>
    </div>
  );
};

export default Instruction;
