import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Project from '../components/Project.js'
import Nav from '../components/Nav.js'


class Projects extends Component {
    constructor(){
      super();
      this.state = {
          projects: [],
          projectsLoaded: false
      };
    }
    componentDidMount() {
        axios('http://localhost:3000/projects', {
          method: 'GET',
        })
        .then(res => {
          this.setState({
              projects: res.data,
              projectsLoaded: true
          })
          console.log('this is the state projects --->',this.state.projects)
        })
        .catch(err => console.log(err));
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
              return(console.log('error'))
          }
      }
      render(){
        let addProjectPath = '/addproject'
        return(
          <div className='projects'>
            <Nav />
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

