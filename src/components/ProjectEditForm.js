import React, {Component} from 'react';
import axios from 'axios';
import ImagesGridGallery from '../components/ImagesGridGallery.js';


import { Link } from 'react-router-dom';
class ProjectEditForm extends Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            title: '',
            description: '', 
            image_urlFirst: '', 
            image_urlSecond: '',
        };
    }

    componentDidMount(){
        axios.get(`http://localhost:3000/projects/${this.props.match.params.id}`)
        .then((res) => {
            this.setState({
                id: res.data.id,
                title: res.data.title,
                description: res.data.description, 
                image_urlFirst: res.data.image_urlFirst, 
                image_urlSecond: res.data.image_urlSecond
            })
        })
        .catch(err => console.log(err));
    }

    handleInputChange(event) {
        event.preventDefault();
        console.log('event.target.value--->', event.target.value);
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]:value,
        });
    }
    render(){  
        let path = '/projects/' + this.props.match.params.id
        return(
            <div className="edit-project-form">
                <Link to={path}><h2>←{this.state.title}</h2></Link>
                <p>{this.state.description}</p>
                <ImagesGridGallery  id = {this.props.match.params.id} />
            </div>
        )
    }
}
    
export default ProjectEditForm;