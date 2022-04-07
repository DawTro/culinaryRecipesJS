document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".searchInput");
  const list = document.querySelector(".recipes");

  let mealName = "chicken";

  let searchMeal = (e) => {
    mealName = e.target.value;
    console.log(mealName);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let recipes = data.meals;
        console.log(recipes);

        recipes.map((recipe) => {
          const newRecipe = document.createElement("div");
          newRecipe.setAttribute("id", `${recipe.idMeal}`);
          newRecipe.classList.add("recipe");
          newRecipe.innerHTML = `
          <div class="content">
            <div class="image">
              <img
                src=${recipe.strMealThumb}
                alt="zdjęcie obiadu"
                />
                </div>
            <div class="recipe-title">
              <h3><a>${recipe.strMeal}</a></h3>
            </div>
            </div>
          `;
          list.appendChild(newRecipe);

          // `<div class="recipe">
          //   </div>`;
        });
      })
      .catch(
        (error = (e) => {
          console.log(e);
        })
      );
  };

  input.addEventListener("keyup", searchMeal);
});
