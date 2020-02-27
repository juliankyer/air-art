export function drawLines(canvas, context) {
    const base_radius = 2;

    const fake_data = {"location": [0.8553116321563721, 0.923753559589386], "speed": 0.2241044044494629, "segments": [{"unit_direction": [-0.018715707420810992, -0.9998248458083738], "acceleration": 0.9780861735343933}, {"unit_direction": [-0.13321027927612328, -0.9910877970670294], "acceleration": 0.9903990626335144}, {"unit_direction": [0.21278553171237005, -0.9770989292256358], "acceleration": 0.9926618337631226}, {"unit_direction": [0.3787067026989507, -0.9255167385471149], "acceleration": 1.0186649560928345}, {"unit_direction": [0.7733454372270593, -0.6339848852457671], "acceleration": 1.0016921758651733}, {"unit_direction": [0.7259171792724889, -0.6877821230862817], "acceleration": 1.0008735656738281}, {"unit_direction": [0.6380155855197716, -0.7700234494051873], "acceleration": 1.0234256982803345}, {"unit_direction": [0.44969184111156674, -0.8931837705857006], "acceleration": 1.0090147256851196}]};

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
        color: 'black',
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
        console.log(segment);
        pen_ball.frames = 0;
        pen_ball.acceleration = segment.acceleration;
        pen_ball.x_direction = segment.unit_direction[0];
        pen_ball.y_direction = segment.unit_direction[1];
        
        window.requestAnimationFrame(draw);
        segment_index += 1;
    };

    draw_next_segment();
};