(() => {
    let yOffset = 0;
    let currentSection = 0;
    let prevScrollHeight = 0;
    let enterNewSection = false;

    const sectionInfo = [
        {
            //section0
            heightScale: 3,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#section-0'),
                loadingObj: document.querySelector('.loading'),
                hangulSet: document.querySelector('.hangul-set'),
                firstMessage: document.querySelector('.first-message'),
            },
            values: {
                loadingObj_move: [50, -20, { start: 0, end: 0.5 }],
                loadingObj_opacity: [1, 0, { start: 0, end: 0.5 }],
                hangulSet_move: [120, 50, { start: 0, end: 0.5 }],
                hangulSet_opacity: [0, 1, { start: 0, end: 0.5 }],
                firstMessage_opacity: [0, 1, { start: 0.5, end: 0.7 }],
                container_opacity: [1, 0, { start: 0.9, end: 1 }],
            }
        },
        {
            //section1
            heightScale: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#section-1'),
                wave: document.querySelector('.wave'),
                wave2: document.querySelector('.wave2'),
                secondMessage: document.querySelector('.second-message'),
                //introduce
                introduce: document.querySelector('.introduce'),
                introHello: document.querySelector('#hello'),
                introJeongdabin: document.querySelector('#jeongdabin'),
                introMyname: document.querySelector('#my-name'),
            },
            values: {
                //wave
                wave_move: [100, -50, { start: 0, end: 0.1 }],
                wave2_move: [115, -35, { start: 0, end: 0.1 }],
                //to programar
                secondMessage_opacity: [0, 1, { start: 0.08, end: 0.13 }],
                secondMessage_opacity_out: [1, 0, { start: 0.2, end: 0.25 }],
                //introduce
                introHello_opacity: [0, 1, { start: 0.26, end: 0.3 }],
                introJeongdabin_visible: [0, 1, { start: 0.3, end: 0.31 }],
                introMyname_opacity: [0, 1, { start: 0.4, end: 0.43 }],
            }
        },
        {
            //section2
            heightScale: 2,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#section-2'),
            },
        }
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
        const scrollHeight = sectionInfo[currentSection].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        switch (currentSection) {
            case 0:
                //Loading Object
                let loadingObj_move = calcValue(values.loadingObj_move, currentYOffset);
                let loadingObj_opacity = calcValue(values.loadingObj_opacity, currentYOffset);
                objs.loadingObj.style.left = `${loadingObj_move}%`;
                objs.loadingObj.style.opacity = loadingObj_opacity;

                //hangul Object
                let hangulSet_move = calcValue(values.hangulSet_move, currentYOffset);
                let hangulSet_opacity = calcValue(values.hangulSet_opacity, currentYOffset);
                objs.hangulSet.style.left = `${hangulSet_move}%`;
                objs.hangulSet.style.opacity = hangulSet_opacity;

                //First Messsage
                let firstMessage_opacity = calcValue(values.firstMessage_opacity, currentYOffset);
                objs.firstMessage.style.opacity = firstMessage_opacity;

                //section fade-out
                let container_opacity = calcValue(values.container_opacity, currentYOffset);
                objs.container.style.opacity = container_opacity;

                break;

            case 1:
                //wave1,2
                let wave_move = calcValue(values.wave_move, currentYOffset);
                let wave_move2 = calcValue(values.wave2_move, currentYOffset);
                objs.wave.style.top = `${wave_move}%`;
                objs.wave2.style.top = `${wave_move2}%`;

                //second message
                if (scrollRatio <= 0.2) {
                    let secondMessage_opacity = calcValue(values.secondMessage_opacity, currentYOffset);
                    objs.secondMessage.style.opacity = secondMessage_opacity;
                } else {
                    let secondMessage_opacity_out = calcValue(values.secondMessage_opacity_out, currentYOffset);
                    objs.secondMessage.style.opacity = secondMessage_opacity_out;
                }

                //introduce
                objs.introduce.style.opacity = 1;
                //안녕하세요. 
                let introHello_opacity = calcValue(values.introHello_opacity, currentYOffset);
                objs.introHello.style.opacity = introHello_opacity;
                //정다빈
                let introJeongdabin_visible = calcValue(values.introJeongdabin_visible, currentYOffset);
                objs.introJeongdabin.style.opacity = introJeongdabin_visible;
                //입니다. 
                let introMyname_opacity = calcValue(values.introMyname_opacity, currentYOffset);
                objs.introMyname.style.opacity = introMyname_opacity;



                break;
            case 2:
                break;
        }
    }

    function scrollAction() {
        enterNewSection = false;
        prevScrollHeight = 0;
        for (let i = 0; i < currentSection; i++) {
            prevScrollHeight += sectionInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sectionInfo[currentSection].scrollHeight) {
            enterNewSection = true;
            currentSection++;
            document.body.setAttribute('id', `show-section-${currentSection}`);
        }

        if (yOffset < prevScrollHeight) {
            enterNewSection = true;
            if (currentSection === 0) return;
            currentSection--;
            document.body.setAttribute('id', `show-section-${currentSection}`);
        }

        if (enterNewSection) return;

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