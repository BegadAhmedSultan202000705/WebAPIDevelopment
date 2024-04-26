import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");

    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https:api.spoonacular.com/recipes/random?apiKey=287473f17d564591a5cdb3ab57c3e4ac&number=9`
      );
      const data = await api.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
      console.log(data.recipes);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Bego Picks</h3>

        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"/recipe/" + recipe.id}>
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
  width: 100%;
  height: 100%;
  z-index: 1;

  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
`;

export default Popular;
