const width = 800;
const height = 800;

const canvas = d3.select('#canvas-wrapper')  
               .append('canvas')  
               .attr('width', width)  
               .attr('height', height);

const context = canvas.node().getContext('2d');