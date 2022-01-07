export const sectionInfo = [
    {
        //section0
        heightScale: 3,
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
            introMyname_opacity: [0, 1, { start: 0.76, end: 1 }],
        }
    },
    {
        //section2
        heightScale: 2,
        objs: {
            container: document.querySelector('#section-2'),
            main: document.querySelector('.main'),
        },
        values: {
            main_move: [100, 27, { start: 0, end: 0.5 }],
        }
    },
];