function handleControlPanelClick(classname) {
    const classArray = document.querySelectorAll(`.${classname}`);
    for (let i = 0; i < classArray.length; i++) {
        const elem = classArray[i];
        elem.addEventListener(
            'click', () => {
                if (elem.classList == 'option') {
                    elem.classList.add('active');
                    i ? classArray[i - 1].classList.remove('active') : classArray[i + 1].classList.remove('active')
                }
                else if (elem.classList == classname) { elem.classList.add('active'); }
                else { elem.classList.remove('active'); }
            }
        )
    }
}

function handleWordClick(classname) {
    const word = document.querySelector(`.${classname}`);
    word.addEventListener(
        'click', () => {
            const details = document.querySelector('.details');
            if (details.style.display == 'flex')
                details.setAttribute('style', 'display: none');
            else details.setAttribute('style', 'display: flex');
        }
    )
}

// colors
const colors = {
    'drugs': '#ff7f7f',
    'sex': '#FFB47F',
    'money': '#FFFF7F',
    'love': '#A0FF7F',
    'movies': '#7FC8FF',
    'food': '#7F7FFF',
    'sports': '#E17FFF',
    'animals': '#FF7FAA',
    'names': '#DCDCDC',
}

// dataset - replace this by own dataset
// or a fetch from firebase
const dataset = [
    { word: "hello", count: 1, duration: 120, bpm: 81, category: 'drugs' },
    { word: "a", count: 1, duration: 130, bpm: 82, category: 'love' },
    { word: "lovely", count: 1, duration: 140, bpm: 85, category: 'sports' },
    { word: "i", count: 1, duration: 120, bpm: 80, category: 'movies' },
    { word: "love", count: 3, duration: 125, bpm: 99, category: 'food' },
    { word: "the", count: 1, duration: 150, bpm: 75, category: 'money' },
    { word: "work", count: 2, duration: 89, bpm: 66, category: 'animals' },
    { word: "make", count: 1, duration: 88, bpm: 79, category: 'love' },
    { word: "war", count: 1, duration: 72, bpm: 92, category: 'sports' },
    { word: "surfing", count: 2, duration: 124, bpm: 100, category: 'movies' },
    { word: "r", count: 4, duration: 100, bpm: 122, category: 'food' },
    { word: "data-viz", count: 2, duration: 96, bpm: 110, category: 'sex' },
    { word: "python", count: 2, duration: 190, bpm: 97, category: 'sex' },
    { word: "linux", count: 2, duration: 175, bpm: 112, category: 'names' },
    { word: "programming", count: 3, duration: 160, bpm: 85, category: 'names' },
    { word: "graph", count: 1, duration: 134, bpm: 101, category: 'animals' },
]

// replace this by info from dataset
const xdomain = [
    dataset.reduce((prev, curr) => prev.duration < curr.duration ? prev : curr).duration,
    dataset.reduce((prev, curr) => prev.duration > curr.duration ? prev : curr).duration
]

const ydomain = [
    dataset.reduce((prev, curr) => prev.bpm < curr.bpm ? prev : curr).bpm,
    dataset.reduce((prev, curr) => prev.bpm > curr.bpm ? prev : curr).bpm
]

const xsize = 450;
const ysize = 450;
const offset = 50;

// set the dimensions and margins of the graph
const margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = xsize - margin.left - margin.right,
    height = ysize - margin.top - margin.bottom;

const scalex = d3.scaleLinear().domain(xdomain).range([-150, 150])
const scaley = d3.scaleLinear().domain(ydomain).range([-150, 150])

// append the svg object to the wordcloud-viz object
var svg = d3.select('.wordcloud-viz').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var layout = d3.layout.cloud()
    .size([width, height])
    .words(dataset.map(d => {
        return {
            text: d.word,
            size: d.count * 10,
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
        .attr("text-anchor", "middle")
        .attr("transform", (d) => { return "translate(" + [scalex(d.xpos), scaley(d.ypos)] + ")"; })
        .text(d => d.text);
}

window.addEventListener('load', () => handleControlPanelClick('category'));
window.addEventListener('load', () => handleControlPanelClick('option'));
//window.addEventListener('load', () => handleWordClick('wordcloud'));
window.addEventListener('load', () => handleWordClick('back-btn'));

