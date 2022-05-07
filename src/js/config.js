/*
 * This file contains all global variables and
 * other necessary configurations for the
 * proper functioning of this project. 
 */

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
    return data;
}

const dataset = await getFile('total-word-freq.json');

// calculates min and max values of bpm and duration
// can be replaced with metadata from dataset
const xMax = dataset['meta']['duration']['max'],
    xMin = dataset['meta']['duration']['min'],
    yMax = dataset['meta']['bpm']['max'],
    yMin = dataset['meta']['bpm']['min'];

const xdomain = [xMin, xMax],
    ydomain = [yMin, yMax]

const xsize = window.innerWidth - 100;
const ysize = window.innerHeight;
const offset = 10;

// set the dimensions and margins of the graph
const margin = { top: offset, right: offset, bottom: offset, left: offset },
    width = xsize - margin.left - margin.right,
    height = ysize - margin.top - margin.bottom;

// set scales
const scalex = d3.scaleLinear().domain(xdomain).range([0, width])
const scaley = d3.scaleLinear().domain(ydomain).range([0, height])

const resizeFactor = 346;

export {
    colors, dataset, margin,
    width, height, resizeFactor,
    scalex, scaley
}