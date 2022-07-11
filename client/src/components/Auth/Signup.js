import React from 'react';

export default class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }
    }

    render() {
        
        
        return (
            <div className="sign-in-wrapper">
                <div className="form">
                    <div className="input-wrapper">
                        <div>Adresse mail</div> 
                        <input className="input" type="text" placeholder="Adresse mail" value={this.state.email} onChange={ e => this.setState({ email: e.target.value }) } />
                        <div className="email error"></div>
                    </div>
                    <div className="input-wrapper">
                      <div>Mot de passe</div> 
                      <input className="input" type="password" placeholder="Mot de passe" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                      <div className="password error"></div>
                    </div>

                    <div className="input-wrapper">
                        <div>Prénom</div> 
                        <input className="input" type="text" placeholder="Prénom" value={this.state.firstName} onChange={ e => this.setState({ firstName: e.target.value }) } />
                    </div>
                    <div className="input-wrapper">
                      <div>Nom</div> 
                      <input className="input" type="text" placeholder="Nom" value={this.state.lastName} onChange={e => this.setState({ lastName: e.target.value })} />
                      <div className="firstname error"></div>
                    </div>
            
                    <div className="btn" onClick={() => this.props.signUp({...this.state})}>Sign Up</div> 
                </div> 
            </div>
        )
    }
}