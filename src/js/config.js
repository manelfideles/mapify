/**
 * This file contains all global variables and
 * other necessary configurations for the
 * proper functioning of this project. 
*/

// colors
// ADJ, NOUN, VERB
const colors = {
    'ADJ': '#ff7f7f',
    'VERB': '#A0FF7F',
    'NOUN': '#E17FFF',
}

// dataset - replace this by own dataset
// or a fetch from firebase
/* const mockDataset = [
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
] */

async function getFile(filename) {
    let res = await fetch(`../../datasets/${filename}`)
    let data = await res.json();
    console.log(data);
    return data;
}

const dataset = await getFile('total-word-freq.json');

const xMax = dataset['meta']['duration']['max'],
    xMin = dataset['meta']['duration']['min'],
    yMax = dataset['meta']['bpm']['max'],
    yMin = dataset['meta']['bpm']['min'],
    sizeMin = dataset['meta']['count']['min'],
    sizeMax = dataset['meta']['count']['max'];

const xdomain = [xMin, xMax],
    ydomain = [yMin, yMax]

const offset = 10;
const xsize = window.innerWidth - offset * 20;
const ysize = window.innerHeight;

// set the dimensions and margins of the graph
const margin = { top: offset, right: offset, bottom: offset, left: offset },
    width = xsize - margin.left - margin.right,
    height = ysize - margin.top - margin.bottom;

// set scales
const scalex = d3.scaleLinear().domain(xdomain).range([0, width])
const scaley = d3.scaleLinear().domain(ydomain).range([0, height])

const resizeFactor = 50;

const wordcloudConfig = {
    'colors': colors,
    'margin': margin,
    'width': width,
    'height': height,
    'resizeFactor': resizeFactor,
    'scalex': scalex,
    'scaley': scaley,
    'sizeMin': sizeMin,
    'sizeMax': sizeMax
}

const barplotMargin = { top: 20, right: 20, bottom: 50, left: 90 };
const barplotConfig = {
    'margin': barplotMargin,
    'width': 350 - barplotMargin.left - barplotMargin.right,
    'height': 250 - barplotMargin.top - barplotMargin.bottom
}

const radarplotMargin = { top: 20, right: 20, bottom: 20, left: 20 };
const radarplotConfig = {
    rpMargin: radarplotMargin,
    rpWidth: 200 - radarplotMargin.left - radarplotMargin.right,
    rpHeight: 200 - radarplotMargin.top - radarplotMargin.bottom,
    levels: 5,
    maxValue: 1,
    labelFactor: 1.25,
    wrapWidth: 60,
    opacityArea: 0.5,
    dotRadius: 4,
    opacityCircle: 0.1,
    strokeWidth: 2,
    roundStrokes: false,
    color: '#CC333F'
};

export {
    dataset,
    wordcloudConfig,
    barplotConfig,
    radarplotConfig,
    xMax, xMin,
    yMax, yMin,
    getFile, colors
}