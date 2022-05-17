/**
 * This file contains all the code
 * necessary to generate the detailed
 * plots that appear upon clicking on
 * any given word.
*/

import { barplotConfig } from './config.js';
const { margin, width, height } = barplotConfig;

function makeBarplot(data) {
    console.log('Making bar plot...');
    const barplot = d3.select(".bar-plot").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleLinear()
        .domain([0, d3.max(data['top-genres'], (genre) => {
            return d3.max(genre.slice(1))
        })])
        .range([0, width]);
    barplot.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-12,10)rotate(-90)")
        .style("text-anchor", "end");

    const y = d3.scaleBand()
        .domain(data['top-genres'].map(d => d[0]))
        .range([0, height])
        .padding(.1);

    barplot.append("g")
        .call(d3.axisLeft(y))

    barplot.selectAll()
        .data(data['top-genres'])
        .join("rect")
        .attr("x", x(0))
        .attr("y", d => y(d[0]))
        .attr("width", d => x(d[1]))
        .attr("height", y.bandwidth())
        .attr("fill", "#69b3a2")

    console.log('Done!');
    return barplot;
}

function makeRadarplot(data) {
    console.log('Empty function... Come back later :/');
}


export { makeBarplot, makeRadarplot };
