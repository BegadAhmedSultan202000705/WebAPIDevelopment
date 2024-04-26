import React, { useEffect, useState } from "react";
import { styled, Styled } from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCusine = async (name) => {
    const data = await fetch(
      `https:api.spoonacular.com/recipes/complexSearch?apiKey=287473f17d564591a5cdb3ab57c3e4ac&cuisine=${name}`
    );
    const recipes = await data.json();
    setCuisine(recipes.results);
  };
  useEffect(() => {
    getCusine(params.type);
  }, [params.type]);
  return (
    <Grid
      animate={{ opacity: 1 }}
      intial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisine.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={"/recipe/" + item.id}>
              <img src={item.image} alt="" />
              <h4> {item.title}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 2rem; /* Consistent gap */
  padding: 1rem; /* Consistent padding */

  @media (max-width: 768px) {
    gap: 1rem; /* Adjust gap for smaller screens */
  }
`;

const Card = styled.div`
  position: relative;
  
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover{
    transform: translateY(-0.5rem);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
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
    padding: 0.5rem
    color: white;
    text-align: center;
    font-weight: 700;
    font-size: 1.1rem;
    z-index: 2;
    background-color: rgba(0,0,0,0.6);
    border-radius: 0 0 1.5rem 1.5rem;

    
  }
  a{
    text-decoration: none;
    color: inherit;
    display: block;

    &:hover {
      color: #0072ff;
    }

  }
`;

export default Cuisine;
