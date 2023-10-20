const display = document.getElementById('display');
const pokeart = document.createElement('img');
display.appendChild(pokeart);


// Fetch pokemon API data.
async function fetchPokemon(name) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    let data = await response.json()

    console.log(data.sprites.other['official-artwork']['front_default']);
    pokeart.src = data.sprites.other['official-artwork']['front_default'];
    
    return data;
}

fetchPokemon('pidgey');

