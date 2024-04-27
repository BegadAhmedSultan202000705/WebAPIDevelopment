import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "styled-components";
import config from "../config";

function Category() {
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch cuisines from the backend server
    const fetchCuisines = async () => {
      try {
        // Make API request to the backend to fetch cuisines
        const response = await axios.get(
          `${config.apiBaseUrl}/api/recipes/cuisines`
        );

        // Update the cuisines state with the response data
        setCuisines(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cuisines:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchCuisines();
  }, []);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Render the list of cuisines
  return (
    <List>
      {cuisines.map((cuisine) => (
        <SLink key={cuisine.id} to={`/cuisine/${cuisine.name}`}>
          {/* Use appropriate icons based on cuisine type */}
          {cuisine.icon === "pizza" && <FaPizzaSlice />}
          {cuisine.icon === "hamburger" && <FaHamburger />}
          {cuisine.icon === "noodles" && <GiNoodles />}
          {cuisine.icon === "chopsticks" && <GiChopsticks />}
          <h4>{cuisine.name}</h4>
        </SLink>
      ))}
    </List>
  );
}

const List = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #f7f7f7;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 80%;
`;

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin: 0;
  padding: 0.5rem;
  text-decoration: none;
  background: #ffffff;
  width: 7rem;
  height: 7rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  h4 {
    color: #313131;
    font-size: 0.9rem;
    margin-top: 0.3rem;
  }

  svg {
    color: #313131;
    font-size: 2rem;
  }
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &.active {
    background: linear-gradient(to right, #ff7e5f, #feb47b);
    svg {
      color: white;
    }
    h4 {
      color: white;
    }
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

export default Category;
