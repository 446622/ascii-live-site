let sketch = function(p) {
    let video;
    let ratio = 12;

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
        video = p.createCapture(p.VIDEO);
        video.size(p.windowWidth, p.windowHeight);
        video.hide();
        p.noStroke();
        p.textSize(ratio);  // Puedes necesitar ajustar esto dependiendo del nuevo tamaño
        p.textAlign(p.LEFT, p.TOP);
    };

    p.draw = function() {
        p.background(0);
        p.push();
        p.translate((p.width - video.width) / 2, (p.height - video.height) / 2);  // Esto podría no ser necesario si el video ya llena toda la ventana
        tick();
        p.pop();
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    function inRange(n_, min, max) {
        return (n_ - min) * (n_ - max) <= 0;
    }

    function pick(c_) {
        let chrs = '¶*§@.†ま¶や66•++';
        let b = 25;
        for (let k = 0; k <= 255; k += b) {
            if (inRange(c_, k, k + b)) {
                return chrs[Math.floor(k / (255 / b))];
            }
        }
        return 'A';
    }

    function pickColor(bright) {
        if (bright < 20) {
            return p.color(0);
        } else if (bright >= 30 && bright < 70) {
            return p.color(255);
        } else if (bright >= 70 && bright < 100) {
            return p.color(209, 132, 250);
        } else if (bright >= 70 && bright < 150) {
            return p.color(255);
        } else if (bright >= 70 && bright < 180) {
            return p.color(255);
        } else {
            return p.color(255);
        }
    }

    function tick() {
        video.loadPixels();
        let i = 0;
        for (let y = 0; y < video.height; y++) {
            for (let x = 0; x < video.width; x++) {
                let brightness = (video.pixels[i++] + video.pixels[i++] + video.pixels[i++]) / 3;
                let c = pick(brightness);
                let colores = pickColor(brightness);
                p.fill(colores);
                p.text(c, x * ratio, y * ratio);
                i++;
            }
        }
    }
};

let miP5 = new p5(sketch);
