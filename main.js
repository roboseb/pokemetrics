// Fetch pokemon API data and then convert/display units.
// If randomized is passed as true, select a random pokemon ID to convert.
async function convertToPokemon(randomized) {
    
    const pokeNameInput = document.getElementById('poke-name-input');
    let selection;
    randomized ? selection = Math.floor(Math.random() * 500) : selection = pokeNameInput.value;

    fetch(`https://pokeapi.co/api/v2/pokemon/${selection}`).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })
        .then((data) => {
            console.log(`Height: ${data.height * 10}cm Weight: ${data.weight / 10}kg`);
            const pokeArt = document.getElementById('poke-art');
            pokeArt.src = data.sprites.other['official-artwork']['front_default'];

            // Compare user metrics to pokemon size and display info.
            convert(data);
        })
        .catch((error) => {
            console.log(error)
            console.log('pokemon not found, selecting at random');
            if (!randomized) convertToPokemon(true);
        });
}

// Setup default pokemon info to display.
convertToPokemon(false);

// Consider entered weight and chosen pokemon and convert to pokemetric.
const convert = (data) => {
    const userHeight = document.getElementById('height-input').value;
    const userWeight = document.getElementById('weight-input').value;
    
    // Check what info the user has entered and convert accordingly.
    if (userHeight !== '') {
        const heightFactor = (userHeight / (data.height * 10)).toFixed(1);
        displayResult(`You are as tall as ${heightFactor} ${data.name}s.`, 'height');
    }

    if (userWeight !== '') {
        const weightFactor = (userWeight / (data.weight / 10)).toFixed(1);
        displayResult(`You are as heavy as ${weightFactor} ${data.name}s.`, 'weight');
    } 
}

// Display unit conversion. 
const displayResult = (message, metric) => {
    const resultBox = document.getElementById(`${metric}-result`);
    resultBox.innerText = message;
    
}

// Add event listener to make convert button convert units to pokemetric.
const convertBtn = document.getElementById('convert-btn');
convertBtn.addEventListener('click', () => {convertToPokemon(false)});
