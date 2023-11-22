import { useContext, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContex";

export default function Form() {
  const [canShow, setCanShow] = useState(false);
  const [name, setName] = useState('');
  const { email } = useContext(GlobalContext);
  const { signup } = useContext(AuthContext);

  const handleChange = (name) => {
    if (name.length > 3) {
      setName(name);
      setCanShow(true);
    }
  }

  const handleSubmit = async () => {
    console.log(email);
    if (name <= 3) {
      window.alert("Digite um nome maior que 3");
      return false;
    }

    await signup({ name: name, email: email });
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">

      <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
        <label htmlFor="name" className="font-bold mb-2 ml-2">Seu Nome (requerido)</label>
        <div className="flex items-center justify-between">
          <input onChange={(e) => handleChange(e.target.value)} type="text" name="name" className="w-96 px-8 py-2 rounded-2xl border border-gray-100 bg-custom-gray mb-4 mx-2" />
          {canShow ? (<FaCheck color="#53DB9D" />) : (<></>)}
        </div>
      </form>
      <button type="submit" onClick={() => handleSubmit()} className="w-40 bg-black text-white px-4 py-2 rounded-2xl">Enviar</button>

    </div>
  )
}