/**
 * This file contains all event listeners for the
 * proper interaction with all buttons.
*/


import { dataset } from './config.js';
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