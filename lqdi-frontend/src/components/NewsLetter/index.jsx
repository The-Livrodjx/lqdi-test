import { useContext, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { validateEmail } from "../../utils";

export default function NewsLetters() {
  const { handleStep, handleEmail } = useContext(GlobalContext);
  const [email, setEmail] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (validateEmail(email)) {

        handleEmail(email);
        return handleStep(1);
      }

      window.alert("Insira um e-mail válido");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between w-full min-h-screen py-2 px-20 bg-black">
      <div className="flex justify-center w-full mb-8">
        <div>
          <h1 className="text-4xl font-semibold text-white">Receba nossos artigos de interesse na sua caixa de entrada</h1>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div>
          <input onChange={(e) => setEmail(e.target.value)} onKeyUp={handleKeyPress} className="px-10 py-4 w-80 font-bold text-white rounded border-solid border border-gray-100 bg-transparent rounded-2xl focus:shadow-outline focus:bg-white focus:text-black text-center" placeholder="Escreva aqui seu e-mail" />
        </div>
      </div>
    </div>
  );
}