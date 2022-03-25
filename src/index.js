function handleClick(classname) {
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

window.addEventListener('load', () => handleClick('category'));
window.addEventListener('load', () => handleClick('option'));
