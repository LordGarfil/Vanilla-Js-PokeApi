const getPokemonsData = async function(url){
    const res = await fetch(url)
    const data = await res.json()
    return data.cards   
}

const setPokemons = async function(){
    const url = "https://api.pokemontcg.io/v1/cards"
    const data = await getPokemonsData(url)
    let pokemonDiv = ""

    data.forEach(element => {
        pokemonDiv+=`
        <div class="pokemon-div">
        <div class="pokemon-title">
            <span><strong>${element.name.toUpperCase()}</strong></span>
            <div class="pokemon-number"> <span >${element.number}</span> </div>
        </div>
        <div class="pokemon-body">
            <img src="${element.imageUrl}" alt="">
        </div>
    </div>
    `
    })
    document.querySelector(".grid").innerHTML = pokemonDiv;
}

setPokemons()
