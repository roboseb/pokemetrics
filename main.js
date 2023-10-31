import pokeData from './pokeData.json';
console.log(pokeData);

// Fetch pokemon API data and then convert/display units.
// If randomized is passed as true, select a random pokemon ID to convert.
async function convertToPokemon(randomized, pokemon) {

    const pokeNameInput = document.getElementById('poke-name-input');
    let selection;
    randomized ? selection = Math.floor(Math.random() * 500) : selection = pokeNameInput.value;
    if (pokemon) selection = pokemon;

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
    let userHeight = document.getElementById('height-input').value;
    let userWeight = document.getElementById('weight-input').value;

    // Convert entered units to metric if mode is imperial.
    if (units === 'imperial') {
        userHeight = userHeight * 2.54;
        userWeight = userWeight * 0.453592;
    }

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
convertBtn.addEventListener('click', () => { convertToPokemon(false) });

// Add event listener to button for finding closest pokemon.
const closestBtn = document.getElementById('closest-btn');
closestBtn.addEventListener('click', () => {

    // Convert cm and kg to dumb pokemon units.
    let userHeight = document.getElementById('height-input').value / 10;
    let userWeight = document.getElementById('weight-input').value * 10;

    // Convert entered units to metric if mode is imperial.
    if (units === 'imperial') {
        userHeight = userHeight * 2.54;
        userWeight = userWeight * 0.453592;
    }

    if (!!userHeight && !!userWeight) {
        console.log('you got both!')
        findClosest(userHeight, userWeight);
    } else {
        console.log("you're missing something!")
    }
});

// Go through the list of all pokemon to find the closest match to entered weight/height.
const findClosest = (height, weight) => {
    let closest = Object.entries(pokeData).reduce(function (prev, curr) {

        // Height has been multiplied while 
        const heightDiff = Math.abs(curr[1]['height'] - height) * 10;
        const weightDiff = Math.abs(curr[1]['weight'] - weight);
        const prevHeightDiff = Math.abs(prev[1]['height'] - height) * 10;
        const prevWeightDiff = Math.abs(prev[1]['weight'] - weight);

        return (heightDiff + weightDiff) < (prevHeightDiff + prevWeightDiff) ? curr : prev;
    });
    console.log(closest[0])

    convertToPokemon(false, closest[0])
}

// Toggle between imperial and metric units.
const switchUnits = () => {
    const heightUnit = document.getElementById('height-unit');
    const weightUnit = document.getElementById('weight-unit');

    if (units === 'metric') {
        heightUnit.innerText = 'in';
        weightUnit.innerText = 'lbs';
        units = 'imperial';
    } else {
        heightUnit.innerText = 'cm';
        weightUnit.innerText = 'kg';
        units = 'metric';
    }
}

const unitBtn = document.getElementById('unit-btn');
let units = 'metric';
unitBtn.addEventListener('click', switchUnits);