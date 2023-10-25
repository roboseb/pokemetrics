const pokeArt = document.getElementById('poke-art');


// Fetch pokemon API data.
async function fetchPokemon(name) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    let data = await response.json()

    console.log(`Height: ${data.height} Weight: ${data.weight}`);

    //console.log(data.sprites.other['official-artwork']['front_default']);
    pokeArt.src = data.sprites.other['official-artwork']['front_default'];
    
    return data;
}

fetchPokemon('squirtle');

// Add event listener for input particular pokemon names.
const pokeNameInput = document.getElementById('poke-name-input');
// pokeNameInput.addEventListener('input', () => {
//     const input = pokeNameInput.value;
//     fetchPokemon(`${input}`);
// });

// Consider entered weight and chosen pokemon and convert to pokemetric.
const convert = () => {
    const height = document.getElementById('height-input').value;
    const input = pokeNameInput.value;
    fetchPokemon(`${input}`);
    console.log(data);
}

const convertBtn = document.getElementById('convert-btn');
convertBtn.addEventListener('click', convert);
