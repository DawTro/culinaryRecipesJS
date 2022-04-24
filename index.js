document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".searchInput");
  const list = document.querySelector(".recipes");
  const info = document.querySelector(".info");
  const recipeContent = document.querySelector(".recipe-content");
  const detail = document.querySelector(".container-recipe-content");

  let recipesList = [];

  let contentTxt = document.createElement("div");
  contentTxt.classList.add("recipe-detail");

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
      let forTitle = document.createElement("div");
      forTitle.classList.add("title");
      let h3 = document.createElement("h3");
      h3.innerHTML = `${recipe.strMeal}`;
      let favIcon = document.createElement("i");
      favIcon.classList.add("bi", "bi-heart", "fav-btn");

      newRecipe.appendChild(image);
      image.appendChild(img);
      newRecipe.appendChild(title);
      forTitle.appendChild(h3);
      title.append(forTitle, favIcon);
      list.appendChild(newRecipe);
      newRecipe.addEventListener("click", (e) => showDetail(recipe.idMeal));
    });
  };

  let showDetail = (id) => {
    console.log("show recipe id: ", id);
    let recipeDetail = recipesList[0].find((recipe) => recipe.idMeal === id);
    console.log(recipeDetail);

    list.style.display = "none";
    recipeContent.style.display = "flex";

    showTitle(recipeDetail.strMeal);
    showPhoto(recipeDetail.strMealThumb);
    showContent(recipeDetail);
    addBtn();
  };

  let showPhoto = (photo) => {
    let picture = document.createElement("div");
    picture.classList.add("recipe-img");
    picture.style.backgroundImage = `url(${photo})`;

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

  let showContent = (recipeDetail) => {
    contentTxt.innerHTML = "";
    detail.appendChild(contentTxt);

    showIngredients(recipeDetail);
    showInstructions(recipeDetail.strInstructions);
  };

  let showIngredients = (detail) => {
    let ingredients = Object.keys(detail).filter((el) =>
      el.includes("Ingredient")
    );
    let filterIngredients = Object.keys(detail)
      .filter((key) => ingredients.includes(key))
      .reduce((obj, key) => {
        obj[key] = detail[key];
        return obj;
      }, {});
    let nameOfIngredient = Object.values(filterIngredients).filter(
      (n) => n !== ""
    );

    let measures = Object.keys(detail).filter((el) => el.includes("Measure"));

    let filterMeasure = Object.keys(detail)
      .filter((key) => measures.includes(key))
      .reduce((obj, key) => {
        obj[key] = detail[key];
        return obj;
      }, {});
    let quantity = Object.values(filterMeasure).filter(
      (q) => q !== "" && q !== " " && q !== null
    );

    let quantityOfIngredients = quantity.map((value, i) => {
      return value + " " + nameOfIngredient[i];
    });
    console.log(quantityOfIngredients);

    addIngredients(quantityOfIngredients);
  };

  let addIngredients = (ingr) => {
    let ingredientsDiv = document.createElement("div");
    ingredientsDiv.classList.add("recipe-ingredient");
    let ingredientTitle = document.createElement("h3");
    ingredientTitle.classList.add("ingredient-title");
    ingredientTitle.innerHTML = "Ingredients:";
    let ingredientsList = document.createElement("ul");
    ingredientsList.classList.add("ingredient-list");

    ingr.map((ing) => {
      let ingredient = document.createElement("li");

      ingredient.innerHTML = ing;
      ingredientsList.appendChild(ingredient);
    });

    ingredientsDiv.appendChild(ingredientTitle);
    ingredientsDiv.appendChild(ingredientsList);
    contentTxt.appendChild(ingredientsDiv);
  };

  let showInstructions = (instruction) => {
    let content = document.createElement("div");
    content.classList.add("recipe-instruction");
    let instructionTitle = document.createElement("h3");
    instructionTitle.classList.add("instruction-title");
    instructionTitle.innerHTML = "Preparation:";
    let recipeTxt = document.createElement("p");
    recipeTxt.classList.add("instruction-detail");
    recipeTxt.innerHTML = instruction;

    content.appendChild(instructionTitle);
    content.appendChild(recipeTxt);
    contentTxt.appendChild(content);
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
    list.style.display = "flex";
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
