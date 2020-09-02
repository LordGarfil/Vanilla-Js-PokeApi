const router = function(route){
    switch(route){
        case '#pokemones':
           return setPokemons() 
        default:
            return console.log("Page Not Found")
    } 
}
