import { render } from "inferno";
import * as d3 from "d3";
import App from "./App";
import db from "./db";
import model from "./model";
import "./index.css";

render(<App model={ model }/>, document.getElementById("app"));
addGraph();
addNavigation();
getFuncData("sin", 0, 2, 10).then(e => console.log("sin ", e));
getFuncData("cos", 0, 2, 10).then(e => console.log("cos ", e));

function getFuncData(name, start, end, pointsCount) {
    const req = new Request("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, start, end, pointsCount })
    });
    return fetch(req)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`status code ${ res.status } ${ res.statusText }`);
            }}
        ).catch(err => ` something went wrong while fetching \n ${ err }`);
}

function addSin() {
    getFuncData("sin", 0, 2, 10).then(data => {
        const { xMax, xMin } = data.values.reduce((res, el) => {
            // el > res.xMax ? res.xMax
        }, { xMax: Number.NEGATIVE_INFINITY, xMin: Number.POSITIVE_INFINITY });
        // const yMax = data.values.reduce((max, el) => max < el.y ? el.y : max, 0);

    });

}

function addGraph() {
    const { xAxis, yAxis } = getAxis();
    d3.select(".xAxis").call(xAxis);
    d3.select(".yAxis").call(yAxis);
    const line = getGraphLine();
    d3.select(".graphLine").attr("d", line(db));
}

function getAxis() {
    const { xScale, yScale } = getScales();
    const xAxis = d3.axisBottom(xScale).ticks(10, "%d%b");
    const yAxis = d3.axisLeft(yScale);
    return { xAxis, yAxis };
}

function getScales() {
    const { xDomain, yDomain } = getDomains();
    const xScale = d3.scaleTime()
        .domain(xDomain)
        .range([0, model.svg.width]);
    const yScale = d3.scaleLinear()
        .domain(yDomain)
        .range([0, model.graph.height - model.graph.lineWidth]);
    return { xScale, yScale };
}

function getDomains() {
    const yMax = db.reduce((max, el) => max < el.value ? el.value : max, 0);
    const yMin = db[0].value;
    const xMax = new Date(db[db.length - 1].t);
    const xMin = new Date(db[0].t);
    const xDomain = [xMin, xMax];
    const yDomain = [yMax, yMin];
    return { xDomain, yDomain };
}

function getGraphLine() {
    const { xScale, yScale } = getScales();
    return d3.line()
        .x(d => xScale(new Date(d.t)))
        .y(d => yScale(d.value));
}

function addNavigation() {
    const { xAxis } = getAxis();
    d3.select(".navXAxis").call(xAxis);
    const line = getNavLine();
    d3.select(".navLine").attr("d", line(db));
    addNavBrush();
}

function getNavLine() {
    const { xScale } = getScales();
    const { yDomain } = getDomains();
    const navYScale = d3.scaleLinear()
        .domain(yDomain)
        .range([0, model.nav.height - model.nav.lineWidth]);
    return d3.line()
        .x(d => xScale(new Date(d.t)))
        .y(d => navYScale(d.value));
}

function addNavBrush() {
    const brush = d3.brushX()
        .extent([[0, 0], [model.nav.width, model.nav.height]])
        .on("brush", brushed);
    d3.select(".navBrush").call(brush);
}

function brushed() {
    const { xScale, yScale } = getScales();
    const { xAxis } = getAxis();
    const selection = d3.event.selection;
    if (!selection) {
        console.error("shiiiii");
    }
    const newDomain = selection.map(xScale.invert);
    const newXScale = d3.scaleTime() //TODO
        .domain(newDomain)
        .range(xScale.range());
    const newline = d3.line()
        .x(d => newXScale(new Date(d.t)))
        .y(d => yScale(d.value));

    const dateDiff = Math.abs(newDomain[0] - newDomain[1]);
    const oneDay = 8.64e+7;
    let tickFormat = "%d %b";
    if (dateDiff < oneDay) {
        tickFormat = "%H:%M";
    }
    xAxis.scale(newXScale).ticks(10, tickFormat);

    d3.select(".xAxis").call(xAxis);
    d3.select(".graphLine").attr("d", newline(db));
}
