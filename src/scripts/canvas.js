import { ContextReplacementPlugin } from "webpack";

export function drawLines() {
    const width = 800;
    const height = 800;

    d3.select('#canvas-wrapper')
                .append('canvas')
                .attr('width', width)
                .attr('height', height);


    const fake_data = {"location": [0.7790576815605164, 0.8038459420204163], "speed": 0.6994943618774414, "segments": [{"unit_direction": [-0.5909150212968481, -0.8067338083939123], "acceleration": 2.006181240081787}, {"unit_direction": [-0.09681983052710683, -0.995301924250477], "acceleration": 0.10519944876432419}, {"unit_direction": [0.15830214170632842, -0.9873907189816955], "acceleration": 3.4462060928344727}, {"unit_direction": [0.40230191210253297, -0.915507057055622], "acceleration": 0.9929629564285278}, {"unit_direction": [-0.3419235874601496, -0.9397277586292646], "acceleration": -0.2921994924545288}, {"unit_direction": [-0.8555275553476055, -0.5177572810120104], "acceleration": 0.19828030467033386}, {"unit_direction": [-0.9982248895882652, 0.059557281725208376], "acceleration": -2.566174030303955}, {"unit_direction": [-0.8960770627111962, -0.4438985218300178], "acceleration": -4.108924865722656}, {"unit_direction": [-0.842557329535969, -0.5386066713708777], "acceleration": -2.0288236141204834}, {"unit_direction": [-0.999585688290155, -0.02878283803757122], "acceleration": 0.9632022976875305}, {"unit_direction": [0.3000947072888601, 0.9539094121860908], "acceleration": -2.6192703247070312}, {"unit_direction": [0.387011299014544, 0.9220749722419946], "acceleration": 1.185076355934143}]};

    var context = canvas.node().getContext('2d');
    const [start_x, start_y] = fake_data.location;

    var pen_ball = {
        x: width * start_x,
        y: height * start_y,
        speed: fake_data.speed,
        x_direction: fake_data.segments[0].unit_direction[0],
        y_direction: fake_data.segments[0].unit_direction[1],
        acceleration: fake_data.segments[0].acceleration,
        radius: 4 / this.speed,
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
        pen_ball.x += pen_ball.x_direction * pen_ball.speed;
        pen_ball.y += pen_ball.y_direction * pen_ball.speed;
        pen_ball.speed *= pen_ball.acceleration;
    };

    window.requestAnimationFrame(draw);
}
