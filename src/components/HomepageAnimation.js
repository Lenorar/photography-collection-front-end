import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class HomepageAnimation extends Component {
    state = {
        shouldShowBox: true
    };

    toggleBox = () =>{
        this.setState({
            shouldShowBox: !this.state.shouldShowBox
        });
    };

    render(){
        console.log(this.props.match.path)
        let projectsPath = '/projects'
        return(
        <div>
            <Link to={projectsPath}>
            <div className="animation-box">
                <h1 className="header">Photography Collection</h1>
                <p className="p-header">Photography Collection is a growing directory of photographers' work. Made in hopes of archiving photographs that inspire and challenge us. We encourage you to explore and add images.</p>
            </div>
            </Link>
        </div>
      )
    }
  }

  export default HomepageAnimation;

