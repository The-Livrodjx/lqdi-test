import { createContext, useCallback, useState } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {

  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleStep = useCallback((new_step) => {
    setStep(new_step);

    return true;
  }, []);

  const handleEmail = useCallback((new_email) => {
    setEmail(new_email);

    return true;
  }, []);

  const handleName = useCallback((new_name) => {
    setName(new_name);

    return true;
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        step,
        handleStep,
        email,
        handleEmail,
        name,
        handleName
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export { GlobalProvider, GlobalContext };