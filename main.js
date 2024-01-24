import pokeData from './scripts/pokeData.js';
import trimCanvas from './scripts/trimCanvas.js';
import pokeAliases from './scripts/pokeAliases.js';

let artLoaded = true;

// Fetch pokemon API data and then convert/display units.
// If randomized is passed as true, select a random pokemon ID to convert.
async function convertToPokemon(randomized, pokemon) {
    
    // Prevent loading new pokemon until previous is loaded to avoid errors.
    if (!artLoaded) return;
    artLoaded = false;

    const pokeNameInput = document.getElementById('poke-name-input');
    let selection;
    const regex = new RegExp(/-|_|\s/, "g");
    randomized ? selection = Math.floor((Math.random() * 1008) + 1) : selection = pokeNameInput.value.toLowerCase();
    if (pokemon) {
        selection = pokemon;
        // If entered name is a pokemon with a non standard API entry, translate it.
    } else if (pokeAliases[pokeNameInput.value.toLowerCase().replaceAll(regex, '')] !== undefined && randomized == false) {
        selection = pokeAliases[pokeNameInput.value.toLowerCase().replaceAll(regex, '')];
    }

    // Prevent breaking the app when attempting to convert to poltchageist.
    if (selection == 'poltchageist' || selection == '1013') {
        logMessage('Poltchageist is not currently available, please choose another pokemon.', true);
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${selection}`).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })
        .then((data) => {

            // If the data returned is not a pokemon, prevent furthur operation unless randomized is true.
            if (!data.name) {
                console.log('pokemon not found, selecting at random');
                if (!randomized) {
                    convertToPokemon(true);
                    logMessage('Name input blank, converting random pokemon...', true)
                }

            } else {
                // Compare user metrics to pokemon size and display info.
                convert(data);
            }

        })
        .catch((error) => {
            console.log(error)
            logMessage('Pokemon not found, fetching one at random...', true)
            if (!randomized) convertToPokemon(true);
        });
}

// Setup default pokemon info to display.
convertToPokemon(false);

// Consider entered weight and chosen pokemon and convert to pokemetric.
const convert = (data) => {

    if (!validateMeasurement()) return;

    let userHeight = document.getElementById('height-input').value;
    let userWeight = document.getElementById('weight-input').value;

    // Convert entered units to metric if mode is imperial.
    if (units === 'imperial') {
        userHeight = userHeight * 2.54;
        userWeight = userWeight * 0.453592;
    }

    // Check what info the user has entered and convert accordingly.
    if (userHeight !== '') {
        let heightFactor = (userHeight / (data.height * 10)).toFixed(1);
        if (heightFactor <= 0) heightFactor = 0.1;
        displayResult(data, `You are as tall as ${heightFactor} ${data.name}${pluralize(data.name)}.`, 'height', heightFactor);
    }

    if (userWeight !== '') {
        const weightFactor = (userWeight / (data.weight / 10)).toFixed(1);
        displayResult(data, `You are as heavy as ${weightFactor} ${data.name}${pluralize(data.name)}.`, 'weight');
    }
}

// Display unit conversion. 
const displayResult = (data, message, metric, heightFactor) => {
    logMessage(message, false);

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

let lastWeight;
let lastHeight;

// Primary function for diplaying fetched pokemon info.
const displayPokeInfo = (data, heightFactor, oldHeightFactor, inverseRatio) => {

    //console.log(`Height: ${data.height * 10}cm Weight: ${data.weight / 10}kg`);
    const pokeArt = document.getElementById('ref-img');
    pokeArt.crossOrigin = "Anonymous";
    pokeArt.src = data.sprites.other['official-artwork']['front_default'];

    const pokeArtBox = document.getElementById('poke-art-box');

    pokeArt.addEventListener("load", (e) => {

        // Clear all previous art from the box.
        const wrapperArray = Array.from(document.querySelectorAll('.art-wrapper'));
        wrapperArray.forEach(wrapper => {
            wrapper.remove();
        });

        // Clone the poke art for as many times bigger you are than it.
        for (let i = 0; i < heightFactor; i++) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('art-wrapper');
            wrapper.id = (`art-wrapper-${i}`);

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

            if (i > 0) {
                const previousWrapper = document.getElementById(`art-wrapper-${i - 1}`);
                previousWrapper.appendChild(wrapper);
            } else {
                pokeArtBox.appendChild(wrapper);
            }

            wrapper.appendChild(trimmedCanvas);
        }

        // Remove the event listener for image loading by replacing pokeArt with a cloned node, preventing continuous incrementation of function call.
        const pokeArtClone = pokeArt.cloneNode(true);
        pokeArt.parentNode.replaceChild(pokeArtClone, pokeArt);

        // Update the poke art size based on ratio.
        const r = document.querySelector(':root');
        r.style.setProperty('--art-ratio', `${inverseRatio * 100}%`);

        // Scale the man art down if he's smaller than the pokemon.
        if (oldHeightFactor < 1) {
            r.style.setProperty('--man-art-height', `${oldHeightFactor * 100}%`);
        } else {
            r.style.setProperty('--man-art-height', `calc(100% - 20px)`);
        }

        resizeArtBox(data, inverseRatio);
        animateManSnap();

        artLoaded = true;
    });

    const pokeName = document.getElementById('poke-name');
    pokeName.innerText = data['species']['name'].charAt(0).toUpperCase() + data['species']['name'].slice(1);
    adjustFontSize();

    const pokeNumber = document.getElementById('poke-number');
    pokeNumber.innerText = `${data['id']}`;

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

    updateTypeBoxes(data, Object.keys(data['types']).length > 1);

    const height = document.getElementById('poke-height');
    height.innerText = `${data['height'] * 10} cm`;
    lastHeight = data['height'] * 10;

    const weight = document.getElementById('poke-weight');
    weight.innerText = `${data['weight'] / 10} kg`;
    lastWeight = data['weight'] / 10;

    if (units === 'imperial') {
        height.innerText = `${convertInches((data['height'] * 10 * 0.393701).toFixed(0))}`;
        weight.innerText = `${(data['weight'] / 10 * 2.20462).toFixed(0)} lb`;
    }
}

// Update colours for type boxes based on content.
const updateTypeBoxes = (data, twoTypes) => {
    const colours = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };

    const type1 = document.getElementById('type-1');
    const type2 = document.getElementById('type-2');

    type1.style.backgroundColor = colours[data['types']['0']['type']['name']];
    if (twoTypes) {
        type2.style.backgroundColor = colours[data['types']['1']['type']['name']];
    }

    const colouredBox = document.getElementById('coloured-box');
    colouredBox.style.backgroundColor = colours[data['types']['0']['type']['name']];
}

let lastPokemon = null;

const resizeArtBox = (data) => {

    const canvas = document.getElementById('poke-art-0');
    const artBox = document.getElementById('poke-art-box');

    artBox.style.height = null;

    // Shrink the entire artbox down if pokemon is too wide to maintin aspect ratio.
    if (canvas.offsetWidth >= artBox.offsetWidth - 30) {
        //console.log('oversized art of', data.name)
        artBox.style.height = '60%';
    } else if (lastPokemon !== data.name) {
        //console.log('art is not too big of ' + data.name)
        artBox.style.height = null;
    }

    lastPokemon = data.name;
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
        localStorage.setItem('units', 'imperial');
    } else {
        heightUnit.innerText = 'cm';
        weightUnit.innerText = 'kg';
        localStorage.setItem('units', 'metric');
    }

    // Get previous displayed weight and height to convert.
    let pokeHeight = document.getElementById('poke-height');
    let pokeWeight = document.getElementById('poke-weight');
    let newHeight = pokeHeight.innerText.split(' ')[0];
    let newWeight = pokeWeight.innerText.split(' ')[0];

    if (units === 'metric') {
        pokeHeight.innerText = `${convertInches((lastHeight * 0.393701).toFixed(0))}`
        pokeWeight.innerText = `${(lastWeight * 2.20462).toFixed(0)} lbs`
        units = 'imperial';
    } else {
        pokeHeight.innerText = `${lastHeight} cm`
        pokeWeight.innerText = `${lastWeight} kg`
        units = 'metric';
    }

    // Reload pokemon to show new size with new units.

    const pokeName = document.getElementById('poke-name').innerText.toLocaleLowerCase();
    animateUnsummon();
    convertToPokemon(false, pokeName);
}

// Convert an amount of inches into feet and inches.
const convertInches = (inches) => {
    let feet = Math.floor(inches / 12);
    let inchesLeft = inches % 12;
    return `${feet}' ${inchesLeft}''`
}

// Animate pokemon leaving the display.
const animateUnsummon = () => {
    // Prevent loading new pokemon until previous is loaded to avoid errors.
    if (!artLoaded) return;
    const shownArt = Array.from(document.querySelectorAll('.poke-art'));
    shownArt.forEach(art => {
        art.classList.remove('summon');
        art.classList.add('unsummon');
    });
    const firstWrapper = document.getElementById('art-wrapper-0');
    firstWrapper.classList.add('unsummon-wrapper');
}

// Animate the man being snapped back and forth by the summoning of pokemon.
const animateManSnap = () => {
    const manArt = document.getElementById('man-art');
    manArt.classList.remove('man-snap');
    void manArt.offsetWidth;
    manArt.classList.add('man-snap');
}

const unitBtn = document.getElementById('unit-btn');
let units = localStorage.getItem('units');
if (units == null) units = 'imperial';
if (units == 'metric') {
    const heightUnit = document.getElementById('height-unit');
    const weightUnit = document.getElementById('weight-unit');
    heightUnit.innerText = 'cm';
    weightUnit.innerText = 'kg';
}
unitBtn.addEventListener('click', switchUnits);

// Load from predetermined pokemon with buttons.
const defPokemonBtns = Array.from(document.querySelectorAll('.def-pokemon-btn'));
defPokemonBtns.forEach(button => {
    button.addEventListener('click', () => {
        animateUnsummon();
        convertToPokemon(false, button.dataset.name);
    })
});

// Load a random pokemon from a given generation.
const randomGenBtns = Array.from(document.querySelectorAll('.random-gen-btn'));
randomGenBtns.forEach(button => {
    button.addEventListener('click', () => {
        animateUnsummon();

        // Get a random pokemon ID based on generation start and end data.
        const choice = Math.floor(Math.random() * (button.dataset.end - button.dataset.start + 1)) + parseInt(button.dataset.start);
        convertToPokemon(false, choice);
    })
});

// Load a completely random pokemon
const randomBtn = document.getElementById('random-pokemon-btn')
randomBtn.addEventListener('click', () => {
    console.log('rolling random')
    animateUnsummon();
    convertToPokemon(true);
})

// let oneCount = 0;
// let bigCount = 0;

// const rngTester = (min, max) => {
//     const choice = Math.floor(Math.random() * (max - min + 1) + min);
//     if (choice == 0) oneCount++;
//     if (choice == 152) bigCount++;
// }

// for (let i = 0; i < 500; i++) {
//     rngTester(1, 151);
// }

// console.log(oneCount, bigCount)

let wobbleTimeout;
let shakeTimeout;
let manTimeout;

// Add wobble animation event listener to wobble button.
const wobbleBtn = document.getElementById('wobble-btn');
const animateWobble = () => {
    const wrapper = document.getElementById('art-wrapper-0');
    const pokedex = document.getElementById('pokedex');
    const manArt = document.getElementById('man-art');
    const array = [wrapper, pokedex, manArt];

    if (wrapper.classList.contains('wobbling')) {
        array.forEach(item => {
            item.classList.remove('wobbling');
            item.classList.add('wobbling-left');
        });

    } else if (wrapper.classList.contains('wobbling-left')) {
        array.forEach(item => {
            item.classList.remove('wobbling-left');
            item.classList.add('wobbling');
        });
    } else {
        array.forEach(item => {
            item.classList.add('wobbling');

            // Add a class to poke art to prevent transitioning from large to small poke art, breaking the size check.
            wrapper.classList.add('transitioned');
        });
    }

    clearTimeout(wobbleTimeout);
    wobbleTimeout = setTimeout(resetWrapper, 300);

    clearTimeout(shakeTimeout);
    shakeTimeout = setTimeout(resetArtBox, 250);

    clearTimeout(manTimeout);
    manTimeout = setTimeout(resetManArt, 250)
}

wobbleBtn.addEventListener('click', animateWobble);

const resetWrapper = () => {
    const wrapper = document.getElementById('art-wrapper-0');
    wrapper.classList.remove('wobbling', 'wobbling-left');
}

const resetArtBox = () => {
    const pokedex = document.getElementById('pokedex');
    pokedex.classList.remove('wobbling', 'wobbling-left');
}

const resetManArt = () => {
    const manArt = document.getElementById('man-art');
    manArt.classList.remove('wobbling', 'wobbling-left');
}

let messageTimer;

// Display modal messages for errors and other information
const logMessage = (message, error) => {
    const consoleBox = document.getElementById('console-box');
    const text = document.createElement('div');
    text.classList.add('console-message');
    text.innerText = message;
    consoleBox.appendChild(text);

    if (error) {
        text.style.color = `var(--magenta)`;
    }

    clearTimeout(messageTimer);
    messageTimer = setTimeout(animateMessage, 250);
}

// Show animation for a message added to the in-app console.
const animateMessage = () => {
    const resultInfo = document.getElementById('result-info');
    resultInfo.scrollTo({
        top: resultInfo.scrollHeight,
        left: 0,
        behavior: 'smooth'
    });
}

// Add flicker animations to zelda style buttons on click.
const zeldaBtns = Array.from(document.querySelectorAll('.zelda-btn'));
zeldaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.remove('flicker');
        void btn.offsetWidth;
        btn.classList.add('flicker');
    })
});

// Verify that entered weight and height are within constraints, preventing loading too many images for display.
const validateMeasurement = () => {
    let userHeight = document.getElementById('height-input').value;
    let userWeight = document.getElementById('weight-input').value;

    if (userHeight > 400 || userWeight > 1000 || userHeight == '' || userWeight == '') {
        logMessage('Please enter a weight under 1000 and a height under 400.', true)
        return false;
    } else {
        return true;
    }
}

// Return a letter to pluralize a pokemon name based on its termination.
const pluralize = (name) => {
    const finalLetter = name.slice(-1);
    const finalTwo = name.slice(-2);
    let letter = 's';

    if (finalLetter == 's' || finalLetter == 'x' || finalTwo == 'ch') {
        letter = 'es'
    }

    return letter;
}

// Move the unit of measurement over based on input value size.
const adjustUnit = (input) => {
    const unit = input.parentElement.querySelector('.unit-box');
    unit.style.left = `${input.value.length + 1}ch`;
}

const inputs = [document.getElementById('height-input'), document.getElementById('weight-input')];
inputs.forEach(input => {
    adjustUnit(input)
    input.addEventListener('input', () => {
        adjustUnit(input);
    })
});

// Add corners for animation of zelda styled buttons.
const addCorners = () => {
    const zeldaBtns = Array.from(document.querySelectorAll('.zelda-btn'));
    zeldaBtns.forEach(btn => {
        for (let i = 1; i < 5; i++) {
            const corner = document.createElement('div');
            corner.classList.add('corner', `corner-${i}`);
            btn.appendChild(corner);
        }
    });
}
addCorners();

// Add triforce corners to zelda themed help elements.
const addTriforces = () => {
    const modals = Array.from(document.querySelectorAll('.help'));
    const header = document.getElementById('header');
    modals.push(header);
    modals.forEach(modal => {
        for (let i = 1; i < 5; i++) {
            const triforce = document.createElement('img');
            triforce.classList.add('triforce', `triforce-${i}`);
            triforce.src = './images/triforce.png';
            triforce.alt = '';
            modal.appendChild(triforce);
        }
    });
}
addTriforces();

// Toggle visibility on help boxes on button click.
const helpBtn = document.getElementById('help-btn');
helpBtn.addEventListener('click', () => {
    const modals = Array.from(document.querySelectorAll('.help'));
    modals.forEach(modal => {
        modal.classList.toggle('shown');
    });
});

// Animate the dpad and perform action based on direction.
const dpadBox = document.getElementById('dpad-box');
const processDirection = (direction) => {
    dpadBox.className = '';
    void dpadBox.offsetHeight;
    dpadBox.classList.add(`clicked-${direction}`);

    const currentID = parseInt(document.getElementById('poke-number').innerText);
    let nextID = currentID + 1;
    let prevID = currentID - 1;

    // Wrap IDs when overflowing pokemon.
    if (nextID > 1017) nextID = 1;
    if (prevID < 1) prevID = 1017;

    switch (direction) {

        // Convert to a random pokemon.
        case 'up':
            animateUnsummon();
            convertToPokemon(true);
            break;

        // Convert to the next pokemon by ID.
        case 'right':
            animateUnsummon();
            convertToPokemon(false, nextID);
            break;
        case 'down':
            animateWobble();
            break;

        // Convert to the previous pokemon by ID.
        case 'left':
            animateUnsummon();
            convertToPokemon(false, prevID);
            break;
    }
}

// Animate dpad and perform actions on click.
const directions = ['up', 'right', 'down', 'left'];
directions.forEach(direction => {
    const btn = document.getElementById(`dpad-${direction}`);

    btn.addEventListener('click', () => {
        processDirection(direction);
    })
});

// Perform virtual dpad actions on arrow keys presses.
const checkKey = (e) => {
    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        processDirection('up');
    }
    else if (e.keyCode == '40') {
        // down arrow
        processDirection('down');
    }
    else if (e.keyCode == '37') {
        // left arrow
        processDirection('left');
    }
    else if (e.keyCode == '39') {
        // right arrow
        processDirection('right');
    }
}
document.onkeydown = checkKey;

// Adjust font size for pokemon name based on length of name.
const adjustFontSize = () => {
    const name = document.getElementById('poke-name');
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

    if (name.innerText.length > 12) {
        vw < 800 ? name.style.fontSize = '12px' : name.style.fontSize = '18px';
    } else {
        name.style.fontSize = null;
    }
}

// Add event listener to mobile layout for showing options.
const optionsBtn = document.getElementById('options-btn');
optionsBtn.addEventListener('click', () => {
    const options = document.getElementById('options');
    options.classList.toggle('shown');
});

const backBtn = document.getElementById('back-btn');
backBtn.addEventListener('click', () => {
    const options = document.getElementById('options');
    options.classList.toggle('shown');
});