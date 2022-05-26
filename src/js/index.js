import {
    dataset, wordcloudConfig
} from './config.js';

import {
    handleControlPanelClick,
    handleWordClick,
    handleBackBtnClick
} from './listeners.js';

import { makeScatterplot } from './scatterplot.js';

const {
    colors, margin, width,
    height, resizeFactor,
    scalex, scaley, sizeMin, sizeMax
} = wordcloudConfig;


// Small multiples
for (let i = 2010; i <= 2019; i++)
    makeScatterplot(i.toString())

// Wordcloud
var svg = d3.select('.wordcloud-viz').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var layout = d3.layout.cloud()
    .size([width, height])
    .words(dataset.data.map(d => {
        return {
            text: d.word,
            size: d.count,
            xpos: d.duration,
            ypos: d.bpm,
            color: colors[d.category]
        };
    }))
    .padding(85)
    .fontSize(d => {
        let sizeScale = d3.scaleSqrt()
            .domain([sizeMin, sizeMax])
            .range([8, 150]);
        return sizeScale(d.size);
    })
    .on("end", draw);
layout.start();

/* var fisheye = d3.fisheye.circular()
    .radius(300)
    .distortion(5); */

function draw(words) {
    svg
        .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style('font-size', d => d.size)
        .style('fill', d => d.color)
        .style('cursor', 'pointer')
        .on('mouseover', (event, d) => {
            d3.select(event.target).style('font-weight', 'bold');
            d3.select(event.target).style('stroke', 'black');
        })
        .on('mouseout', (event, d) => {
            d3.select(event.target).style('font-weight', 'normal');
            d3.select(event.target).style('stroke', 'none');
        })
        /* .on('mousemove', (e, d) => {
            fisheye.focus(d3.pointer(e)); // Não faz nada :(
            console.log(d);
        }) */
        .attr("text-anchor", "middle")
        .attr('id', d => d.color.substring(1))
        .attr("transform", d => {
            return "translate(" + [
                scalex(d.xpos) - width / 2,
                scaley(d.ypos) - height / 2.5
            ] + ")";
        })
        .text(d => d.text);
}

// Enable zoom+panning
/* 
svg.call(d3.zoom()
    .extent([[0, 0], [width, height]])
    .scaleExtent([1, 15])
    .on("zoom", ({ transform }) => svg.attr('transform', transform)));
 */

// Também não faz nada :(
// svg.on("mousemove", e => { fisheye.focus(d3.pointer(e)); });
/* svg.on("mousemove", function (e) {
    fisheye.focus(d3.pointer(e));

    node.each(function (d) { d.fisheye = fisheye(d); })
        .attr("cx", function (d) { return d.fisheye.x; })
        .attr("cy", function (d) { return d.fisheye.y; })
        .attr("r", function (d) { return d.fisheye.z * 4.5; });

    link.attr("x1", function (d) { return d.source.fisheye.x; })
        .attr("y1", function (d) { return d.source.fisheye.y; })
        .attr("x2", function (d) { return d.target.fisheye.x; })
        .attr("y2", function (d) { return d.target.fisheye.y; });
}); */


/*

// set the dimensions and margins of the graph
const m = { top: 10, right: 30, bottom: 30, left: 60 },
    w = 460 - m.left - m.right,
    h = 250 - m.top - m.bottom;

// append the svg object to the body of the page
const scatterplot = d3.select("#year-2010")
    .append("svg")
    .attr("width", w + m.left + m.right)
    .attr("height", h + m.top + m.bottom)
    .append("g")
    .attr("transform",
        `translate(${m.left}, ${m.top})`);

//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv").then(function (data) {

    // Add X axis
    const x = d3.scaleLinear()
        .domain([4, 8])
        .range([0, w]);
    scatterplot.append("g")
        .attr("transform", "translate(0," + h / 2 + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 9])
        .range([h, 0]);
    scatterplot.append("g")
        .attr("transform", "translate(" + w / 2 + ", 0)")
        .call(d3.axisLeft(y));

    // Color scale: give me a specie name, I return a color
    const color = d3.scaleOrdinal()
        .domain(["setosa", "versicolor", "virginica"])
        .range(["#440154ff", "#21908dff", "#fde725ff"])

    // Add dots
    scatterplot.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x(d.Sepal_Length); })
        .attr("cy", function (d) { return y(d.Petal_Length); })
        .attr("r", 5)
        .style("fill", function (d) { return color(d.Species) })

})

*/


window.addEventListener('load', () => { handleControlPanelClick('category'); console.log('Loaded category control panel click listener!'); });
window.addEventListener('load', () => { handleControlPanelClick('option'); console.log('Loaded option control panel click listener!'); });
window.addEventListener('load', () => { handleWordClick('wordcloud-viz'); console.log('Loaded word click listener!'); });
document.querySelector('.back-btn').addEventListener('click', handleBackBtnClick);
