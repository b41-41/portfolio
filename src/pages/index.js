import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/default.css';
import '../css/style.css';
import { useScroll } from '../hooks/useScroll';
import { useSetLayout } from '../hooks/useSetLayout';
import { sectionInfo } from '../component/sectionInfo';
import ProjectListMini from '../component/ProjectListMini';

const Home = () => {

    const [currentSection, setCurrentSection] = useState(0);
    const [prevScrollHeight, setPrevScrollHeight] = useState(0);
    const [currentYOffset, setCurrentYOffset] = useState(0);

    const yOffset = useScroll();
    const sectionValue = useSetLayout();
    const scrollHeight = sectionValue[currentSection].height;
    const scrollRatio = currentYOffset / scrollHeight;

    //현재 Section 계산
    const currentSectionCalc = () => {
        if (yOffset > prevScrollHeight + sectionValue[currentSection].height) {
            if (currentSection > sectionInfo.length - 2) return;
            setCurrentSection(currentSection + 1);
        };

        if (yOffset < prevScrollHeight) {
            if (currentSection === 0) return;
            setCurrentSection(currentSection - 1);
        }
    };

    //애니메이션이 들어가는 위치와 나오는 위치의 값 계산
    const calcValue = (values) => {
        let rv;

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
        if (currentYOffset < 0) {
            setCurrentYOffset(0);
        } else {
            setCurrentYOffset(yOffset - prevScrollHeight);
        }
    }, [yOffset]);

    //현재 섹션의 이전 값의 합 계산
    useEffect(() => {
        let sumPrevScrollHeight = 0;
        for (let i = 0; i < currentSection; i++) {
            sumPrevScrollHeight += sectionValue[i].height;
        }
        setPrevScrollHeight(sumPrevScrollHeight);
    }, [currentSection]);

    //이름 애니메이션
    const myName = () => {
        if (currentSection === 1) {
            if (scrollRatio < 0.6) {
                return '';
            } else if (scrollRatio < 0.62) {
                return 'ㅈ';
            } else if (scrollRatio < 0.64) {
                return '저';
            } else if (scrollRatio < 0.66) {
                return '정';
            } else if (scrollRatio < 0.68) {
                return '정ㄷ';
            } else if (scrollRatio < 0.7) {
                return '정다';
            } else if (scrollRatio < 0.72) {
                return '정답';
            } else if (scrollRatio < 0.74) {
                return '정다비';
            } else if (scrollRatio < 0.76) {
                return '정다빈';
            } else {
                return '정다빈';
            }
        } else {
            return;
        }
    }

    //총 스크롤 값 계산
    const calSumHeight = (section) => {
        let sumHeightValue = 0;
        for (let i = 0; i < section; i++) {
            sumHeightValue += sectionValue[i].height;
        }
        return sumHeightValue;
    }
    const sumHeight = calSumHeight(sectionValue.length);

    return (
        <>
            <body id={`show-section-${currentSection}`} style={{ backgroundColor: (currentSection === 0 && 1) ? 'white' : '#0540f2' }}>
                <div className="test">{currentSection}</div>
                {/* <div className="scrollRatio" style={{ width: (currentSection / (sectionInfo.length - 1)) * 100 + '%' }} /> */}
                <div className="scrollRatio" style={{ width: (yOffset / sumHeight) * 100 + '%' }} />
                <div className="container">
                    <section className="section" id="section-0" style={{ height: sectionValue[0].height + 'px', backgroundColor: `white`, opacity: calcValue(sectionInfo[0].values.container_opacity) }}>
                        <div className="loading" style={{ left: calcValue(sectionInfo[0].values.loadingObj_move) + '%', opacity: calcValue(sectionInfo[0].values.loadingObj_opacity) }}>
                            <p>
                                반갑습니다!<br />
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
                        <div
                            className="opa-elem first-message"
                            style={{ opacity: calcValue(sectionInfo[0].values.firstMessage_opacity) }}
                        >
                            <p>한국어 선생님에서</p>
                        </div>
                        <div className="opa-elem pls-scroll">
                            <div className="arrow"></div>
                            <div className="pls-scroll_message">
                                <p>아래로 내리세요</p>
                            </div>
                        </div>
                    </section>
                    <section className="section" name="section-1" id="section-1" style={{ height: sectionValue[1].height + 'px', backgroundColor: 'white' }}>
                        <div className="wave" style={{ top: calcValue(sectionInfo[1].values.wave_move) + '%' }}></div>
                        <div className="wave2" style={{ top: calcValue(sectionInfo[1].values.wave2_move) + '%' }}></div>
                        <div className="blue_background" style={{ bottom: calcValue(sectionInfo[1].values.blue_background) + '%' }}></div>
                        <div className="opa-elem second-message" style={{ opacity: (scrollRatio < 0.3) ? calcValue(sectionInfo[1].values.secondMessage_opacity) : calcValue(sectionInfo[1].values.secondMessage_opacity_out) }}>
                            <p>프론트엔드 <br />
                                프로그래머로 🖥 <br />
                                열심히 <br />
                                일하겠습니다.</p>
                        </div>
                        <div className="opa-elem introduce" style={{ opacity: (currentSection === 1) ? 1 : 0 }}>
                            <p
                                id="hello"
                                style={{ opacity: calcValue(sectionInfo[1].values.introHello_opacity) }}
                            >
                                안녕하세요!
                            </p>
                            <p>
                                <span id="jeongdabin" style={{ opacity: 1 }}>{myName()}</span>
                                <span id="my-name" style={{ opacity: calcValue(sectionInfo[1].values.introMyname_opacity) }}>입니다.</span>
                            </p>
                        </div>
                    </section>
                    <section className="section" id="section-2" style={{ height: sectionValue[2].height * 1.5 + 'px' }}>
                        <div className="introduce-section2">
                            <p id="hello">안녕하세요!</p>
                            <p><span id="jeongdabin">정다빈</span><span id="my-name">입니다.</span></p>
                        </div>

                        <div className="move-elem main" style={{ top: calcValue(sectionInfo[2].values.main_move) + 'vh', opacity: (currentSection === 2) ? 1 : 0 }}>
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
                                <Link to="/Portfolio">
                                    <p>📑 프로젝트</p>
                                </Link>
                            </div>
                            <div className="main-content-box project">
                                <ProjectListMini />
                            </div>
                            <div className="main-title contact">
                                <p>📨 연락처</p>
                            </div>
                            <div className="main-content contact">
                                <li>
                                    <ul>✉️ 41@b41.kr</ul>
                                    <ul><a href="http://github.com/b41-41" target="_blank" rel="noopener noreferrer">🐈‍⬛ http://github.com/b41-41</a></ul>
                                </li>
                            </div>
                        </div>
                    </section>
                </div>
                <footer>&copy; 정다빈 {new Date().getFullYear()}</footer>
            </body >
        </>
    );
}

export default Home;