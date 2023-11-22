import $ from 'jquery';
import { createContext, useContext, useState } from "react";
import { GlobalContext } from './GlobalContext';
const AuthContext = createContext();

function AuthProvider({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const { handleStep } = useContext(GlobalContext);

  const signup = async (user) => {

    $.post({
      url: 'http://127.0.0.1:8000/api/users',
      data: user
    }).done((data) => {
      if (data !== undefined) {
        if (data.email) {
          window.alert(`O e-mail já foi cadastrado`);
          handleStep(0);
        }
        else if (data.id_request) {
          window.alert(`Usuário cadastrado com sucesso, id: ${data.id_request}`)
        }
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        signup,
        adminEmail,
        setAdminEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};

export { AuthContext, AuthProvider };