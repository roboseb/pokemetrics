import pokeData from './pokeData.json';
import trimCanvas from './trimCanvas';

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
    //console.log(data);
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
        displayResult(data, `You are as tall as ${heightFactor} ${data.name}s.`, 'height', heightFactor);
    }

    if (userWeight !== '') {
        const weightFactor = (userWeight / (data.weight / 10)).toFixed(1);
        displayResult(data, `You are as heavy as ${weightFactor} ${data.name}s.`, 'weight');
    }
}

// Display unit conversion. 
const displayResult = (data, message, metric, heightFactor) => {
    const resultBox = document.getElementById(`${metric}-result`);
    resultBox.innerText = message;

    const pokeArtBox = document.getElementById('poke-art-box');
    const pokeArt = document.querySelector('.art-wrapper');

    // Skip resetting details if displaying weight.
    if (!heightFactor) return;

    // Clear previously cloned nodes.
    const clonedNodes = Array.from(document.querySelectorAll('.cloned'));
    clonedNodes.forEach((node) => {
        node.remove();
    });

    // Inverse ratio, then resize the pokeart in case multiple will be shown.
    const denominator = 100 * heightFactor;
    const inverseRatio = 100 / denominator;

    let newHeightFactor = Math.floor(heightFactor);
    if (newHeightFactor < 1) newHeightFactor = 1;
    displayPokeInfo(data, newHeightFactor, heightFactor, inverseRatio);
}

// Primary function for diplaying fetched pokemon info.
const displayPokeInfo = (data, heightFactor, oldHeightFactor, inverseRatio) => {

    //console.log(`Height: ${data.height * 10}cm Weight: ${data.weight / 10}kg`);
    const pokeArt = document.getElementById('ref-img');
    pokeArt.crossOrigin = "Anonymous";
    pokeArt.src = data.sprites.other['official-artwork']['front_default'];

    const pokeArtBox = document.getElementById('poke-art-box');

    pokeArt.addEventListener("load", (e) => {
        console.log('art loaded called')

        // Clear all previous art from the box.
        pokeArtBox.textContent = '';

        // Clone the poke art for as many times bigger you are than it.
        for (let i = 0; i < heightFactor; i++) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('art-wrapper');

            const canvas = document.createElement('canvas');
            //canvas.classList.add('poke-art');
            canvas.width = pokeArt.width;
            canvas.height = pokeArt.height;
            const ctx = canvas.getContext("2d");
            // Draw the reference image before trimming.
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(pokeArt, 0, 0, canvas.height * pokeArt.width / pokeArt.height, canvas.height);

            //Remove transparent edges from poke art.
            const trimmedCanvas = trimCanvas(canvas);
            canvas.replaceWith(trimmedCanvas);
            trimmedCanvas.id = `poke-art-${i}`;
            trimmedCanvas.classList.add('poke-art', 'summon');

            // Delay each additional piece of art's animation
            trimmedCanvas.style.animationDelay = `${i * 100}ms`;
            trimmedCanvas.style.opacity = '0';
            setTimeout(() => {
                trimmedCanvas.style.opacity = null;
            }, i * 100 + 100)

            pokeArtBox.appendChild(wrapper);
            wrapper.appendChild(trimmedCanvas);
        }

        // Update the poke art size based on ratio.
        const r = document.querySelector(':root');
        r.style.setProperty('--art-ratio', `${inverseRatio * 100}%`);

        // Scale the man art down if he's smaller than the pokemon.
        if (oldHeightFactor < 1) {
            r.style.setProperty('--man-art-height', `${oldHeightFactor * 100}%`);
        } else {
            r.style.setProperty('--man-art-height', `calc(100% - 20px)`);
        }

        animateManSnap();

        const canvas = document.querySelector('canvas');
        const artBox = document.getElementById('poke-art-box');

        // Shrink the entire artbox down if pokemon is too wide to maintin aspect ratio.
        if (oldHeightFactor < 1 && canvas.width > canvas.height) {
            artBox.style.height = `${canvas.height}px`;
        } else if (canvas.offsetWidth >= artBox.offsetWidth - 30) {
            console.log('not too big but too wide')
        } else {
            artBox.style.height = null;
        }

        // Remove the event listener for image loading by replacing pokeArt with a cloned node, preventing continuous incrementation of function call.
        const pokeArtClone = pokeArt.cloneNode(true);
        pokeArt.parentNode.replaceChild(pokeArtClone, pokeArt);
    });

    const pokeName = document.getElementById('poke-name');
    pokeName.innerText = data['name'];

    const pokeNumber = document.getElementById('poke-number');
    pokeNumber.innerText = `#${data['id']}`;

    const type1 = document.getElementById('type-1');
    type1.innerText = data['types']['0']['type']['name'];

    const type2 = document.getElementById('type-2');

    // If the pokemon has two types, display the second, otherwise clear previous second type.
    if (Object.keys(data['types']).length > 1) {
        type2.style.display = null;
        type2.innerText = data['types']['1']['type']['name'];
    } else {
        type2.style.display = 'none';
    }

    const height = document.getElementById('poke-height');
    height.innerText = `${data['height'] * 10} cm`;

    const weight = document.getElementById('poke-weight');
    weight.innerText = `${data['weight'] / 10} kg`;

    if (units === 'imperial') {
        height.innerText = `${(data['height'] * 10 * 0.393701).toFixed(0)} in`;
        weight.innerText = `${(data['weight'] / 10 * 2.20462).toFixed(0)} lb`;
    }
}

// Process and redraw poke art and animate man art on image load.
const processArt = () => {

}

// Add event listener to make convert button convert units to pokemetric.
const convertBtn = document.getElementById('convert-btn');
convertBtn.addEventListener('click', () => {
    animateUnsummon();
    convertToPokemon(false);
});

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
    //console.log(closest[0])

    convertToPokemon(false, closest[0])
}

// Toggle between imperial and metric units.
const switchUnits = () => {
    const heightUnit = document.getElementById('height-unit');
    const weightUnit = document.getElementById('weight-unit');

    if (units === 'metric') {
        heightUnit.innerText = 'in';
        weightUnit.innerText = 'lbs';
    } else {
        heightUnit.innerText = 'cm';
        weightUnit.innerText = 'kg';
    }

    // Get previous displayed weight and height to convert.
    let pokeHeight = document.getElementById('poke-height');
    let pokeWeight = document.getElementById('poke-weight');
    let newHeight = pokeHeight.innerText.split(' ')[0];
    let newWeight = pokeWeight.innerText.split(' ')[0];

    if (units === 'metric') {
        pokeHeight.innerText = `${(newHeight * 0.393701).toFixed(0)} in`
        pokeWeight.innerText = `${(newWeight * 2.20462).toFixed(0)} lbs`
        units = 'imperial';
    } else {
        pokeHeight.innerText = `${(newHeight * 2.54).toFixed(0)} cm`
        pokeWeight.innerText = `${(newWeight * 0.453592).toFixed(0)} kg`
        units = 'metric';
    }
}
// Animate pokemon leaving the display.
const animateUnsummon = () => {
    const shownArt = Array.from(document.querySelectorAll('.poke-art'));
    shownArt.forEach(art => {
        art.classList.remove('summon');
        art.classList.add('unsummon');
    });
}

// Animate the man being snapped back and forth by the summoning of pokemon.
const animateManSnap = () => {
    const manArt = document.getElementById('man-art');
    manArt.classList.remove('man-snap');
    void manArt.offsetWidth;
    manArt.classList.add('man-snap');
}

const unitBtn = document.getElementById('unit-btn');
let units = 'metric';
unitBtn.addEventListener('click', switchUnits);

// Load from predetermined pokemon with buttons.
const defPokemonBtns = Array.from(document.querySelectorAll('.def-pokemon-btn'));
defPokemonBtns.forEach(button => {
    button.addEventListener('click', () => {
        animateUnsummon();
        convertToPokemon(false, button.dataset.name);
    })
});