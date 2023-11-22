import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import NewsLetters from "../components/NewsLetter";
import Form from "../components/Form";

export default function Home() {
  const { step } = useContext(GlobalContext);

  return (
    <>
      {
        <>
          {
            {
              0: <NewsLetters />,
              1: <Form />
            }[step]
          }
        </>
      }
    </>
  );
}