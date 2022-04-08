document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".searchInput");
  const list = document.querySelector(".recipes");
  const info = document.querySelector(".info");

  let recipesList = [];

  let mealList = (mealName) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let recipes = data.meals;
        // console.log(recipes);
        recipesList.push(recipes);
        // console.log(recipesList[0]);
        input.value = "";
        info.remove();
        showList();
      });
  };
  let showList = () => {
    recipesList[0].forEach((recipe) => {
      let newRecipe = document.createElement("div");
      newRecipe.setAttribute("id", `${recipe.idMeal}`);
      newRecipe.classList.add("recipe");
      let image = document.createElement("div");
      image.classList.add("image");
      let img = document.createElement("img");
      img.src = `${recipe.strMealThumb}`;
      img.alt = "meal foto";
      let title = document.createElement("div");
      title.classList.add("recipe-title");
      let h3 = document.createElement("h3");
      h3.innerHTML = `${recipe.strMeal}`;

      newRecipe.appendChild(image);
      image.appendChild(img);
      newRecipe.appendChild(title);
      title.appendChild(h3);
      list.appendChild(newRecipe);
      newRecipe.addEventListener("click", (e) => showDetail(recipe.idMeal));
    });
  };

  let showDetail = (id) => {
    console.log("recipe: ", id);
  };

  input.addEventListener("keyup", (e) => {
    if (e.keyCode === 13 && input.value !== "") {
      mealName = e.target.value;
      recipesList = [];
      console.log(mealName);
      mealList(mealName);
    }
  });
});
