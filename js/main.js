(() => {
    let yOffset = 0;
    let currentSection = 0;
    let prevScrollHeight = 0;

    const sectionInfo = [
        {
            //section0
            heightScale: 3,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#section-0'),
                loadingObj: document.querySelector('.loading')
            },
            values: {
                loadingObj_move: [1, 0, { start: 0.01, end: 0.03 }]
            }
        },
        {
            //section1
            heightScale: 2,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#section-1')
            }
        },
    ];

    function setLayout() {
        for (let i = 0; i < sectionInfo.length; i++) {
            sectionInfo[i].scrollHeight = sectionInfo[i].heightScale * window.innerHeight;
            sectionInfo[i].objs.container.style.height = `${sectionInfo[i].scrollHeight}px`;
        }
        document.body.setAttribute('id', `show-section-${currentSection}`);
    };


    function calcValue(values, currentYOffset) {
        let rv;
        const scrollHeight = sectionInfo[currentSection].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        if (values.length === 3) {
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            } else if (currentYOffset < partScrollStart) {
                rv = values[0];
            } else if (currentYOffset > partScrollEnd) {
                rv = values[1];
            }
        } else {
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }

        return rv;
    }

    function playAnimation() {
        const objs = sectionInfo[currentSection].objs;
        const values = sectionInfo[currentSection].values;
        const currentYOffset = yOffset - prevScrollHeight;

        switch (currentSection) {
            case 0:
                let loadingObj_move = calcValue(values.loadingObj_move, currentYOffset);
                objs.loadingObj.style.opacity = loadingObj_move;
                console.log(loadingObj_move);
                break;
            case 1:
                break;
        }
    }

    function scrollAction() {
        prevScrollHeight = 0;
        for (let i = 0; i < currentSection; i++) {
            prevScrollHeight += sectionInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sectionInfo[currentSection].scrollHeight) {
            currentSection++;
            document.body.setAttribute('id', `show-section-${currentSection}`);
        }

        if (yOffset < prevScrollHeight) {
            currentSection--;
            document.body.setAttribute('id', `show-section-${currentSection}`);
        }

        playAnimation();

        // console.log(currentSection, prevScrollHeight);
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollAction();
    });
    window.addEventListener('resize', setLayout);
    window.addEventListener('load', setLayout);
})();