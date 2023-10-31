// These functions were only used to create the local JSON this app uses
// when giving a similar sized pokemon. I'm leaving it here as it may be useful
// for future updates.

let dataObj = {}

// Calling this function collects poke height and weight into a logged JSON.
async function fetchNext() {
    let currentPos = Object.entries(dataObj).length + 1;
    console.log(currentPos)

    fetch(`https://pokeapi.co/api/v2/pokemon/${currentPos}`).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })
        .then((data) => {
            if (currentPos < 1293) {
                updateObj(data);
                fetchNext()
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

// Update the global data Object with newly fetched pokemon.
const updateObj = (data) => {
    let newData = {
        height: data.height,
        weight: data.weight
    }

    dataObj[data.name] = newData;
    console.log(dataObj);
}

//fetchNext()