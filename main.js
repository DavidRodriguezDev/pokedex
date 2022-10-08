
const cardsContainer = document.querySelector(".b-container");
const pokemonCount = 151;
const input = document.createElement("input");
input.setAttribute("placeholder", "Choose by name or type ...");
const button = document.createElement("button");
button.classList.add("search");
const header = document.querySelector(".b-header")
const arrow = document.querySelector(".b-arrow")

let pokemons= [];
button.textContent = "Search!";
button.addEventListener("click", () => {
    searchPokemonName(input.value)
    
});

header.appendChild(input);
header.appendChild(button);



const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i)
    }
}

//COGER POKEMONS DE LA API POR ID

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url)
    const data = await resp.json()
    createCard(data)
   
    console.log(data)

    pokemons = [...pokemons, data];
}

//CREAR LA CARTA POR CADA POKEMON.

const createCard = (pokemon) => {
    const pokemonCard = document.createElement("div");
    const divFront$$ = document.createElement("div");
    divFront$$.classList.add("b-frontFace");
    pokemonCard.classList.add("b-pokemon-card");
    
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1); //Poner solo la primera letra en mayúscula
    const id = pokemon.id.toString().padStart(3, "0")
    let type = pokemon.types.map(type => type.type.name).join("-")
    
    divFront$$.innerHTML = `   <div class="b-pokemon__imgContainer">
                                 <img class="b-pokemon__img" src="${pokemon.sprites.other.dream_world.front_default}" alt="">
                                </div>
                                <div class="b-pokemon__info">
                                <span class="b-pokemon__id b-text b-text--regular">#${id}</span>
                                <h3 class="b-pokemon__name b-text b-text--bold">${name}</h3>
                                    <small class="b-pokemon__type b-text b-text--light"><em>${type}</em></small>
                                </div>
    `
    pokemonCard.appendChild(divFront$$)

    //CREAR BACKFACE PARA CADA CARTA CON STATS.

    const divBack$$ = document.createElement("div");
    divBack$$.classList.add("b-backFace")

    for (const stat of pokemon.stats) {
        
        const h4Back$$ = document.createElement("h4");
        const smallBack$$ = document.createElement("small");

        h4Back$$.textContent = stat.stat.name[0].toUpperCase() + stat.stat.name.slice(1); //Poner solo la primera letra en mayúscula
        smallBack$$.textContent = stat.base_stat;

        h4Back$$.classList.add("b-text--bold");
        smallBack$$.classList.add("b-text--light");

        
        divBack$$.appendChild(h4Back$$);
        divBack$$.appendChild(smallBack$$);
        pokemonCard.appendChild(divBack$$);
        
        

    }
     //COLORES BACKGROUND DE LAS CARTAS SEGÚN TIPO ÚNICO
    
    if(type.includes("fire") ){       
        pokemonCard.classList.add("b-pokemon-card--bg-fuego")
    } else if (type.includes("steel")) {
        pokemonCard.classList.add("b-pokemon-card--bg-acero")
    }  else if (type.includes("water")) {
        pokemonCard.classList.add("b-pokemon-card--bg-agua")
    }
    else if (type.includes("bug")) {
        pokemonCard.classList.add("b-pokemon-card--bg-bicho")
    }
    else if (type.includes("grass")) {
        pokemonCard.classList.add("b-pokemon-card--bg-planta")
    }
    else if (type.includes("water")) {
        pokemonCard.classList.add("b-pokemon-card--bg-agua")
    }
    else if (type.includes("dragon")) {
        pokemonCard.classList.add("b-pokemon-card--bg-dragon")
    }
    else if (type.includes("electric")) {
        pokemonCard.classList.add("b-pokemon-card--bg-electrico")
    }
    else if (type.includes("ghost")) {
        pokemonCard.classList.add("b-pokemon-card--bg-fantasma")
    }
    else if (type.includes("ice")) {
        pokemonCard.classList.add("b-pokemon-card--bg-hielo")
    }
    else if (type.includes("fighting")) {
        pokemonCard.classList.add("b-pokemon-card--bg-lucha")
    }
    else if (type.includes("normal")) {
        pokemonCard.classList.add("b-pokemon-card--bg-normal")
    }
    else if (type.includes("fairy")) {
        pokemonCard.classList.add("b-pokemon-card--bg-hada")
    }
    else if (type.includes("psychic")) {
        pokemonCard.classList.add("b-pokemon-card--bg-psiquico")
    }
    else if (type.includes("poison")) {
        pokemonCard.classList.add("b-pokemon-card--bg-veneno")
    }
    else if (type.includes("flying")) {
        pokemonCard.classList.add("b-pokemon-card--bg-volador")
    }
    else if (type.includes("rock")) {
        pokemonCard.classList.add("b-pokemon-card--bg-roca")
    }
    else if (type.includes("ground")) {
        pokemonCard.classList.add("b-pokemon-card--bg-tierra")
    }

    //EVENTO CLICK PARA ROTAR LA CARD POKEMON

    pokemonCard.addEventListener("click", () => {

        pokemonCard.classList.toggle("is-flipped")
           
    })

    cardsContainer.appendChild(pokemonCard)
    
}

//BUSCADOR POKEMON POR NOMBRE Y TIPO



const searchPokemonName = (name) => {
    const filteredPokemonName = pokemons.filter((pokemon) =>
        
        pokemon.name.toLowerCase().includes(name) || pokemon.types.map(type => type.type.name).includes(name)
        
    ) 
    cardsContainer.innerHTML ="";
    for (const pokemon of filteredPokemonName) {
        createCard(pokemon)
    }
}


//BOTÓN FLECHA PARA SUBIR AL INICIO DE LA PÁGINA.


inicioPagina = ()=> {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
}

arrow.addEventListener("click", inicioPagina);



fetchPokemons()



