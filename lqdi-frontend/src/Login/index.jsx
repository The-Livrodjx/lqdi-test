import $ from 'jquery';
import React, { useContext, useEffect, useState } from 'react';
import {AuthContext} from "../contexts/AuthContex";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const { setAdminEmail, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.length > 3) {
      $.post({
        url: "http://127.0.0.1:8000/api/login",
        data: {
          email: email
        }
      }).done((data) => {
        if (data.message === "Login successful") {
          setIsAuthenticated(true);
          setAdminEmail(email);
          navigate("/dashboard");
        }
      }).fail((err) => {
        if(err.responseJSON) {
          window.alert(err.responseJSON.message);
        }
      });
    }
    else {
      window.alert("Digite um e-mail válido");
    }
  }

  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h1>Login</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="Digite seu email" />
                </div>

                <div className="form-group text-center my-2">
                  <button type="submit" className="btn btn-primary">Entrar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;