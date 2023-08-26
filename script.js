const game_container = document.getElementById("game");
const start_button = document.getElementById("start-button");
const restart_button = document.getElementById("restart-button");
const medium_button = document.getElementById("medium-button");
const hard_button = document.getElementById("hard-button");
const score_display = document.getElementById("score-display");
const moves = document.getElementById('moves');
const moves_display = document.querySelector('.moves h3');
const win = document.querySelector('#win');
const s_display = document.querySelector('.score-display h3');

let previous_card = '';
let matched_card_count = 0;
let cards_open = 0;
let winner_match_number_to_be_compare;

let object = {
  "small": false,
  "medium": false,
  "hard": false
};

game_container.addEventListener('click', (event) => {
  if (event.target.classList.contains('matched') === false && event.target.classList.contains('card') && cards_open < 2) {

    if (previous_card === '') {
      cards_open += 1;
      previous_card = event.target;
      event.target.classList.add('rotate');
      event.target.children[0].classList.add('rotate');
      event.target.children[0].style.display = 'block';
      moves.textContent = parseInt(moves.textContent) + 1;

    }
    else if (check_for_match(event.target, previous_card) === false) {

      cards_open += 1;

      event.target.classList.add('rotate');
      event.target.children[0].classList.add('rotate');
      event.target.children[0].style.display = 'block';

      moves.textContent = parseInt(moves.textContent) + 1;

      setTimeout(() => {

        cards_open = 0;

        to_initial_position(event.target);

        to_initial_position(previous_card);

        previous_card = '';

      }, 1 * 1000);
    }
    else {
      previous_card = '';
      cards_open = 0;
    }

  }
});

const COLORS = [
  "gifs/1.gif",
  "gifs/2.gif",
  "gifs/3.gif",
  "gifs/4.gif",
  "gifs/5.gif",
  "gifs/6.gif",
  "gifs/7.gif",
  "gifs/8.gif",
  "gifs/9.gif",
  "gifs/10.gif",
];

function to_initial_position(current_card) {
  current_card.classList.remove('rotate');
  current_card.children[0].classList.remove('rotate');
  current_card.children[0].style.display = 'none';
};

function check_for_match(previous_card, current_card) {
  const current_card_number = current_card.classList[1];
  const current_image = current_card.classList[2];
  const previous_card_number = previous_card.classList[1];
  const previous_image = previous_card.classList[2];

  if (current_card_number !== previous_card_number && previous_image === current_image) {
    current_card.classList.add('matched');

    current_card.classList.add('rotate');
    current_card.children[0].classList.add('rotate');
    current_card.children[0].style.display = 'block';

    previous_card.classList.add('matched');

    previous_card.classList.add('rotate');
    previous_card.children[0].classList.add('rotate');
    previous_card.children[0].style.display = 'block';

    matched_card_count += 1;

    if (object.small) {
      winner_match_number_to_be_compare = 2;
    } else if (object.medium) {
      winner_match_number_to_be_compare = 4;
    } else {
      winner_match_number_to_be_compare = 6;
    }

    if (matched_card_count === winner_match_number_to_be_compare) {

      win.style.display = 'block';
      restart_button.style.display = 'block';

      localStorage.setItem('moves_count', moves.textContent);

      if (winner_match_number_to_be_compare === 2) {
        const lowest_score_small = localStorage.getItem('lowest-score-small');

        if (lowest_score_small === null || parseInt(moves.textContent) < parseInt(lowest_score_small)) {
          localStorage.setItem('lowest-score-small', moves.textContent);
        }

        if (lowest_score_small !== null) {
          // console.log(lowest_score);
          score_display.textContent = lowest_score_small;
        }

      } else if (winner_match_number_to_be_compare === 4) {
        const lowest_score_medium = localStorage.getItem('lowest-score-medium');

        if (lowest_score_medium === null || parseInt(moves.textContent) < parseInt(lowest_score_medium)) {
          localStorage.setItem('lowest-score-medium', moves.textContent);
        }

        if (lowest_score_medium !== null) {
          // console.log(lowest_score);
          score_display.textContent = lowest_score_medium;
        }
      } else {
        const lowest_score_hard = localStorage.getItem('lowest-score-hard');

        if (lowest_score_hard === null || parseInt(moves.textContent) < parseInt(lowest_score_hard)) {
          localStorage.setItem('lowest-score-hard', moves.textContent);
        }

        if (lowest_score_hard !== null) {
          // console.log(lowest_score);
          score_display.textContent = lowest_score_hard;
        }
      }

    }
    return true;
  }
  else {
    return false;
  }
};

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function createDivsForColors(colorArray) {
  game_container.innerText = "";

  colorArray.forEach((color, index) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("card", index, color);

    const img = document.createElement("img");
    img.src = color;

    newDiv.appendChild(img);
    game_container.append(newDiv);
  });
}

start_button.addEventListener("click", () => {
  object.small = true;
  change_level_button.style.display = "block";
  moves_display.style.display = "block";
  s_display.style.display = "block";

  const lowest_score_small = localStorage.getItem('lowest-score-small');

  if (lowest_score_small !== null) {
    score_display.textContent = lowest_score_small;
  }

  let easy_game = [];

  for (let index = 0; index < 2; index++) {
    easy_game.push(COLORS[index]);
  }

  let shuffledColors = shuffle(easy_game.concat(easy_game));

  start_button.style.display = "none";
  medium_button.style.display = "none";
  hard_button.style.display = "none";
  restart_button.style.display = "none";


  createDivsForColors(shuffledColors);

});

medium_button.addEventListener("click", () => {

  object.medium = true;
  change_level_button.style.display = "block";
  moves_display.style.display = "block";
  s_display.style.display = "block";
  const lowest_score_medium = localStorage.getItem('lowest-score-medium');

  if (lowest_score_medium !== null) {
    score_display.textContent = lowest_score_medium;
  }

  let medium_game = [];

  for (let index = 0; index < 4; index++) {
    medium_game.push(COLORS[index]);
  }

  let shuffledColors = shuffle(medium_game.concat(medium_game));

  start_button.style.display = "none";
  medium_button.style.display = "none";
  hard_button.style.display = "none";
  restart_button.style.display = "none";

  createDivsForColors(shuffledColors);
});


hard_button.addEventListener("click", () => {
  object.hard = true;
  change_level_button.style.display = "block";
  s_display.style.display = "block";
  moves_display.style.display = "block";
  const lowest_score_hard = localStorage.getItem('lowest-score-hard');

  if (lowest_score_hard !== null) {
    score_display.textContent = lowest_score_hard;
  }

  let hard_game = [];

  for (let index = 0; index < 6; index++) {
    hard_game.push(COLORS[index]);
  }

  let shuffledColors = shuffle(hard_game.concat(hard_game));

  start_button.style.display = "none";
  medium_button.style.display = "none";
  hard_button.style.display = "none";
  restart_button.style.display = "none";

  createDivsForColors(shuffledColors);
});

restart_button.addEventListener("click", () => {

  let value;

  const lowest_score_small = localStorage.getItem('lowest-score-small');
  const lowest_score_medium = localStorage.getItem('lowest-score-medium');
  const lowest_score_hard = localStorage.getItem('lowest-score-hard');

  Object.keys(object).filter((level) => {
    if (object[level] === true) {
      if (level === 'small') {
        value = 2;
        if (lowest_score_small !== null) {
          score_display.textContent = lowest_score_small;
        }
      } else if (level === 'medium') {
        value = 4;
        if (lowest_score_medium !== null) {
          score_display.textContent = lowest_score_medium;
        }
      } else {
        value = 6;
        if (lowest_score_hard !== null) {
          score_display.textContent = lowest_score_hard;
        }
      }
    }
  });

  let restart_game = [];

  for (let index = 0; index < value; index++) {
    restart_game.push(COLORS[index]);

  }

  console.log(restart_game);

  let shuffledColors = shuffle(restart_game.concat(restart_game));

  moves.textContent = 0;
  matched_card_count = 0;
  win.style.display = "none";
  restart_button.style.display = "none";

  createDivsForColors(shuffledColors);

});

const change_level_button = document.getElementById("change-level");

change_level_button.addEventListener("click", () => {

  start_button.style.display = "block";
  medium_button.style.display = "block";
  hard_button.style.display = "block";
  restart_button.style.display = "none";
  change_level_button.style.display = "none";
  win.style.display = "none";
  moves_display.style.display = "none";
  s_display.style.display = "none";
  moves.textContent = 0;
  matched_card_count = 0;
  previous_card = "";
  cards_open = 0;
  object.small = false;
  object.medium = false;
  object.hard = false;
  
  game_container.textContent = ""; 
});

