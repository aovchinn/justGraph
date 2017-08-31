const express = require("express");
const router = express.Router();
const curves = require("../helpers/curves.js");

// router.get("/", function(req, res, next) {
//     res.send("respond with a resource");
// });

router.post("/", function(req, res, next) {
    const { name, start, end, pointsCount } = req.body;
    if (curves[name]) {
        //TODO: validate [start end]
        const curve = curves[name];
        const step = (end - start) / pointsCount;
        const values = new Array(pointsCount + 1)
            .fill({ x: start, y: 0 })
            .map((el, i) => {
                const x = el.x + step * i;
                const y = curve.f(x);
                return { x, y };
            });
        res.json({
            lineWidth: curve.lineWidth,
            lineColor: curve.lineColor,
            values
        });
    } else {
        res.status(404).send(`function ${ name } not found`);
    }
});

module.exports = router;
