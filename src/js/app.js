import { ROCK_MATH } from './ROCK.js';

class Pindle {
  constructor() {

    this.pins = this.makePins();
    this.selection = this.makeSelection();

  };
  colors = [
    ['pink', '#fed91c'],
    ['blue', '#b131ed'],
    ['green', '#0e6cef'],
    ['orange', '#ff8300'],
    ['red', '#25ccfd']
  ];
  numberOfPinsInCode = 5;
  numberOfEachColor = 5;
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
};

class Pin {
  constructor(
    color
  ) {
    this.color = color;
  };
  color = '#000';
};

const pindle = new Pindle();
console.log(pindle);

let markup = `<div class="selection">${pindle.selection.map((pin) => {return `<div class="pin ${pin.color[0]}"></div>`}).join('')}</div>`;

document.body.innerHTML = markup;