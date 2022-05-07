import {
    colors, dataset, margin,
    width, height, resizeFactor,
    scalex, scaley
} from './config.js';

import {
    handleControlPanelClick,
    handleWordClick,
    handleBackBtnClick
} from './listeners.js';


// append the svg object to the wordcloud-viz object
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
    .padding(25)
    .fontSize(d => d.size)
    .on("end", draw);
layout.start();

function draw(words) {
    svg
        .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", d => d.size)
        .style("fill", d => d.color)
        .style('cursor', 'pointer')
        .on('mouseover', (event, d) => {
            d3.select(event.target).style('font-weight', 'bold');
            d3.select(event.target).style('stroke', 'black');
        })
        .on('mouseout', (event, d) => {
            d3.select(event.target).style('font-weight', 'normal');
            d3.select(event.target).style('stroke', 'none');
        })
        .attr("text-anchor", "middle")
        .attr("transform", (d) => {
            return "translate(" + [
                scalex(d.xpos) - width / 2,
                scaley(d.ypos) - height / 2.5
            ] + ")";
        })
        .text(d => d.text);
}

window.addEventListener('load', () => handleControlPanelClick('category'));
window.addEventListener('load', () => handleControlPanelClick('option'));
window.addEventListener('load', () => handleWordClick('wordcloud-viz'));
document.querySelector('.back-btn').addEventListener('click', handleBackBtnClick);
