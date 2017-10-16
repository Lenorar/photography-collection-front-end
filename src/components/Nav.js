import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    
    render(){
        let projectsPath = '/projects'    
        return(
          <div className='website-nav'>

                <div className="nav-name"><Link to={projectsPath}>
                    <h1 >photography  </h1>
                    <h1 >collection </h1>
                </Link>
                </div>
          </div>
        )
      }
    }

  export default Nav;

