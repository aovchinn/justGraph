const lineWidth = 2;
const lineColor = "cyan";

const curves = {
    sin: { f: sin, lineColor, lineWidth },
    cos: { f: cos, lineColor, lineWidth },
};

function sin(x) {
    return Math.sin(x);
};

function cos(x) {
    return Math.cos(x);
};

module.exports = curves;
