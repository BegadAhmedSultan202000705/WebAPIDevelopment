import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import config from "../config";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { type } = useParams();

  useEffect(() => {
    // Fetch recipes of the given cuisine from the backend server
    const fetchCuisine = async () => {
      try {
        // Make an API request to the backend server
        const response = await axios.get(
          `${config.apiBaseUrl}/api/recipes/cuisine/${type}`
        );

        // Update the state with the data received
        setCuisine(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cuisine recipes:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchCuisine();
  }, [type]);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisine.map((item) => (
        <Card key={item.id}>
          <Link to={`/recipe/${item.id}`}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
          </Link>
        </Card>
      ))}
    </Grid>
  );
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 2rem;
  padding: 1rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const Card = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 100%;
    object-fit: cover;
    border-radius: 12px;
  }

  p {
    position: absolute;
    bottom: 0%;
    width: 100%;
    padding: 0.5rem;
    color: white;
    text-align: center;
    font-weight: 700;
    font-size: 1.1rem;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 0 0 1.5rem 1.5rem;
  }

  a {
    text-decoration: none;
    color: inherit;
    display: block;

    &:hover {
      color: #0072ff;
    }
  }
`;

export default Cuisine;
