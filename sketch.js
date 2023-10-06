let miFuente;
let brilloSlider;
let brilloModificador = .7;



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
        //brilloSlider = p.createSlider(0.1, 3.0, 1.0, 0.1); 
        //brilloSlider.position(10, p.height + 10); // Posición del slider en la ventana
        //brilloSlider.input(actualizarBrillo);
    };
  
  function actualizarBrillo() {
    brilloModificador = brilloSlider.value();
}

    p.draw = function() {
        p.background(0);
        tk();
    };

    function inRange(n_, min, max) {
        return (n_ - min) * (n_ - max) <= 0;
    }

    function pick(c_) {      
        let chrs = '10*1 10/*+';
        let b = 28;
        for (let k = 0; k <= 255; k += b) {
            if (inRange(c_, k, k + b)) {
                return chrs[Math.floor(k / (255 / b))];
            }
        }
        return '|';
    }

    function pickColor(bright) {
        if (bright < 10) {
            return p.color(0);
        } else if (bright >= 30 && bright < 70) {
            return p.color(240, 254, 255);
        } else if (bright >= 70 && bright < 100) {
            return p.color(203, 195, 240);
        } else if (bright >= 70 && bright < 150) {
            return p.color(240, 254, 255);
        } else if (bright >= 70 && bright < 180) {
            return p.color(240, 254, 255);
        } else {
            return p.color(0);
        }
    }

    function tk() {
        video.loadPixels();
        let i = 0;
        for (let y = 0; y < video.height; y++) {
            for (let x = 0; x < video.width; x++) {
                let brightness = ((video.pixels[i++] + video.pixels[i++] + video.pixels[i++]) / 3) * brilloModificador;
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
