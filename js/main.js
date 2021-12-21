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
                wave_move: [100, -50, { start: 0, end: 0.2 }],
                wave2_move: [115, -35, { start: 0, end: 0.2 }],
                //to programar
                secondMessage_opacity: [0, 1, { start: 0.15, end: 0.24 }],
                secondMessage_opacity_out: [1, 0, { start: 0.4, end: 0.5 }],
                //introduce
                introHello_opacity: [0, 1, { start: 0.52, end: 0.6 }],
                introJeongdabin_visible: [0, 1, { start: 0.6, end: 0.6 }],
                introMyname_opacity: [0, 1, { start: 0.76, end: 1 }],
            }
        },
        {
            //section2
            heightScale: 2,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#section-2'),
                main: document.querySelector('.main'),
            },
            values: {
                main_move: [100, 27, { start: 0, end: 0.5 }],
            }
        },
        // {
        //     //section3
        //     heightScale: 2,
        //     scrollHeight: 0,
        //     objs: {
        //         container: document.querySelector('#section-3'),
        //     }
        // }
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
        const CONTAINER = document.querySelector('.container');

        console.log(scrollRatio);

        switch (currentSection) {
            case 0:
                //background color
                CONTAINER.style.backgroundColor = 'white';

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
                if (scrollRatio <= 0.2) {
                    objs.wave.style.opacity = 1;
                    objs.wave2.style.opacity = 1;
                    let wave_move = calcValue(values.wave_move, currentYOffset);
                    let wave_move2 = calcValue(values.wave2_move, currentYOffset);
                    objs.wave.style.top = `${wave_move}%`;
                    objs.wave2.style.top = `${wave_move2}%`;
                    //background color
                    CONTAINER.style.backgroundColor = 'white';
                    objs.container.style.backgroundColor = 'white';
                } else {
                    objs.wave.style.opacity = 0;
                    objs.wave2.style.opacity = 0;
                    //Change background color
                    CONTAINER.style.backgroundColor = '#0540f2';
                    objs.container.style.backgroundColor = '#0540f2';
                }

                //second message
                if (scrollRatio <= 0.4) {
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
                if (scrollRatio < 0.6) {
                    objs.introJeongdabin.innerText = '';
                } else if (scrollRatio < 0.62) {
                    objs.introJeongdabin.innerText = 'ㅈ';
                } else if (scrollRatio < 0.64) {
                    objs.introJeongdabin.innerText = '저';
                } else if (scrollRatio < 0.66) {
                    objs.introJeongdabin.innerText = '정';
                } else if (scrollRatio < 0.68) {
                    objs.introJeongdabin.innerText = '정ㄷ';
                } else if (scrollRatio < 0.7) {
                    objs.introJeongdabin.innerText = '정다';
                } else if (scrollRatio < 0.72) {
                    objs.introJeongdabin.innerText = '정답';
                } else if (scrollRatio < 0.74) {
                    objs.introJeongdabin.innerText = '정다비';
                } else if (scrollRatio < 0.76) {
                    objs.introJeongdabin.innerText = '정다빈';
                } else {
                    objs.introJeongdabin.innerText = '정다빈';
                }

                //입니다. 
                let introMyname_opacity = calcValue(values.introMyname_opacity, currentYOffset);
                objs.introMyname.style.opacity = introMyname_opacity;

                break;
            case 2:

                let main_move = calcValue(values.main_move, currentYOffset);
                objs.main.style.opacity = 1;
                objs.main.style.top = `${main_move}vh`;
                break;
            // case 3:
            //     break;
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
            if (currentSection === 2) return;
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