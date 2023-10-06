let miFuente;

let sketch = function(p) {
    let video;
    let ratio = 12;

    p.preload = function() {
        miFuente = p.loadFont('https://446622.github.io/ascii-live-site/fonts/PPNeueMachina-InktrapRegular.ttf');
    }

    p.setup = function() {
        video = p.createCapture(p.VIDEO);
        p.createCanvas(p.windowWidth, p.windowHeight);
        video.size(p.width / ratio, p.height / ratio);
        video.hide();
        p.noStroke();
        p.fill(200);
        p.textFont(miFuente);
        p.textSize(ratio);
        p.textAlign(p.LEFT, p.TOP);
    };

    p.draw = function() {
        p.background(0);
        tk();
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

    function tk() {
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

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
};

let miP5 = new p5(sketch);
