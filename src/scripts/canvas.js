// const fake_data = require('../data/fake_data.json');

export function drawLines(canvas, context, fake_data, color) {
    const base_radius = 3;

    const [start_x, start_y] = fake_data.location;

    var pen_ball = {
        frames: 0,
        x: canvas.width * start_x,
        y: canvas.height * start_y,
        x_speed: fake_data.speed,
        y_speed: fake_data.speed,
        x_direction: fake_data.segments[0].unit_direction[0],
        y_direction: fake_data.segments[0].unit_direction[1],
        acceleration: fake_data.segments[0].acceleration,
        radius: base_radius,
        color: color,
        draw: function() {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            context.closePath();
            context.fillStyle = this.color;
            context.fill();
        }
    };

    function draw() {
        const radius_slider = document.getElementById('radius');
        const speed_slider = document.getElementById('speed');
        const x_slider = document.getElementById('x_slide');
        const gravity = .01;

        pen_ball.draw();
        pen_ball.frames += 1;
        pen_ball.x += pen_ball.x_direction + pen_ball.x_speed;
        // pen_ball.x += pen_ball.x_direction + pen_ball.speed + x_slider;
        pen_ball.y += pen_ball.y_direction - pen_ball.y_speed;
        pen_ball.x_speed *= pen_ball.acceleration + speed_slider.value;
        pen_ball.y_speed *= pen_ball.acceleration + speed_slider.value;
        pen_ball.y_speed -= gravity;
        // pen_ball.radius = base_radius - (base_radius * pen_ball.speed);
        pen_ball.radius = radius_slider.value;

        console.log(radius_slider.value);
        
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