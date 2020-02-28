import '../styles/index.scss';
import { drawLines } from './canvas.js';
// import PenStroke from './penstroke.js';

const colors = ['#d3168c', '#a618d1', '#7605e0', '#1210d9', '#1210d9'];

const http = new XMLHttpRequest();
const url = 'http://10.213.173.60:5000/stroke';

function docReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
};

docReady(function() {
  const canvas = document.getElementById('canvas');
  
  canvas.width = window.innerWidth - 200;
  canvas.height = window.innerHeight;

  let context = canvas.getContext('2d');
  let colorIndex = 0;

  function get_and_draw_stroke() {
      setTimeout(() => {
        if (colorIndex >= colors.length) colorIndex = 0;

        http.open("GET", url);
        http.onreadystatechange = function() {
            if (http.readyState == XMLHttpRequest.DONE) {
                const data = JSON.parse(http.response);

                // var stroke = new PenStroke(canvas, context, data, colors[colorIndex]);
                // stroke.draw_next_segment();
                drawLines(canvas, context, data, colors[colorIndex]);

                colorIndex++;
                get_and_draw_stroke();
            };
        };
        http.send();
      }, 1000);
  };

  get_and_draw_stroke();
});
