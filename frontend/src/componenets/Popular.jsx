import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";
import config from "../config";

function Popular() {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch popular recipes from the backend server
    const fetchPopular = async () => {
      try {
        // Make an API request to the backend server
        const response = await axios.get(
          `${config.apiBaseUrl}/api/recipes/popular`
        );

        // Update the state with the data received
        setPopular(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching popular recipes:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchPopular();
  }, []);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>

        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {popular.map((recipe) => (
            <SplideSlide key={recipe.id}>
              <Card>
                <Link to={`/recipe/${recipe.id}`}>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient />
                </Link>
              </Card>
            </SplideSlide>
          ))}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1.5rem;
  padding: 0 2rem;
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

const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
`;

export default Popular;
