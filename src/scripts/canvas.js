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
        segment_length: fake_data.segments[0].segment_length,
        draw: function() {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            context.closePath();
            context.fillStyle = this.color;
            context.fill();
        }
    };

    function new_radius(curr_radius, x_speed, y_speed) {
        let speed = Math.sqrt(Math.pow(x_speed, 2) + Math.pow(y_speed, 2));
        let shrinking_factor = curr_radius * speed;
        if (shrinking_factor > (curr_radius - 1)) {
            return 1;
        } else {
            return curr_radius - shrinking_factor;
        }
    }

    function draw() {
        const radius_slider = document.getElementById('radius');
        const speed_slider = document.getElementById('speed');
        const gravity_slider = document.getElementById('gravity');
        let gravity = gravity_slider.value / 1000;

        pen_ball.draw();
        pen_ball.frames += 1;
        pen_ball.x += pen_ball.x_direction + pen_ball.x_speed;
        pen_ball.y += pen_ball.y_direction - pen_ball.y_speed;
        pen_ball.x_speed *= pen_ball.acceleration + speed_slider.value;
        pen_ball.y_speed *= pen_ball.acceleration + speed_slider.value;
        pen_ball.y_speed -= gravity;

        pen_ball.radius = new_radius(radius_slider.value, pen_ball.x_speed, pen_ball.y_speed);

        if (pen_ball.frames < 60) {
           window.requestAnimationFrame(draw);
        } else {
            draw_next_segment();
        };
    };

    let segment_index = 0;
    function draw_next_segment() {
        if (segment_index > fake_data.segments.length - 1) return null;

        // This is an attempt to get the older lines to fade away over time
        // context.fillStyle = 'rgba(0, 0, 0, 0.005)';
        // context.fillRect(0,0,canvas.width,canvas.height);

        const radius_slider = document.getElementById('radius');
        const segment = fake_data.segments[segment_index];
        pen_ball.frames = 0;
        pen_ball.acceleration = segment.acceleration;
        pen_ball.x_direction = segment.unit_direction[0];
        pen_ball.y_direction = segment.unit_direction[1];
        pen_ball.radius = new_radius(radius_slider, pen_ball.x_speed, pen_ball.y_speed);
        pen_ball.segment_length = segment.segment_length;

        window.requestAnimationFrame(draw);
        segment_index += 1;
    };

    draw_next_segment();
};