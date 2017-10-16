import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone'
import sha1 from 'sha1';
import superagent from 'superagent';
import AddImagesToProjectHead from '../components/AddImagesToProjectHead.js'
import Nav from '../components/Nav.js'


class ProjectAddForm extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '', 
            image_urlFirst: '', 
            image_urlSecond: '',
            fireRedirect: false,            
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUrlSubmissionOne = this.handleUrlSubmissionOne.bind(this)
        this.handleUrlSubmissionTwo = this.handleUrlSubmissionTwo.bind(this)
    }

    handleUrlSubmissionOne(url){
        this.setState({
            image_urlFirst: url
        })
    }

    handleUrlSubmissionTwo(url){
        this.setState({
            image_urlSecond: url
        })
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]:value,
        });
    }

    handleFormSubmit(event) {        
        event.preventDefault();
        axios('http://localhost:3000/projects', {
            method: 'POST', 
            data: {
                title: this.state.title,
                description: this.state.description,
                image_urlFirst: this.state.image_urlFirst,
                image_urlSecond: this.state.image_urlSecond
              }
        })
        .then(res => {
            this.setState({
                fireRedirect:true,
                id: res.data.id
            });
        })
        .catch(err =>{
            this.setState({
                fireRedirect: false
            })
        })
    }

    render(){
        let path = '/projects/' + this.state.id + '/addimages'
        let projectPage = '/projects/' 
        return(
            <div>
                <Nav />
                <div className="add-project-form">
                <div >
                    <label>
                        Title
                            <input
                                type="text"
                                placeholder="title"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                autoFocus
                        />
                    </label>
                    <br></br>
                    <label>
                        Description
                            <input
                                type="text"
                                placeholder="description"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleInputChange}
                                autoFocus
                        />
                    </label>
                    <AddImagesToProjectHead firstUrlMethod={this.handleUrlSubmissionOne} secondUrlMethod={this.handleUrlSubmissionTwo} />
                    <button><Link to={projectPage}>cancel</Link></button>
                    <button className='submit' type="submit" value="save" onClick={this.handleFormSubmit}>submit</button>
                </div>

                {this.state.fireRedirect
                ? <Redirect push to={path} />
                : ''}
             </div>
            </div>
        )
    }
}

export default ProjectAddForm;