import '../styles/index.scss';
import { drawLines } from './canvas.js';

const fake_data = require('../data/fake_data.json');
const colors = ['#d3168c', '#a618d1', '#7605e0', '#1210d9', '#1210d9'];

function docReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
};

docReady(function() {
  const canvas = document.getElementById('canvas');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const context = canvas.getContext('2d');
  let colorIndex = 0;

  fake_data.forEach((data, index) => {
    if(colorIndex >= colors.length) {
      colorIndex = 0;
    }

    drawLines(canvas, context, data, colors[colorIndex]);
    colorIndex++;
  });
});
