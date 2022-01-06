import React, { useState, useEffect } from 'react';
import '../css/default.css';
import '../css/style.css';
import { useScroll } from '../hooks/useScroll';
import { useSetLayout } from '../hooks/useSetLayout';
import { sectionInfo } from '../component/sectionInfo';

const Home = () => {

    const [currentSection, setCurrentSection] = useState(0);
    const [prevScrollHeight, setPrevScrollHeight] = useState(0);
    const [currentYOffset, setCurrentYOffset] = useState(0);

    const yOffset = useScroll();
    console.log(yOffset);
    const sectionValue = useSetLayout();
    console.log(`currentSection ${currentSection}`);

    //현재 Section 계산
    const currentSectionCalc = () => {

        if (yOffset > prevScrollHeight + sectionValue[currentSection].height) {
            setCurrentSection(currentSection + 1);
        };

        if (yOffset < prevScrollHeight) {
            if (currentSection === 0) return;
            setCurrentSection(currentSection - 1);
        }
    };

    const calcValue = (values) => {
        let rv;

        const scrollHeight = sectionValue[currentSection].height;
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

    };

    //스크롤 할 때마다 이전 값 계산
    useEffect(() => {
        currentSectionCalc();
        setCurrentYOffset(yOffset - prevScrollHeight);
        console.log(`prevScrollHeight ${prevScrollHeight}`);
    }, [yOffset]);

    useEffect(() => {
        let sumPrevScrollHeight = 0;
        for (let i = 0; i < currentSection; i++) {
            sumPrevScrollHeight = sumPrevScrollHeight + sectionValue[i].height;
        }
        setPrevScrollHeight(sumPrevScrollHeight);
    }, [currentSection]);

    return (
        <>
            <body id={`show-section-${currentSection}`} style={{ backgroundColor: (currentSection === 0 && 1) ? 'white' : '#0540f2' }}>
                <div className="container">
                    <section className="section" id="section-0" style={{ height: sectionValue[0].height, backgroundColor: `white`, opacity: calcValue(sectionInfo[0].values.container_opacity) }}>
                        <div className="loading" style={{ left: calcValue(sectionInfo[0].values.loadingObj_move) + '%', opacity: calcValue(sectionInfo[0].values.loadingObj_opacity) }}>
                            <p>
                                로딩 완료<br />
                                <span id="loading_2">스크롤을 내려 주세요</span>
                            </p>
                        </div>
                        <div className="move-elem hangul-set" style={{ left: calcValue(sectionInfo[0].values.hangulSet_move) + '%', opacity: calcValue(sectionInfo[0].values.hangulSet_opacity) }}>
                            <div className="hangul-giyeok">
                                <p>ㄱ</p>
                            </div>
                            <div className="hangul-nien">
                                <p>ㄴ</p>
                            </div>
                            <div className="hangul-digut">
                                <p>ㄷ</p>
                            </div>
                        </div>
                        <div className="opa-elem first-message" style={{ opacity: calcValue(sectionInfo[0].values.firstMessage_opacity) }}>
                            <p>한국어 선생님에서</p>
                        </div>
                        <div className="opa-elem pls-scroll">
                            <div className="arrow"></div>
                            <div className="pls-scroll_message">
                                <p>아래로 내리세요</p>
                            </div>
                        </div>
                    </section>
                    <section className="section" id="section-1" style={{ height: sectionValue[1].height, backgroundColor: 'white' }}>
                        <div className="wave" style={{ top: calcValue(sectionInfo[1].values.wave_move) + '%' }}></div>
                        <div className="wave2" style={{ top: calcValue(sectionInfo[1].values.wave2_move) + '%' }}></div>
                        <div className="opa-elem second-message">
                            <p>🖥 프로그래머로</p>
                        </div>
                        <div className="opa-elem introduce">
                            <p id="hello">안녕하세요!</p>
                            <p><span id="jeongdabin">정다빈</span><span id="my-name">입니다.</span></p>
                        </div>
                    </section>
                    <section className="section" id="section-2" style={{ height: sectionValue[2].height }}>
                        <div className="introduce-section2">
                            <p id="hello">안녕하세요!</p>
                            <p><span id="jeongdabin">정다빈</span><span id="my-name">입니다.</span></p>
                        </div>

                        <div className="move-elem main">
                            <div className="main-title skill">
                                <p>🛠 기술</p>
                            </div>
                            <div className="main-content skill">
                                <li>
                                    <ul>HTML</ul>
                                    <ul>CSS</ul>
                                    <ul>JAVASCRIPT</ul>
                                    <ul>REACT</ul>
                                    <ul>REDUX</ul>
                                    <ul>REDUX SAGA</ul>
                                </li>
                            </div>
                            <div className="main-title project">
                                <a href="./portfolio.html">
                                    <p>📑 작업 목록</p>
                                </a>
                            </div>
                            <div className="main-content project">
                                <li>
                                    <ul>
                                        <div className="main-content_top">CLASS WORK</div>
                                        <div className="main-content_bottom">pls insert IMAGE</div>
                                    </ul>
                                </li>
                            </div>
                            <div className="main-title contact">
                                <p>📨 연락처</p>
                            </div>
                            <div className="main-content contact">
                                <li>
                                    <ul>e-mail: 41@b41.kr</ul>
                                    <ul><a href="http://github.com/b41-41" target="_blank" title>github: http://github.com/b41-41</a></ul>
                                </li>
                            </div>
                        </div>
                    </section>
                </div>
            </body >
        </>
    );
}

export default Home;