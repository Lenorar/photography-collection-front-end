import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone'
import sha1 from 'sha1';
import superagent from 'superagent';
import axios from 'axios'
import Nav from '../components/Nav.js'

class AddImages extends Component {
    constructor(){
        super()
        this.state = {
            images: []
        }
    }

    //cloudinary and dropzone tutorial reference: https://www.youtube.com/watch?v=WOTFmPkWbxo
    //explains dropzone and cloudinary very well
    uploadFile(files){
        console.log('uploadFile: ')
        const image = files[0]
        const cloudName = 'doez5fa8j'
        const url = 'https://api.cloudinary.com/v1_1/' +cloudName+'/image/upload'
        const timestamp = Date.now()/1000
        const uploadPreset = 'sgbchqbw'
        const paramsStr = 'timestamp=' +timestamp+'&upload_preset='+uploadPreset+'h_f3-EauEDoiKR0YTifYxpohLcs'
        const signature = sha1(paramsStr)
        const params = {
            'api_key': '948635412223536',
            'timestamp': timestamp,
            'upload_preset': uploadPreset,
            'signature': signature
        }

        let uploadRequest = superagent.post(url)
        uploadRequest.attach('file', image)

        Object.keys(params).forEach((key) => {
            uploadRequest.field(key, params[key])
        })

        uploadRequest.end((err, res) => {
            if (err){
                alert(err)
                return
            }
            console.log('upload complete:' + JSON.stringify(res.body))
            const uploaded = res.body
            let updatedImages = Object.assign([], this.state.images)
            updatedImages.push(uploaded)
            this.setState({
                images: updatedImages
            })
        }) 
    }

    removeImage(e) {
        e.preventDefault()
        console.log('image index to delete: '+ e.target.className)
        let updatedImages = Object.assign([], this.state.images)
            updatedImages.splice(e.target.className, 1)
                this.setState({
                    images: updatedImages
                })
    }

    //adding uploaded images into database
    addImageInDB(e){
        e.preventDefault()
        let projectId=this.props.match.params.id
        let imageUrls=this.state.images.map(image => image.secure_url)
        axios('https://mysterious-scrubland-59456.herokuapp.com/images', {
            method: 'POST', 
            data: {
                image_urls: imageUrls,
                project_id: projectId,
            }
        })
        .then(res => {
            this.setState({
                fireRedirect:true,
        });
        })
        .catch(err =>{
            this.setState({
                fireRedirect: false
            })
        })
    }

    render(){
        let projectPage = '/projects/' + this.props.match.params.id
        const array = this.state.images.map((image, index) =>{
            return(
                <li key={index} className="image-select-list">
                    <img className="image-select-image" style={{width:"100px"}}src={image.secure_url}/>
                    <a id="delete-link" className={index} onClick={this.removeImage.bind(this)} href ="#">delete</a>
                </li>
            )
        })

        return (
            <div className="add-image-container">
                <Nav />    
                <div className="add-image-page">
                    <h2>Add images to this library</h2>
                    <Dropzone 
                        onDrop={this.uploadFile.bind(this)} 
                    >
                    <h4>Drop or add a photo here. Add as many as you would like.</h4>
                    </Dropzone>
                    <ul className="select-image-ul">
                        { array }
                    </ul>
                    <div className="buttons">
                        <button onClick={this.addImageInDB.bind(this)}><Link to={projectPage}>add</Link></button>
                        <button><Link to={projectPage}>cancel</Link></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddImages;