// Initialize global variables
let userPokemon, enemyPokemon;
let userCurrentHealth, computerCurrentHealth;

const pokemonData = {
  Pikachu: { health: 100, image_url: 'https://img.pokemondb.net/artwork/large/pikachu.jpg' },
  Charmander: { health: 100, image_url: 'https://img.pokemondb.net/artwork/large/charmander.jpg' },
  Squirtle: { health: 100, image_url: 'https://img.pokemondb.net/artwork/large/squirtle.jpg' }
};

document.addEventListener('DOMContentLoaded', () => {
  const pokemonChoices = document.querySelectorAll('.pokemon-choice');
  pokemonChoices.forEach(choice => {
    choice.addEventListener('click', selectPokemon);
  });

  document.getElementById('attack-button').addEventListener('click', userAttack);

  // Load state from cookies if available
  loadState();
});

function selectPokemon(event) {
  const selectedPokemon = event.target.dataset.pokemon;
  userPokemon = { ...pokemonData[selectedPokemon], name: selectedPokemon };
  enemyPokemon = { ...pokemonData['Charmander'], name: 'Charmander' }; // Default enemy for simplicity

  userCurrentHealth = userPokemon.health;
  computerCurrentHealth = enemyPokemon.health;

  // Show battle page
  document.getElementById('homepage').style.display = 'none';
  document.getElementById('battlepage').style.display = 'block';

  // Update UI
  updateBattleUI();

  // Save state to cookies
  saveState();
}

function userAttack() {
  computerCurrentHealth -= 10; // Fixed damage for simplicity
  if (computerCurrentHealth <= 0) {
    alert('You win!');
    resetGame();
    return;
  }

  // Computer attack
  userCurrentHealth -= 10; // Fixed damage for simplicity
  if (userCurrentHealth <= 0) {
    alert('You lose!');
    resetGame();
    return;
  }

  // Update UI
  updateBattleUI();

  // Save state to cookies
  saveState();
}

function updateBattleUI() {
  document.getElementById('user-pokemon-name').textContent = userPokemon.name;
  document.getElementById('user-pokemon-image').src = userPokemon.image_url;
  document.getElementById('user-pokemon-health').textContent = `HP: ${userCurrentHealth}`;

  document.getElementById('enemy-pokemon-name').textContent = enemyPokemon.name;
  document.getElementById('enemy-pokemon-image').src = enemyPokemon.image_url;
  document.getElementById('enemy-pokemon-health').textContent = `HP: ${computerCurrentHealth}`;
}

function saveState() {
  Cookies.set('userPokemon', JSON.stringify(userPokemon), { sameSite: 'Lax' });
  Cookies.set('enemyPokemon', JSON.stringify(enemyPokemon), { sameSite: 'Lax' });
  Cookies.set('userCurrentHealth', userCurrentHealth, { sameSite: 'Lax' });
  Cookies.set('computerCurrentHealth', computerCurrentHealth, { sameSite: 'Lax' });
}

function loadState() {
  const userPokemonCookie = Cookies.get('userPokemon');
  const enemyPokemonCookie = Cookies.get('enemyPokemon');
  const userCurrentHealthCookie = Cookies.get('userCurrentHealth');
  const computerCurrentHealthCookie = Cookies.get('computerCurrentHealth');

  if (userPokemonCookie) userPokemon = JSON.parse(userPokemonCookie);
  if (enemyPokemonCookie) enemyPokemon = JSON.parse(enemyPokemonCookie);
  if (userCurrentHealthCookie) userCurrentHealth = parseInt(userCurrentHealthCookie);
  if (computerCurrentHealthCookie) computerCurrentHealth = parseInt(computerCurrentHealthCookie);

  if (userPokemon && enemyPokemon) {
    document.getElementById('homepage').style.display = 'none';
    document.getElementById('battlepage').style.display = 'block';
    updateBattleUI();
  }
}

function resetGame() {
  Cookies.remove('userPokemon', { sameSite: 'Lax' });
  Cookies.remove('enemyPokemon', { sameSite: 'Lax' });
  Cookies.remove('userCurrentHealth', { sameSite: 'Lax' });
  Cookies.remove('computerCurrentHealth', { sameSite: 'Lax' });
  window.location.reload();
}
