import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import React from "react";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=287473f17d564591a5cdb3ab57c3e4ac`
    );
    const detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>

        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 3rem;
  display: flex;
  gap: 2rem;
  justify-content: center;

  .active {
    background: linear-gradient(to right, #f27121, #e94057);
    color: white;
    border-radius: 8px;
    padding: 0.5rem 1rem;
  }

  h2 {
    margin-bottom: 1.5rem;
    color: #333;
    font-size: 2rem;
    line-height: 2.5rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 1.8rem;
    color: #333;
  }

  ul {
    margin-top: 1rem;
    list-style: inside;
    padding-left: 1.5rem;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  color: #333;
  background-color: white;
  border: 1px solid #ccc;
  margin-right: 1rem;
  font-weight: 600;
  border-radius: 8px;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: #0072ff;
    color: white;
    border-color: #0072ff;
  }
`;
const Info = styled.div`
  margin-left: 2rem;
  flex: 1;
`;

export default Recipe;
