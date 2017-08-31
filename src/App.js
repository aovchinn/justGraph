import "./registerServiceWorker";
import "./App.css";

function app(props) {
    const model = props.model;
    const graphX = model.svg.padding.left + model.graph.padding.left;
    const graphY = model.svg.padding.top + model.graph.padding.top;
    const navX = model.svg.padding.left + model.nav.padding.left;
    const navY = model.svg.padding.top + model.nav.padding.top +
                model.graph.height + model.graph.padding.top + model.graph.padding.bottom;
    return (
        <svg width={ model.svg.fullWidth } height={ model.svg.fullHeight } id="trend">
            { clipPath(model) }

            <path className="graphLine line" stroke-width={ model.graph.lineWidth } d=""
                transform={ `translate(${ graphX }, ${ graphY + model.graph.lineWidth})` }>
            </path>
            <g className="xAxis" transform={ `translate(
                ${ graphX }, ${ graphY + model.graph.height })` }>
            </g>
            <g className="yAxis" transform={ `translate(
                ${ graphX }, ${ graphY })` }>
            </g>

            <path className="navLine line" stroke-width={ model.nav.lineWidth } d=""
                transform={ `translate(${ navX }, ${ navY + model.nav.lineWidth })` }>
            </path>
            <g className="navXAxis" transform={ `translate(
                ${ navX }, ${ navY + model.nav.height })` }>
            </g>
            <g className="navBrush" transform={ `translate(
                ${ navX }, ${ navY })` }>
            </g>
        </svg>
    );
}

function clipPath(model) {
    return (
        <defs>
            <clipPath id="viewClip">
                <rect x="0" y={ -model.graph.lineWidth}
                    width={ model.svg.width } height={ model.svg.height }>
                </rect>
            </clipPath>
        </defs>
    );
}

export default app;
