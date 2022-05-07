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
                details.setAttribute('style', 'display: flex');
                details.children[1].innerHTML = event.target.innerHTML
                details.setAttribute('style', `left: ${event.pageX + 25}px; top: ${event.pageY}px`);
                //details.setAttribute('style', `top: ${event.pageY + 100}px`);
            }
        }
    )
}

function handleBackBtnClick(event) {
    const details = document.querySelector('.details');
    if (details.style.display !== 'none')
        details.setAttribute('style', 'display: none');
}

export {
    handleControlPanelClick,
    handleWordClick,
    handleBackBtnClick
};