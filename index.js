document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".searchInput");
  const list = document.querySelector(".recipes");
  const info = document.querySelector(".info");
  const recipeContent = document.querySelector(".recipe-content");
  const detail = document.querySelector(".container-recipe-content");

  let recipesList = [];
  let ingredientsList = [];
  let measuresList = [];

  let mealList = (mealName) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
      .then((res) => res.json())
      .then((data) => {
        let recipes = data.meals;
        if (recipesList === []) {
          recipesList.push(recipes);
        } else {
          recipesList.shift();
          list.innerHTML = "";
          recipesList.push(recipes);
        }
        // console.log(recipesList);
        input.value = "";

        info.remove();
        showList();
      });
  };

  let showList = () => {
    recipesList[0].map((recipe) => {
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
    console.log("show recipe: ", id);
    console.log(recipesList[0]);
    let recipeDetail = recipesList[0].find((recipe) => recipe.idMeal === id);
    console.log(recipeDetail);

    recipeContent.style.display = "flex";

    showPhoto(recipeDetail.strMealThumb);
    showTitle(recipeDetail.strMeal);
    showInstructions(recipeDetail.strInstructions);
    addBtn();
  };

  let showPhoto = (photo) => {
    let picture = document.createElement("div");
    picture.classList.add("recipe-img");
    let image = document.createElement("img");
    image.src = photo;

    picture.appendChild(image);
    detail.appendChild(picture);
  };

  let showTitle = (recipeTitle) => {
    let name = document.createElement("div");
    name.classList.add("recipe-content-title");
    let h2 = document.createElement("h2");
    h2.innerHTML = recipeTitle;

    name.appendChild(h2);
    detail.appendChild(name);
  };

  let showInstructions = (instruction) => {
    let content = document.createElement("div");
    content.classList.add("recipe-instruction");
    let recipeTxt = document.createElement("p");
    recipeTxt.innerHTML = instruction;

    content.appendChild(recipeTxt);
    detail.appendChild(content);
  };

  let addBtn = () => {
    let btn = document.createElement("button");
    btn.classList.add("close");
    btn.innerHTML = "Close";

    detail.appendChild(btn);

    btn.addEventListener("click", closeDetail);
  };

  let closeDetail = () => {
    recipeContent.style.display = "none";
    detail.innerHTML = "";
  };

  input.addEventListener("keyup", (e) => {
    if (e.keyCode === 13 && input.value !== "") {
      mealName = e.target.value;
      console.log(mealName);
      mealList(mealName);
    }
  });
});
