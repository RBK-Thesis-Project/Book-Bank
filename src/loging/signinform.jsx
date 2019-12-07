import React from "react";
// import { render } from "react-dom";
import $ from "jquery";
import jwt_decode from "jwt-decode";
import SignUp from "./signupform";
// import { Provider } from "react-redux";
// import store from "./store";
// import { connect } from "react-redux";
// import { increment, decrement, reset } from "./actionCreators";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: (
        <div
          style={{
            marginTop: 250
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              className="logo"
              style={{ width: "70px" }}
              src="https://previews.123rf.com/images/tanyastock/tanyastock1609/tanyastock160901582/62841748-user-icon-human-person-symbol-avatar-login-sign-blue-circle-button-with-flat-web-icon-vector.jpg"
            ></img>
            <h2 style={{ marginBottom: "10px" }}>Welcome to Book-Bank</h2>
            <p className="join">
              New to Book-Bank?
              <button
                style={{ border: "non", width: "50px" }}
                onClick={this.redirect.bind(this)}
              >
                join
              </button>
            </p>
          </div>
          <div
            className="auth"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <form
              onSubmit={this.loginFunction.bind(this)}
              className="ui form"
              style={{ marginTop: "10px" }}
            >
              <div className="field">
                <label className="em">Email</label>

                <span className="required" style={{ color: "red" }}>
                  *
                </span>
                <br />
                <input
                  id="email"
                  placeholder="email"
                  style={{ width: 250, height: 30 }}
                />
              </div>
              <br />
              <div className="field">
                <label className="pass">Password</label>

                <span className="required" style={{ color: "red" }}>
                  *
                </span>
                <br />
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  style={{ width: 250, height: 30 }}
                />
              </div>
              <br />
              <div>
                <button
                  type="submit"
                  className="ui button"
                  style={{
                    backgroundColor: "#F08080",
                    width: 100,
                    height: 30,
                    marginLeft: "80px"
                  }}
                  onClick={this.getUser.bind(this)}
                >
                  Login
                </button>
                {/* <span className="choose"> or </span>
                <button
                  type="button"
                  className="ui button"
                  style={{ backgroundColor: "#F08080", width: 70, height: 20 }}
                >
                  Signup
                </button> */}
              </div>
            </form>
          </div>
        </div>
      )
    };
  }

  redirect() {
    this.setState({
      component: <SignUp />
    });
  }

  loginFunction() {
    var data = {
      email: $("#email").val(),
      password: $("#password").val()
    };

    $.ajax({
      url: "/login",
      method: "POST",
      data: data,
      datatype: "json",
      success: response => {
        localStorage.setItem("usertoken", response);
        const decoded = jwt_decode(response);
        this.setState({
          password: decoded.password
        });
      }
    });
  }

  getUser() {
    const token = localStorage.usertoken;
    console.log(token);
    const decoded = jwt_decode(token);
    // console.log(decoded);
    if (decoded.password === this.state.password) {
      window.open("/");
    } else {
      alert("Wrong password or email");
    }
  }
  render() {
    return this.state.component;
  }
}

export default SignIn;
