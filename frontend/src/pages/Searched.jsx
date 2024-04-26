import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams();

  const getSearched = async (name) => {
    const data = await fetch(
      `https:api.spoonacular.com/recipes/complexSearch?apiKey=287473f17d564591a5cdb3ab57c3e4ac&query=${name}`
    );
    const recipes = await data.json();
    setSearchedRecipes(recipes.results);
  };

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  return (
    <Grid>
      {searchedRecipes.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={"/recipe/" + item.id}>
              <img src={item.image} alt="" />
              <h4>{item.title}</h4>
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

export default Searched;
