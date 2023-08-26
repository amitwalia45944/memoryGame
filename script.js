const game_container = document.getElementById("game");
const start_button = document.getElementById("start-button");
const restart_button = document.getElementById("restart-button");
const score_display = document.getElementById("score-display");
const moves = document.getElementById('moves');
const win = document.querySelector('#win');

let previous_card = '';
let matched_card_count = 0;
let cards_open = 0;

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
  "gifs/6.gif"
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
    console.log(matched_card_count);

    if (matched_card_count === COLORS.length) {

      win.style.display = 'block';
      restart_button.style.display = 'block';

      localStorage.setItem('moves_count', moves.textContent);

      const lowest_score = localStorage.getItem('lowest-score');

      if (lowest_score === null || parseInt(moves.textContent) < parseInt(lowest_score)) {
        localStorage.setItem('lowest-score', moves.textContent);
      }

      if (lowest_score !== null) {
        console.log(lowest_score);
        score_display.textContent = lowest_score;
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

  for (let index = 0; index < colorArray.length; index++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("card", index, colorArray[index]);
    const img = document.createElement("img");
    img.src = colorArray[index];
    newDiv.appendChild(img);
    game_container.append(newDiv);
  }
}

start_button.addEventListener("click", () => {
 
  const lowest_score = localStorage.getItem('lowest-score');
 
  if (lowest_score !== null) {
     score_display.textContent = lowest_score;
   }

  let shuffledColors = shuffle(COLORS.concat(COLORS));
  console.log(shuffledColors);

  start_button.style.display = "none";
  restart_button.style.display = "none";
  createDivsForColors(shuffledColors);
});

restart_button.addEventListener("click", () => {
  const lowest_score = localStorage.getItem('lowest-score');
 
  if (lowest_score !== null) {
     console.log(lowest_score);
     score_display.textContent = lowest_score;
   }

  let shuffledColors = shuffle(COLORS.concat(COLORS));
  console.log(shuffledColors);
  moves.textContent = 0;
  matched_card_count = 0;
  win.style.display = "none";
  createDivsForColors(shuffledColors);
  
});