import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Projects extends Component {
    constructor(){
        super();
        this.state = {
          projects: [],
          projectsLoaded: false
        };
        
    }
      
    componentDidMount() {
        axios('https://mysterious-scrubland-59456.herokuapp.com/projects', {
          method: 'GET',
        })
        .then(res => {
          this.setState({
              projects: res.data,
              projectsLoaded: true
        })
          console.log(this.state.projects)
        })
        .catch(err => console.log('in error',err));
        }

        renderProjects(array){
          if(this.state.projectsLoaded) {
              return array.map(project => {
                  let pathProject = `/projects/${project.id}`;
                  return (
                    <div className="layout">
                            <div className="button-to-project-page"><Link className="projects-page" to={pathProject}>{project.title}</Link></div>
                              <div className="column">
                                <div className="projects-image-container">
                                  <img className="image image1" src={project.image_urlFirst} /> 
                                </div>
                              </div>
                              <div className="column column-projects">
                                <div className="projects-image-container">

                                    <img className="image image2" src={project.image_urlSecond} /> 
                                </div>
                              </div>
                      </div>
                    )
                })
        } else {
            return <p>no projects</p>
        }
    }
      render(){
        let addProjectPath = '/addproject'
        return(
          <div className='projects'>
            <Link className="add-project" to={addProjectPath}>add your own library</Link>
            <div>
            </div>
            <div className='project-library-container'>
              {this.renderProjects(this.state.projects)}
            </div>
          </div>
        )
      }
    }
  
    export default Projects;
  
  

