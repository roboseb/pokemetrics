

// Fetch pokemon API data.
async function fetchPokemon(name) {

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })
        .then((data) => {
            console.log(`Height: ${data.height*10}cm Weight: ${data.weight/10}kg`);
            const pokeArt = document.getElementById('poke-art');
            pokeArt.src = data.sprites.other['official-artwork']['front_default'];
        })
        .catch((error) => {
            console.log(error)
            console.log('pokemon not found, selecting at random');
            fetchRandomPokemon();
        });
}

// Fetch a random pokemon
async function fetchRandomPokemon() {

    // Placeholder random pokemon number selection
    const selection = Math.floor(Math.random() * 500);

    fetch(`https://pokeapi.co/api/v2/pokemon/${selection}/`).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })
        .then((data) => {
            console.log(`Height: ${data.height*10}cm Weight: ${data.weight/10}kg`);
            const pokeArt = document.getElementById('poke-art');
            pokeArt.src = data.sprites.other['official-artwork']['front_default'];
        })
        .catch((error) => {
            console.log(error)
        });
}

// Setup default pokemon info to display.
fetchPokemon('squirtle');

// Consider entered weight and chosen pokemon and convert to pokemetric.
async function convert() {
    const pokeNameInput = document.getElementById('poke-name-input');
    const userHeight = document.getElementById('height-input').value;
    const input = pokeNameInput.value;

    // Fetch selected pokemon data, then convert user's info to pokemetric.
    fetchPokemon(`${input}`).then((data) => {

        console.log(data);
        const factor = (userHeight / (data.height * 10)).toFixed(1);
        console.log(factor);

        displayResult(`You are as tall as ${factor} ${input}s.`);
    });
}

// Display unit conversion info.
const displayResult = (message) => {
    const resultBox = document.getElementById('result-info');
    resultBox.innerText = message;
}

// Add event listener to make convert button convert units to pokemetric.
const convertBtn = document.getElementById('convert-btn');
convertBtn.addEventListener('click', convert);
