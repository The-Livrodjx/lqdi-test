
import $ from "jquery";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContex";

export default function Dashboard() {
  const { adminEmail } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    $.get({
      url: "http://127.0.0.1:8000/api/users",
      data: {
        email: adminEmail
      }
    }).done((response) => {
      setData(response.users);
      setIsLoading(false);
    })
  }, []);
  return (
    <>
      {isLoading ? (
        <h1>Carregando informações...</h1>
      ) : (

        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}