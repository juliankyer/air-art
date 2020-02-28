import '../styles/index.scss';
import { drawLines } from './canvas.js';

const fake_data = require('../data/fake_data.json');

function docReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
};

docReady(function() {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  fake_data.forEach(data => drawLines(canvas, context, data));
});
