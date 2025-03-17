import { ROCK_MATH } from './ROCK.js';

class Pindle {
  constructor() {

    this.reset();

  };
  makePins() {

    const out = [];
    this.colors.forEach((color) => {
      for(var i=0;i<this.numberOfEachColor;i++) {
        out.push(new Pin(color));
      };
    });
    return out;

  };
  makeSelection() {

    const out = [];
    for(var i=0;i<this.numberOfPinsInCode;i++) {
      const index = ROCK_MATH.random(0, (this.pins.length - 1));
      out.push(this.pins.splice(index, 1)[0]);
    };

    return out;

  };
  makeAttempts() {
    
    const out = [];
    for(var i=0;i<this.numberOfAttempts;i++) {
      const attempt = [];
      for(var bob=0;bob<this.numberOfPinsInCode;bob++) {
        attempt.push(new Pin('empty').setState('empty'));
      };
      out.push(attempt);
    };

    return out;

  };
  makeButtons() {
    
    return this.colors.map((color) => {
      return new Pin(color);
    });

  };
  addAttempt(color) {
    
    this.attempts[this.attemptIndex][this.attemptPinIndex].setColor(color).setState('pin');
    
    if(this.attemptPinIndex < (this.numberOfPinsInCode - 1)) {
      this.attemptPinIndex ++;
    }
    else {
      this.checkAttempt();
      this.attemptIndex ++;
      this.attemptPinIndex = 0;
    };
    
    return this;

  };
  checkAttempt() {
    let correct = 0;
    this.attempts[this.attemptIndex].forEach((pin, i) => {
      let state = 'incorrect';
      if(this.selection[i].color === pin.color) {
        state = 'correct';
        correct ++;
      }
      else if(this.selection.map((pinToMap) => {return pinToMap.color}).includes(pin.color)) {
        state = 'wrong-spot';
      };
      pin.setState(state);
      if(state==='incorrect') {
        this.buttons.filter((button) => {
          return button.color === pin.color;
        })[0].setState('disabled');
      };
    });
    if(correct===this.numberOfPinsInCode) {
      this.solved = true;
    };
    return this;
  };
  checkGaneOver() {
    return !this.solved && this.attemptIndex > (this.attempts.length - 1);
  };
  reset() {
    
    this.pins = this.makePins();
    this.selection = this.makeSelection();
    this.attempts = this.makeAttempts();
    this.buttons = this.makeButtons();
    this.solved = false;
    this.attemptIndex = 0;
    this.attemptPinIndex = 0;
    return this;

  };
  colors = [
    'color0',
    'color1',
    'color2',
    'color3',
    'color4',
    'color5',
    'color6',
    'color7',
    'color8',
    'color9'
  ];
  numberOfPinsInCode = 5;
  numberOfEachColor = 5;
  numberOfAttempts = 6;
  attemptIndex = 0;
  attemptPinIndex = 0;
  solved = false;
};

class Pin {
  constructor(color) {
    this.color = color;
  };
  setState(state) {
    this.state = state;
    return this;
  };
  setColor(color) {
    this.color = color;
    return this;
  };
  color = 'empty';
  state = 'pin';
};

const root = document.querySelector(':root');
const size = 50;
const gap = 11;
const boardGap = 30;
const pindle = new Pindle();
console.log(pindle);

const makeAttempt = (attempt) => {
  return attempt.map((pin) => {
    return `<div class="pin ${pin.color}" data-state="${pin.state}"></div>`;
  }).join('');
};

const render = () => {
  const gameover = pindle.solved || pindle.checkGaneOver();
  let markup = `<div class="board">`;
  markup += `<div class="selection" data-solved=${pindle.solved}>${pindle.selection.map((pin) => {return `<div class="pin selected ${pin.color}"></div>`}).join('')}</div>`;
  markup += `<div class="attempts" data-gameover=${gameover}>${pindle.attempts.map((attempt) => {return `<div class="attempt">${makeAttempt(attempt)}</div>`}).join('')}</div>`;
  markup += `<div class="controls" data-gameover=${gameover}>`;
    markup += `<div class="buttons" style="width: ${(size*5)+(gap*4)}px">${pindle.buttons.map((pin) => {return `<div data-color="${pin.color}" data-state="${pin.state}" class="pin button ${pin.color}"></div>`}).join('')}</div>`;
    markup += `<div class="foot">pindle</div>`;
  markup += `</div>`;
  markup += `<div class="game-over" data-show="${pindle.checkGaneOver()}"><div class="game-over-body"><h2>GAME OVER</h2><p>Press to try again.</p></div></div>`;
  markup += `<div class="game-over" data-show="${pindle.solved}"><div class="game-over-body"><h2>Well done!</h2><p>You solved the puzzle in ${pindle.attemptIndex} tries!</p><p>Press to try again.</p></div></div>`;
  markup += `</div>`;
  document.body.innerHTML = markup;
};

render();

document.addEventListener('click', (e) => {
  if(e.target.classList.contains('button')) {
    pindle.addAttempt(e.target.getAttribute('data-color'));
    render();
  };
  if(e.target.classList.contains('game-over')) {
    pindle.reset();
    render();
  };
});

root.style.setProperty('--size', `${size}px`);
root.style.setProperty('--gap', `${gap}px`);
root.style.setProperty('--board-gap', `${boardGap}px`);