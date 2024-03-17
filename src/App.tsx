import TranslateInput from "./components/Translate Input";
import TranslateOutput from "./components/Translate Output";
import useFetch from "./Language data/useFetch";
import UserContext from "./UserContext";
import { useEffect, useState } from "react";

const App: React.FC = () => {
  // TranslateInput
  const [inputValue, setInputValue] = useState<string>("Hello, how are you?");
  // const [noSpaceInputValue, setNoSpaceInputValue] = useState("");
  // useEffect(() => {
  //   setNoSpaceInputValue(inputValue.replace(" ", "%20"));
  // }, [inputValue]);
  const [langFrom, setLangFrom] = useState<string>("en");

  //TranslateOutput
  const [langTo, setLangTo] = useState<string>("fr");
  const [outputValue, setOutputValue] = useState<string>(
    "Bonjour, comment vas-tu?"
  );

  // API
  
  const APIData = useFetch(
    (
      "https://api.mymemory.translated.net/get?q=" +
      inputValue +
      "&langpair=" +
      langFrom +
      "|" +
      langTo
    )
  );

  const { data , error } = APIData;

  useEffect(() => {
    console.log(
      "https://api.mymemory.translat ed.net/get?q=" +
        inputValue +
        "&langpair=" +
        langFrom +
        "|" +
        langTo
    );
  }, [inputValue, langFrom, langTo]);
  return (
    <UserContext.Provider
      value={{
        inputValue,
        setInputValue,
        langFrom,
        setLangFrom,
        langTo,
        setLangTo,
        outputValue,
        setOutputValue,
        data,
        error,
      }}
    >
      <div className="min-h-screen font-DM-Sans bg-[url('./assets/images/hero_img.jpg')] bg-[#040711] bg-contain bg-no-repeat bg-fixed bg-top flex flex-col justify-center items-center">
        <div className="my-5">
          <img src="/logo.svg" alt="translated.io" />
        </div>

        <div className="flex flex-col lg:flex-row w-full justify-center items-center">
          <TranslateInput />
          <TranslateOutput />
        </div>
        <div className="text-white my-3">
          Developed by{" "}
          <a
            href="https://hammedbello.netlify.app/"
            className="underline hover:text-gray-400"
          >
            Bello
          </a>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default App;
