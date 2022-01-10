import React from 'react';
import { Link } from 'react-router-dom';
import '../css/default.css';
import '../css/portfolio.css';
import imgA from '../img/01_portfolio.png';

const Portfolio = () => {

    return (
        <>
            <div class="menu">
                <span class="jeongdabin">
                    <Link to="/" style={{ color: "white" }}>정다빈 </Link>
                </span>
                <span class="menu_list">

                    <Link to="/">
                        기술,
                    </Link>
                    <Link to="/portfolio">
                        작업 목록,
                    </Link>
                    <Link to="/">
                        연락처
                    </Link>

                </span>
            </div>
            <div class="contents">
                <a href="http://portfolio.b41.kr/" target="_blank" alt="포트폴리오">
                    <div class="content_box">
                        <div class="content_thum">
                            <img src={imgA} alt="포트폴리오" height="100%" />
                        </div>
                        <div class="content_title">
                            포트폴리오
                        </div>
                        <div class="content_explain">
                            포트폴리오 사이트
                        </div>
                    </div>
                </a>


                <div class="content_box">
                    <div class="content_thum">
                        <img src={imgA} alt="포트폴리오" height="100%" />
                    </div>
                    <div class="content_title">
                        title
                    </div>
                    <div class="content_explain">
                        content
                    </div>
                </div><div class="content_box">
                    <div class="content_thum">
                        <img src={imgA} alt="포트폴리오" height="100%" />
                    </div>
                    <div class="content_title">
                        title
                    </div>
                    <div class="content_explain">
                        content
                    </div>
                </div><div class="content_box">
                    <div class="content_thum">
                        <img src={imgA} alt="포트폴리오" height="100%" />
                    </div>
                    <div class="content_title">
                        title
                    </div>
                    <div class="content_explain">
                        content
                    </div>
                </div>
            </div>
        </>
    )
};

export default Portfolio;