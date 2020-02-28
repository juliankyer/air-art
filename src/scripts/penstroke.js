export default class PenStroke {
    constructor(canvas, context, stroke_data, color) {
        const base_radius = 3;

        this.frames = 0;
        this.segment_index = 0;
        this.x = canvas.width * stroke_data.location[0];
        this.y = canvas.height * stroke_data.location[1];
        this.x_speed = stroke_data.speed;
        this.y_speed = stroke_data.speed;
        this.x_direction = stroke_data.segments[0].unit_direction[0];
        this.y_direction = stroke_data.segments[0].unit_direction[1];
        this.acceleration = stroke_data.segments[0].acceleration;
        this.radius = base_radius;
        this.color = color;
        this.data = stroke_data;
        this.n_strokes = stroke_data.segments.length;
        this.segment_length = stroke_data.segments[0].length;

        this.context = context;
    };

    draw_ballpoint() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.fillStyle = this.color;
        this.context.fill();
    };

    draw() {
        const radius_slider = document.getElementById('radius');
        const speed_slider = document.getElementById('speed');
        const x_slider = document.getElementById('x_slide');
        const gravity = .01;

        this.draw_ballpoint();
        this.frames += 1;
        this.x += this.x_direction + this.x_speed;
        // this.x += this.x_direction + this.speed + x_slider;
        this.y += this.y_direction - this.y_speed;
        this.x_speed *= this.acceleration + speed_slider.value;
        this.y_speed *= this.acceleration + speed_slider.value;
        this.y_speed -= gravity;
        // this.radius = base_radius - (base_radius * this.speed);
        this.radius = radius_slider.value;

        console.log(radius_slider.value);
        
        if (this.frames < 60) {
           window.requestAnimationFrame(this.draw);
        } else {
            this.draw_next_segment();
        };
    };

    draw_next_segment() {
        if (this.segment_index > this.n_strokes - 1) return null;
        const segment = this.data.segments[this.segment_index];
        this.frames = 0;
        this.acceleration = segment.acceleration;
        this.x_direction = segment.unit_direction[0];
        this.y_direction = segment.unit_direction[1];
        this.radius = this.base_radius - (this.base_radius * this.speed);
        this.segment_length = segment.length;

        window.requestAnimationFrame(this.draw);
        this.segment_index += 1;
    }
}