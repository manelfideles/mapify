/**
 * This file contains all the code
 * necessary to generate the detailed
 * plots that appear upon clicking on
 * any given word.
*/

import { barplotConfig, radarplotConfig } from './config.js';
const { margin, width, height } = barplotConfig;
const { rpMargin, rpWidth, rpHeight } = radarplotConfig;

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

// Radar Plot helper function
function angleToCoordinate(angle, value, radialScale) {
    let x = Math.cos(angle) * radialScale(value);
    let y = Math.sin(angle) * radialScale(value);
    return { "x": 150 + x, "y": 150 - y };
}

function getPathCoordinates(data_point, features) {
    let coordinates = [];
    for (var i = 0; i < features.length; i++) {
        let ft_name = features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
        coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
    }
    return coordinates;
}

function makeRadarplot(data) {
    console.log('Making radar plot ...');
    const radarplot = d3.select('.radar-plot').append('svg')
        .attr("width", 350)
        .attr("height", 300)
        .attr("transform", `translate(25, 0)`);

    let radialScale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, 100])

    let ticks = [0.2, 0.4, 0.6, 0.8, 1];

    ticks.forEach(t =>
        radarplot.append("circle")
            .attr("cx", 200)
            .attr("cy", 200)
            .attr("fill", 'none')
            .attr("stroke", 'black')
            .attr("r", radialScale(t))
            .attr("transform", `translate(${-50}, ${-50})`)
    );

    ticks.forEach(t =>
        radarplot.append("text")
            .attr("x", 200)
            .attr("y", 200 - radialScale(t))
            .attr("transform", `translate(${-45}, ${-52})`)
            .text(t.toString())
    );

    const features = ['danceability', 'energy', 'liveness',];

    for (var i = 0; i < features.length; i++) {
        let ft_name = features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
        let line_coordinate = angleToCoordinate(angle, 1, radialScale);
        let label_coordinate = angleToCoordinate(angle, 1.10, radialScale);

        //draw axis line
        radarplot.append("line")
            .attr("x1", 150)
            .attr("y1", 150)
            .attr("x2", line_coordinate.x)
            .attr("y2", line_coordinate.y)
            .attr("stroke", "black");

        //draw axis label
        if (ft_name == 'danceability') {
            radarplot.append("text")
                .attr("x", label_coordinate.x)
                .attr("y", label_coordinate.y)
                .attr('font-weight', 'bold')
                .text(ft_name)
                .attr("transform", "translate(-45, -10)")
        }
        else if (ft_name == 'energy') {
            radarplot.append("text")
                .attr("x", label_coordinate.x)
                .attr("y", label_coordinate.y)
                .attr('font-weight', 'bold')
                .text(ft_name)
                .attr("transform", "translate(-45, 10)")
        }
        else if (ft_name == 'liveness') {
            radarplot.append("text")
                .attr("x", label_coordinate.x)
                .attr("y", label_coordinate.y)
                .attr('font-weight', 'bold')
                .text(ft_name)
                .attr("transform", "translate(0, 10)")
        }
    }

    // Falta max e min de dnce, nrgy e live
    // para saber o domain
    /* let line = d3.line()
        .x(d => d.x)
        .y(d => d.y); */

    console.log('Done');
    return radarplot;
}

export { makeBarplot, makeRadarplot };
