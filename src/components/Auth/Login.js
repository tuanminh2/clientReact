import React from 'react';
import axios from 'axios';
function Login() {
  const hdlLogin = (event) => {
    event.preventDefault();
    let usernameInp = document.getElementById('usernameInp');
    let passwordInp = document.getElementById('passwordInp');

    // console.log(newuser);
    axios({
      method: 'post',
      url: 'http://localhost:8989/login',
      params: {
        username: usernameInp,
        password: passwordInp,
      },
      config: {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    })
      .then((res) => console.log("sdkfjsakfjsdf", res))
      .catch((error) => {
        let errResp = error.response;
        console.log("sjfjsfjssdf",error)
        // if (errResp.status === 401) {
      
        // }
      });
  };
  return (
    <div action="http://localhost:8989/login" method="post">
      <div className="form-group">
        <label> User name</label>
        <input
          type="text"
          name="username"
          id="usernameInp"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          id="passwordInp"
          className="form-control"
        />
      </div>

      <button
        type="submit"
        onClick={(event) => hdlLogin(event)}
        className="btn btn-primary"
      >
        Submit
      </button>
    </div>
  );
}
export default Login;
