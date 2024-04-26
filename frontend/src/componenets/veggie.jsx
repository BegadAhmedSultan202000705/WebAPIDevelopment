import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function Veggies() {
  const [veggies, setVeggies] = useState([]);
  useEffect(() => {
    getVeggies();
  }, []);

  const getVeggies = async () => {
    const check = localStorage.getItem("veggies");

    if (check) {
      setVeggies(JSON.parse(check));
    } else {
      const api = await fetch(
        `https:api.spoonacular.com/recipes/random?apiKey=287473f17d564591a5cdb3ab57c3e4ac&number=9&tags=vegetarian`
      );
      const data = await api.json();
      localStorage.setItem("veggies", JSON.stringify(data.recipes));
      setVeggies(data.recipes);
      console.log(data.recipes);
    }
  };
  return (
    <div>
      <Wrapper>
        <h3>Bego Picks Vegetarian Meals</h3>

        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {veggies.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"/recipe" + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 2rem;
  margin: 4rem 2rem;
  padding: 0 1rem;
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

const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  z-index: 1;
`;

export default Veggies;
