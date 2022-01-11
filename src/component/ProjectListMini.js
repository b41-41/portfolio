import React from 'react';
import { ProjectData } from './ProjectData';

import '../css/default.css';
import '../css/portfolio_mini.css';


const ProjectListMini = () => {
    return (
        <>
            <li>
                {ProjectData.map(project => {
                    return (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <ul>
                                <div className="main-content_project">
                                    <div className="main-content_project_image">
                                        <img src={project.image} alt={project.title} />
                                    </div>
                                    <div className="main-content_top">{project.title}</div>
                                    <div className="main-content_bottom">{project.content}</div>
                                </div>
                            </ul>
                        </a>
                    )
                })}
            </li>
        </>
    )
}

export default ProjectListMini;