const initPage = function () {
  location.hash = "pokemones";
};

const getPokemonsData = async function () {
    const url = "https://api.pokemontcg.io/v1/cards/";
  const res = await fetch(url);
  const data = await res.json();

  return data.cards;
};

const showPokemonsHtml = function (aryData) {
  let pokemonDiv = "";

  aryData.forEach((element) => {
    pokemonDiv += `
        <div class="pokemon-div">
        <div class="pokemon-title">
            <span><strong>${element.name.toUpperCase()}</strong></span>
            <div class="pokemon-number"> <span >${element.number}</span> </div>
        </div>
        <div class="pokemon-body">
            <img src="${element.imageUrl}" alt="">
        </div>
    </div>
    `;
  });
  return pokemonDiv;
};

const showPageNotFound = function () {
  let notFoundDiv = "";

  notFoundDiv = `
        <div class="not-found">
            <h2> Pokemon Not Found <strong>(404)</strong> </h2>
    </div>
    `;

  return notFoundDiv;
};

const searchPokemon = async function (name) {
  const data = await getPokemonsData();
  const nameLowerCase = name.toLowerCase();
  const formattedName =
    nameLowerCase.charAt(0).toUpperCase() + nameLowerCase.slice(1);
  const filterPokemon = data.filter((item) => item.name == formattedName);

  return filterPokemon;
};

const clearForm = function (form) {
  form.reset();
};

window.onload = async () => {
  initPage();
  const pokeResult = await getPokemonsData();
    document.querySelector(".grid").innerHTML = showPokemonsHtml(pokeResult);
  window.onhashchange = (e) => {
    router(location.hash);
  };
};

document.getElementById("buscarPokemon").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = document.querySelector("form input").value;
  if (data.length > 1) {
    const pokeResult = await searchPokemon(data);
    if (pokeResult.length != 0) {
      document.querySelector(".grid").innerHTML = showPokemonsHtml(pokeResult);
    }else{
        document.querySelector(".grid").innerHTML = showPageNotFound()
    }
  }
});

document.getElementById("txtPokemon").addEventListener("keyup", async () => {
  const data = document.getElementById("txtPokemon").value;
  const icon = document.querySelector(".clear-icon");
  if (data == "") {
    const pokeResult = await getPokemonsData();
    document.querySelector(".grid").innerHTML = showPokemonsHtml(pokeResult);
    icon.setAttribute("hidden", true);
  }
  if (data.length > 1) {
    icon.removeAttribute("hidden");
  }
});

document.getElementById("clearPokeForm").onclick = async function () {
  clearForm(document.getElementById("buscarPokemon"));
  const icon = document.querySelector(".clear-icon");
  const pokeResult = await getPokemonsData();
  document.querySelector(".grid").innerHTML = showPokemonsHtml(pokeResult);
  icon.setAttribute("hidden", true);
  document.getElementById("txtPokemon").focus();
};
