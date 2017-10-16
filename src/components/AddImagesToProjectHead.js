import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone'
import sha1 from 'sha1';
import superagent from 'superagent';
import axios from 'axios'
import Images from '../components/Images.js'
  
class AddImagesToProjectHead extends Component {
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
            console.log('state',this.state.images[0].secure_url)
        }) 
    }

    removeImage(e) {
        e.preventDefault()
        console.log('image index to delete: '+e.target.className)
        let updatedImages = Object.assign([], this.state.images)
            updatedImages.splice(e.target.className, 1)
                this.setState({
                    images: updatedImages
                })
    }

    sendBackUrlFirst(){
        this.props.firstUrlMethod(this.state.images[0].secure_url)
    }

    sendBackUrlSecond(){
        this.props.secondUrlMethod(this.state.images[1].secure_url)
    }

    render(){            
        const array = this.state.images.map((image, index) =>{            
            return(
                 <li key={index} className="image-select-list">
                    <img className="image-select-image" style={{width:"100px"}}src={image.secure_url}/>
                    <a id="delete-link" className={index} onClick={this.removeImage.bind(this)} href ="#">delete</a>
                </li>
            )
        })

        return (
            <div>
                <div className="dropzone-area">
                    <Dropzone 
                        onDrop={this.uploadFile.bind(this)} 
                    >
                    <h4>Drop or add a photo here, then select button to add it to the homepage</h4>
                    </Dropzone>
                    <div className="buttons">
                        <button onClick={this.sendBackUrlFirst.bind(this)}>Image 1 on homepage</button>
                        <button onClick={this.sendBackUrlSecond.bind(this)}>Image 2 on homepage</button>
                    </div>
                    <ul className="select-image-ul">
                        { array }
                    </ul>
                </div>
            </div>
        )
    }
}

export default AddImagesToProjectHead;