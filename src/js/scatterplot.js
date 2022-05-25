import {
    xMax, xMin, yMax, yMin, getFile, wordcloudConfig
} from './config.js';

async function makeScatterplot(year) {

    // open file with year.json
    const dataset = await getFile(`yearly_${year}.json`);

    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 500 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const scatterplot = d3.select(`#year-${year}`)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X axis
    const x = d3.scaleLinear()
        .domain([xMin, xMax])
        .range([0, width]);
    scatterplot.append("g")
        .attr("transform", "translate(0," + height / 2 + ")")
        .call(d3.axisBottom(x).tickFormat((d, i) => []));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([height, 0]);
    scatterplot.append("g")
        .attr("transform", "translate(" + width / 2 + ", 0)")
        .call(d3.axisLeft(y).tickFormat((d, i) => []));

    scatterplot.append('g')
        .selectAll("dot")
        .data(dataset['data'].map(d => {
            return {
                x: d.duration,
                y: d.bpm,
                color: wordcloudConfig['colors'][d.category]
            }
        }))
        .join("circle")
        .attr("cx", d => x(d.x))
        .attr("cy", d => y(d.y))
        .attr("r", 3)
        .style("fill", d => d.color)

    return scatterplot;
}



export { makeScatterplot };