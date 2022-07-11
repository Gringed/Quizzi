import React from "react";
import Signup from "./Signup";
import Signin from "./Signin";
import axios from "axios";
import store from "../../store/index";
import Toast from "../Toast/Toast";
import "./Auth.css";

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "signin",
      showToast: false,
      message: '',
    };
  }

  signIn = (email, password) => {
    axios
      .post("/api/users/login", { email, password })
      .then((res) => {
        if (res.data.success) {
          store.dispatch({
            type: "login",
            _id: res.data.user._id,
            user: res.data.user,
            token: res.data.token,
          });
          window.location = '/account';
        } else {
          this.setState({
            showToast: true,
            message: 'Identifiants incorrect'
          });
          setTimeout(() => {
            this.setState({ showToast: false });
          }, 3000);
        }
      })
      .catch((er) => {
        this.setState({
          showToast: true,
        });
        setTimeout(() => {
          this.setState({ showToast: false });
        }, 3000);
      });
  };

  signUp = ({ firstName, lastName, email, password }) => {
    axios
      .post("/api/users/register", { firstName, lastName, email, password })
      .then((res) => {
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");
        const firstNameError = document.querySelector(
          ".firstname.error"
        );
        if (res.data.errors) {
            if (res.data.errors.email) {
                emailError.innerHTML = res.data.errors.email;
            }
            if (res.data.errors.password) {
                passwordError.innerHTML = res.data.errors.password;
            }
            if (res.data.errors.firstName) {
                firstNameError.innerHTML = res.data.errors.firstName;
            }
        }
        else if(res.data.message) {
           if (res.data.message.code === 11000) {
            emailError.innerHTML = 'Mail déjà existant'
            passwordError.innerHTML =''
            firstNameError.innerHTML= ''
           }
        } 
        else{
            emailError.innerHTML= ''
            passwordError.innerHTML =''
            firstNameError.innerHTML= ''
        }
        if (res.data.success) {
          this.setState({
            showToast: true,
            message: 'Inscription réussie, connectez vous'
          });
          setTimeout(() => {
            this.setState({ showToast: false });
          }, 3000);
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  changeTab = () => {
    this.setState({
      tab: this.state.tab === "signup" ? "signin" : "signup",
    });
  };

  render() {
    let page =
      this.state.tab === "signin" ? (
        <Signin signIn={this.signIn} />
      ) : (
        <Signup signUp={this.signUp} />
      );
    return (
      <div className="auth-wrapper">
        <Toast
          model={this.state.showToast}
          message={this.state.message}
          backgroundColor="#FF4539"
        />
        <div className="left">
          <img src="https://www.pngmart.com/files/19/Vector-Quiz-Transparent-PNG.png" />
        </div>

        <div className="right">
          <div className="header">Quizzi</div>
          <div className="sub-header">Bienvenue sur l'application des Quiz !</div>
          {page}
          <div className="new" onClick={this.changeTab}>
            {this.state.tab === "signin"
              ? "Nouveau ? Inscrivez vous"
              : "Déjà un compte chez nous ? Connectez vous"}
          </div>
        </div>
      </div>
    );
  }
}
