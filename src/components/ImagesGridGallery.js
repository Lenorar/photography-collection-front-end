import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ImagesGrid extends Component {
    constructor(){
        super();
        this.state = {
            images: [],
        };
        this.deleteImage = this.deleteImage.bind(this);
    }

    componentDidMount(){
        console.log(this.props.id)
        let id = this.props.id
        axios(`http://localhost:3000/images/${id}`, {
            method: 'GET',
        })
        .then(res=>{
            this.setState({
                images: res.data, 
            })
        }).catch(err=> console.log('error', err));
    }

    reRender(){
        let id = this.props.id
        axios(`http://localhost:3000/images/${id}`, {
            method: 'GET',
        })
        .then(res=>{
            this.setState({
                images: res.data, 
            })
        }).catch(err=> console.log('error', err)); 
    }

    deleteImage(imageId){
        let id = imageId
        axios.delete(`http://localhost:3000/images/${id}`, {
        })
        .then(res => {
            this.reRender();
        })
        .catch(err => console.log(err));
    }
      
    renderImages(array){
         if(this.state){
            return array.map((image, key) => {
                let imageId = image.id
                return(
                    <div key={image.id} className="grid-gallery-container">
                        <div className="content-container-box">
                            <div className="image-grid-gallery-image-container">
                                <img className="image-grid-gallery-image" src={image.image_url} />
                            </div>
                            <button className="image-grid-gallery-button"onClick={() => this.deleteImage(image.id)}>delete</button>          
                        </div>
                    </div>       
                ) 
            })
        }
    }
    
    render(){
        return(
            <div className="grid-container">
                 {this.renderImages(this.state.images)}                
            </div>
        )
    }
}


export default ImagesGrid;