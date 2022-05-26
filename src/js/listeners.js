/**
 * This file contains all event listeners for the
 * proper interaction with all buttons.
*/


import { dataset, colors } from './config.js';
import { makeBarplot, makeRadarplot, moodScore } from './details.js';

function handleControlPanelClick(classname) {
    const classArray = document.querySelectorAll(`.${classname}`);
    for (let i = 0; i < classArray.length; i++) {
        const elem = classArray[i];
        elem.addEventListener(
            'click', () => {
                if (elem.classList == 'option') {
                    elem.classList.add('active');
                    i ? classArray[i - 1].classList.remove('active') : classArray[i + 1].classList.remove('active');
                    const wordcloudViz = document.querySelector('.wordcloud-viz')
                    const smallMultiples = document.querySelector('.small-multiples-container')
                    if (elem.innerHTML == 'wordcloud') {
                        wordcloudViz.setAttribute('style', 'display: flex');
                        smallMultiples.setAttribute('style', 'display: none');
                    }
                    else {
                        wordcloudViz.setAttribute('style', 'display: none');
                        smallMultiples.setAttribute('style', 'display: grid');
                    }
                }
                else if (elem.classList == classname) {
                    elem.classList.contains('active-2') ?
                        elem.classList.add('active') :
                        elem.classList.add('active-2');
                    d3.selectAll(`${colors[elem.children[1].innerHTML]}`)
                        .raise()
                        .style("opacity", 0);
                }
                else {
                    elem.classList.contains('active-2') ?
                        elem.classList.remove('active-2') :
                        elem.classList.remove('active');
                    d3.selectAll(`${colors[elem.children[1].innerHTML]}`)
                        .style("opacity", 1)
                        .attr("pointer-events", 'none')
                }
            }
        )
    }
}

function handleWordClick(classname) {
    const word = document.querySelector(`.${classname}`);
    word.addEventListener(
        'click', (event) => {
            const details = document.querySelector('.details');
            if (details.style.display == 'none') {
                const clickedWord = event.target.innerHTML;
                details.setAttribute('style', 'display: flex');
                details.children[1].innerHTML = clickedWord;
                details.setAttribute('style', `left: ${event.pageX + 25}px; top: ${event.pageY}px`);

                // display detail plots
                const wordData = dataset['data'].find(el => el['word'] == clickedWord)['word-details'];
                makeBarplot(wordData);
                makeRadarplot(wordData);
                moodScore(wordData['valence'])
            }
        }
    )
}

function handleBackBtnClick(event) {
    const details = document.querySelector('.details');
    if (details.style.display !== 'none') {
        details.setAttribute('style', 'display: none');
        d3.select('.bar-plot').selectAll('svg').remove();
        d3.select('.radar-plot').selectAll('svg').remove();
    }
}

export {
    handleControlPanelClick,
    handleWordClick,
    handleBackBtnClick
};