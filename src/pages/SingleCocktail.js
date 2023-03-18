import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);

  const fetchCocktail = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${url}${id}`);
      const data = await res.json();
      if (data.drinks) {
        const {
          strDrink: name,
          strAlcoholic: info,
          strDrinkThumb: image,
          strGlass: glass,
          strCategory: category,
          strInstructions: instructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        } = data.drinks[0];
        const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        ];
        const newCocktail = {
          name,
          info,
          image,
          glass,
          category,
          instructions,
          ingredients,
        };
        setCocktail(newCocktail);
      } else {
        setCocktail(null);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCocktail();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (!cocktail) {
    return <h2 className="section-title"> no Cocktail to display</h2>;
  }
  const { name, info, image, glass, instructions, ingredients, category } =
    cocktail;
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        bach home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">Glass :</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">Instructions :</span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">Ingredients :</span>
            {ingredients.map((item, index) => {
              return item ? <span key={index}>{item}</span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
