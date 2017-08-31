
const graph = {
    height: 550,
    width: 750,
    lineWidth: 2,
    padding: {
        top: 15,
        right: 0,
        bottom: 0,
        left: 0
    }
};

const nav = {
    height: 100,
    width: 750,
    lineWidth: 2,
    padding: {
        top: 25,
        right: 0,
        bottom: 25,
        left: 0
    }
};

const svg = {
    height: nav.height + nav.padding.top + nav.padding.bottom +
        graph.height + graph.padding.top + graph.padding.bottom,
    width: 750,
    padding: {
        top: 5,
        right: 5,
        bottom: 5,
        left: 30
    }
};
svg.fullHeight = svg.height + svg.padding.top + svg.padding.bottom;
svg.fullWidth = svg.width + Math.max(svg.padding.left, nav.padding.left) +
            Math.max(svg.padding.right, nav.padding.right) +
            svg.padding.left + svg.padding.right;

const data = { graph, nav, svg };
export default data;
