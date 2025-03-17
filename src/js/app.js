import { ROCK_MATH } from './ROCK.js';

class Pindle {
  constructor() {

    this.pins = this.makePins();
    this.selection = this.makeSelection();
    this.attempts = this.makeAttempts();

  };
  colors = [
    'pink',
    'blue',
    'green',
    'orange',
    'red',
    'crimson',
    'salmon',
    'chartreuse',
    'cyan',
    'magenta'
  ];
  numberOfPinsInCode = 5;
  numberOfEachColor = 5;
  numberOfAttempts = 6;
  attemptIndex = 0;
  attemptPinIndex = 0;
  solved = false;
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
        attempt.push(new Pin('empty'));
      };
      out.push(attempt);
    };

    return out;

  };
  addAttempt(color) {
    
    this.attempts[this.attemptIndex][this.attemptPinIndex].setColor(color);
    
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
    console.log('checkAttempt', this.attempts[this.attemptIndex], this.selection);
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
    });
    if(correct===5) {
      this.solved = true;
    };
  };
};

class Pin {
  constructor(
    color
  ) {
    this.color = color;
  };
  color = 'empty';
  state = 'pin';
  setState(state) {
    this.state = state;
  };
  setColor(color) {
    this.color = color;
  };
};

const root = document.querySelector(':root');
const size = 50;
const gap = 10;

const pindle = new Pindle();
console.log(pindle);

const makeAttempt = (attempt) => {
  return attempt.map((pin) => {
    return `<div class="pin ${pin.color}" data-state="${pin.state}"></div>`;
  }).join('');
};

const render = () => {
  let markup = `<div class="board">`;
  markup += `<div class="selection" data-solved=${pindle.solved}>${pindle.selection.map((pin) => {return `<div class="pin selected ${pin.color}"></div>`}).join('')}</div>`;
  markup += `<div class="attempts">${pindle.attempts.map((attempt) => {return `<div class="attempt">${makeAttempt(attempt)}</div>`}).join('')}</div>`;
  markup += `<div class="buttons" style="width: ${(size*5)+(gap*4)}px">${pindle.colors.map((color) => {return `<div data-color="${color}" class="pin button ${color}"></div>`}).join('')}</div>`;
  markup += `</div>`;
  document.body.innerHTML = markup;
};

render();

document.addEventListener('click', (e) => {
  if(e.target.classList.contains('button')) {
    pindle.addAttempt(e.target.getAttribute('data-color'));
    render();
  };
});

root.style.setProperty('--size', `${size}px`);
root.style.setProperty('--gap', `${gap}px`);