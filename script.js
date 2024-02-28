let currentPokemon;
let currentPokemonSpecies;
i = 1;
let currentIndex = 1;
const batchSize = 25;

async function loadPokemon() {
    let urlPokemon = 'https://pokeapi.co/api/v2/pokemon/' + i;
    let response = await fetch(urlPokemon);
    currentPokemon = await response.json();
    console.log('loaded Pokemon', currentPokemon);
    await loadUrlSpecies();
    await loadUrlGender();
    await loadAbout();
    renderPokemonInfo();
}

async function loadUrlSpecies() {
    let urlSpecies = 'https://pokeapi.co/api/v2/pokemon-species/' + currentPokemon['id'];
    let response = await fetch(urlSpecies);
    currentPokemonSpecies = await response.json();
    console.log('loaded Pokemon Species', currentPokemonSpecies);
}

async function loadUrlGender() {
    let urlGender = 'https://pokeapi.co/api/v2/gender/' + currentPokemon['id'];
    let response = await fetch(urlGender);
    currentPokemonGender = await response.json();
    console.log('loaded Pokemon Gender', currentPokemonGender);
}

async function renderPokemonInfo() {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    renderPokemonTypes();
    renderBgColor();
    renderImage();
    renderAbout();
    renderBreeding();
}

// Bulk Render Area--------------------------------/
function renderPokemonBulk() {
const endIndex = Math.min(currentIndex + batchSize, currentPokemon.length);
    for (let k = currentIndex; k < endIndex; k++) {
       let overview = document.getElementById('pokemonOverview');
        // Hier können Sie Ihre Verarbeitungslogik für das aktuelle Pokemon einfügen
        overview.innerHTML = `
        <div id="miniPokemonCard">
            <div id="miniPokemonCardTop${k}">
                <div>
                    <div id="pkmonName${k}"><div>
                    <div id="pkmonId${k}"><div>
                </div>
                <img src="" id="pkmonImg${k}">
            </div>
            <div id="miniPokemonCardBody">
            </div>
        </div>
        `;
        console.log("Loading Pokemon:", currentPokemon[k]);
    }
    currentIndex = endIndex;
    if (currentIndex < currentPokemon.length) {
        showLoadMoreButton();
    } else {
        hideLoadMoreButton();
    }
}

function showLoadMoreButton() {
document.getElementById('loadMoreButton').style.display = 'block';
}

function hideLoadMoreButton() {
document.getElementById('loadMoreButton').style.display = 'none';
}


// ------------------------------------------------/
function renderBaseStats() {
    let hp = currentPokemon['stats'][0]['stat']['name'];
    let hpValue = currentPokemon['stats'][0]['base_stat'];
    let attack = currentPokemon['stats'][1]['stat']['name'];
    let attackValue = currentPokemon['stats'][1]['base_stat'];
    let defense = currentPokemon['stats'][2]['stat']['name'];
    let defenseValue = currentPokemon['stats'][2]['base_stat'];
    let specialAttack = currentPokemon['stats'][3]['stat']['name'];
    let specialAttackValue = currentPokemon['stats'][3]['base_stat'];
    let specialDefense = currentPokemon['stats'][4]['stat']['name'];
    let specialDefenseValue = currentPokemon['stats'][4]['base_stat'];
    let speed = currentPokemon['stats'][5]['stat']['name'];
    let speedValue = currentPokemon['stats'][5]['base_stat'];
    renderBaseStatsChart(hp, attack, defense, specialAttack, specialDefense, speed, hpValue, attackValue, defenseValue, specialAttackValue, specialDefenseValue, speedValue);
}

function renderAbout() {
    let species = document.getElementById(`species${i}`);
    let height = document.getElementById(`height${i}`);
    let weight = document.getElementById(`weight${i}`);
    species.innerHTML = `${currentPokemonSpecies['genera'][7]['genus']}`;
    pokemonHeight = currentPokemon['height'] / 10;
    height.innerHTML = `${pokemonHeight} m`;
    pokemonWeight = currentPokemon['weight'] / 10;
    weight.innerHTML = `${pokemonWeight} kg`;
    renderAbilities();
}

function renderAbilities() {
    let abilities = document.getElementById(`abilities${i}`);
    let currentPokemonAbilities = currentPokemon['abilities'];
    abilities.innerHTML = '';
    for (let j = 0; j < currentPokemonAbilities.length; j++) {
        let ability = currentPokemonAbilities[j]['ability']['name'];
        if (j == currentPokemonAbilities.length - 1) {
            abilities.innerHTML += `${ability}`;
        } else {
            abilities.innerHTML += `${ability}, `;
        }
    }
}

function renderBreeding() {
    let gender = document.getElementById(`gender${i}`);
    let eggGroups = document.getElementById(`egggroups${i}`);
    eggGroups.innerHTML = `${currentPokemonSpecies['egg_groups'][0]['name']}`;
    let eggCycle = document.getElementById(`eggcycle${i}`);
    eggCycle.innerHTML = `${currentPokemonSpecies['egg_groups'][1]['name']}`;
}

function renderImage() {
    let pokemonImg = document.getElementById('pokemonDetailImage');
    let pokemonSrc = currentPokemon['sprites']['other']['dream_world']['front_default'];
    pokemonImg.src = pokemonSrc;
}

function renderPokemonTypes() {
    let types = currentPokemon['types'];
    let pokemonTypes = document.getElementById('pokemonTypes');
    pokemonTypes.innerHTML = '';
    for (let j = 0; j < types.length; j++) {
        let type = types[j]['type']['name'];
        let typeDiv = document.createElement('div');
        typeDiv.className = 'oval-border';
        typeDiv.innerHTML = `${type}`;
        pokemonTypes.appendChild(typeDiv);
    }
}

function renderBgColor() {
    let type = currentPokemon['types'][0]['type']['name'];
    let bgColor = color[`${type}`];
    document.getElementById('pokemonDetailCard').style.backgroundColor = bgColor;
}

function loadAbout() {
    let navContent = document.getElementById('navContent');
    navContent.innerHTML = `
    <table class="aboutTable">
        <tr>
            <td class="sizeAboutTableTd">Species</td>
            <td id="species${i}"></td>
        </tr>
        <tr>
            <td class="sizeAboutTableTd">Height</td>
            <td id="height${i}"></td>
        </tr>
        <tr>
            <td class="sizeAboutTableTd">Weight</td>
            <td id="weight${i}"></td>
        </tr>
        <tr>
            <td class="sizeAboutTableTd">Abilities</td>
            <td id="abilities${i}"></td>
        </tr>
    </table>
    <b>Breeding</b>
    <table class="aboutTable">
        <tr>
            <td class="sizeAboutTableTd">Gender</td>
            <td id="gender${i}"></td>
        </tr>
        <tr>
            <td class="sizeAboutTableTd">Egg Groups</td>
            <td id="egggroups${i}"></td>
        </tr>
        <tr>
            <td class="sizeAboutTableTd">Egg Cycle</td>
            <td id="eggcycle${i}"></td>
        </tr>
    </table>
    `;
    renderAbout();
    renderBreeding();
}

function loadBaseStats() {
    let navContent = document.getElementById('navContent');
    navContent.innerHTML = `
    <div class="chartBox">
    <canvas id="myChart"></canvas>
    </div>
    `;
    renderBaseStats();
}

function loadEvolution() {

}

function loadMoves() {

}

// Chart -------------------------
function renderBaseStatsChart(hp, attack, defense, specialAttack, specialDefense, speed, hpValue, attackValue, defenseValue, specialAttackValue, specialDefenseValue, speedValue) {
    const ctx = document.getElementById('myChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [hp, attack, defense, specialAttack, specialDefense, speed],
            datasets: [{
                data: [hpValue, attackValue, defenseValue, specialAttackValue, specialDefenseValue, speedValue],
                borderWidth: 1,
                datalabels: {
                    anchor: 'start',
                    align: 'start',
                    offset: -25
                },
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            scales: {
                x: {
                    display: false,
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10
                }
            },
        },
        plugins: [ChartDataLabels],
    })
}
// -----------------------------