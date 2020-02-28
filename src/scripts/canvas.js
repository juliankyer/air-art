const fake_data = require('../data/fake_data.json');
export function drawLines(canvas, context, fake_data, color) {
    const base_radius = 2;

    const [start_x, start_y] = fake_data.location;

    var pen_ball = {
        frames: 0,
        x: canvas.width * start_x,
        y: canvas.height * start_y,
        speed: fake_data.speed,
        x_direction: fake_data.segments[0].unit_direction[0],
        y_direction: fake_data.segments[0].unit_direction[1],
        acceleration: fake_data.segments[0].acceleration,
        radius: base_radius,
        color: color,
        color_index: 0,
        draw: function() {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            context.closePath();
            context.fillStyle = this.color;
            context.fill();
        }
    };

    function draw() {
        pen_ball.draw();
        pen_ball.frames += 1;
        pen_ball.x += pen_ball.x_direction * pen_ball.speed;
        pen_ball.y += pen_ball.y_direction * pen_ball.speed;
        pen_ball.speed *= pen_ball.acceleration;
        pen_ball.radius = base_radius - (base_radius * pen_ball.speed);

        if (pen_ball.frames < 60) {
           window.requestAnimationFrame(draw);
        } else {
            draw_next_segment();
        };
    };

    let segment_index = 0;
    function draw_next_segment() {
        if (segment_index > fake_data.segments.length - 1) return null;
        const segment = fake_data.segments[segment_index];
        pen_ball.frames = 0;
        pen_ball.acceleration = segment.acceleration;
        pen_ball.x_direction = segment.unit_direction[0];
        pen_ball.y_direction = segment.unit_direction[1];
        pen_ball.radius = base_radius - (base_radius * pen_ball.speed);

        window.requestAnimationFrame(draw);
        segment_index += 1;
    };

    draw_next_segment();
};