import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// npm package for carousel gallery
import 'react-select/dist/react-select.css';
import Carousel from 'nuka-carousel';

class Images extends Component {
    constructor(){
        super();
        this.state = {
            images: [],
            imagesLoaded: false
        };
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
                imagesLoaded: true
            })
        }).catch(err=> console.log('error', err));
    }

    renderImages(array){
        if(this.state.imagesLoaded){
            return array.map(image => {
                return(
                    <div key={image.id} className="project-page-image-container clearfix">
                        <img className="project-page-image" src={image.image_url} onLoad={() => {window.dispatchEvent(new Event('resize'));}}/>
                    </div>        
                ) 
            })
        }else if (this.state.images===[]){
            console.log('error')
        }
    }
    
    render(){
        return(
            <Carousel ref="carousel" slidesToShow={2} cellAlign="left" Carousel dragging={true}>
                {this.renderImages(this.state.images)}
            </Carousel>
        )
    }
}

export default Images;