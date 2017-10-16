import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Projects from '../components/Projects.js';
import ProjectEditForm from '../components/ProjectEditForm.js';
import Images from '../components/Images.js';
import Nav from '../components/Nav.js';
import AddImages from '../components/AddImages.js'
import { Redirect } from 'react-router-dom';

class Project extends Component {
    constructor(){
        super();
        this.state = {
            projectLoaded: false, 
            title: '',
            description:'',
            imagesLoaded: false, 
            images: []
        }
        this.deleteProject = this.deleteProject.bind(this);
    }
    
    componentDidMount() {
        let id = this.props.match.params.id
        axios(`http://localhost:3000/projects/${id}`, {
            method: 'GET',
        })
        .then(res => {
            console.log(res.data,'<----did i get here')
            if (res.data){
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    projectLoaded: true, 
                    imagesLoaded: true, 
                    images: res.data.data
                })
            }    
            }).catch(err => console.log(err,'error')
        );
    }

    renderProject(){
        if (this.state.projectLoaded){
            return(
                <div className="project-page">
                    {this.determinePath()}
                   <Images id = {this.props.match.params.id} />
                </div>
            )
        }
    }

    deleteProject(){
        let id = this.props.match.params.id
        axios.delete(`http://localhost:3000/projects/${id}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    images: res.data.data,
                    fireRedirect: true
                })
                console.log(this.state)
            })
            .catch(err => console.log(err));
    }

    determinePath = () =>{
        let projectsPath = '/projects'
        let editProjectPath = '/projects/' + this.props.match.params.id + '/edit'
        let addImagesPath = '/projects/' + this.props.match.params.id + '/addimages'
        return(
            <div className="admin">
                <h3>{this.state.title}</h3>
                <p> {this.state.description}</p>
                <button onClick={this.deleteProject}>delete</button>
                <button className=''><Link to={editProjectPath}>edit</Link></button>
                <button className=''><Link to={addImagesPath}>add images</Link></button>
                {this.state.fireRedirect
                ? <Redirect push to={projectsPath} />
                : ''}
            </div>
        )
    }

    render(){
        let addImagesPath = '/admin/projects/' + this.props.match.params.id + '/addimages'
        console.log("router props--->", this.props)
        console.log("this.location--->", this.props.description)
        return(
            <div>
                <Nav />
                {this.renderProject()}
            </div>
        )
    }
}

export default Project;