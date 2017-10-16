import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import HomepageAnimation from './components/HomepageAnimation.js'
import ProjectAddForm from './components/ProjectAddForm.js'
import Projects from './components/Projects.js'
import Project from './components/Project.js'
import ProjectEditForm from './components/ProjectEditForm.js'
import AddImages from './components/AddImages.js'


export default (
    <BrowserRouter>
      <div>
        <Route exact path='/' component={HomepageAnimation}/>        
        <Route exact path='/projects' component={Projects}/>
        <Route exact path='/admin/projects' component={Projects}/>
        <Route exact path='/admin/projects/:id' component={Project}/>
        <Route exact path='/projects/:id/edit' component={ProjectEditForm} />
        <Route exact path='/addproject' component={ProjectAddForm} />
        <Route exact path='/projects/:id/addimages' component={AddImages}/>
        <Route exact path='/projects/:id' component={Project}/>
      </div>
    </BrowserRouter>
)









