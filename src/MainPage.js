import './css/App.css';
import './css/mlf.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {NavBar} from './NavBar';
import Header from './Header';
import Footer from './Footer';
import Page from './Page';

function ShowMainPage() {
    document.title = 'MLF'
    return ReactDOM.render(
        RenderMainPage(),
        document.getElementById('root')
    );
}

function RenderMainPage() {
    return (
      <React.Fragment>
        <NavBar />
        <Header />
        <Page />
        <Footer />
      </React.Fragment>
    );
}
  
export {ShowMainPage, RenderMainPage};