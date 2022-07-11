import React from 'react';
import store from '../../store/index';
import {NavLink} from 'react-router-dom';
import './Sidebar.css';

export default class Sidebar extends React.Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    bgImage = () => {
        if(store.getState().user.avatar && store.getState().user.avatar.url) {
            return `url(${store.getState().user.avatar.url})`;
            
        } else {
            return `url(https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg)`;
        }
    }
     handleLogout = () => {

    }

    render() {
        if (store.getState().user) {
            return (
                <div className="sidebar-wrapper">
                    <div className="header">Quizzi</div>
    
                    <div className="user">
                        <div className="avatar" style={{backgroundImage: this.bgImage()}}></div>
                        <div className="name">{store.getState().user.firstName + ' ' + store.getState().user.lastName}</div>
                    </div>

                    <div className="links">
                        
                        <NavLink to="/account"><div className="link">Avatar</div></NavLink>
                        <NavLink to="/my-quizzes"><div className="link">Mes quiz</div></NavLink>
                        <NavLink to="/create-quiz"><div className="link">Créer un quiz</div></NavLink>
                        <NavLink to="/community-quizzes"><div className="link">Tout les quiz</div></NavLink>
                        <NavLink to="/" onClick={() => window.localStorage.clear()}><div className="link">Déconnexion</div></NavLink>
                    </div>
                </div>
            )
        } else {
            return (
                <div>Loading</div>
            )
        }
    }
}