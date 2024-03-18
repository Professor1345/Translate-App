import TranslateInput from "./components/Translate Input";
import TranslateOutput from "./components/Translate Output";
import useFetch from "./Language data/useFetch";
import UserContext from "./UserContext";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
const App: React.FC = () => {
  // TranslateInput
  const [inputValue, setInputValue] = useState<string>("Hello, how are you?");
  // const [noSpaceInputValue, setNoSpaceInputValue] = useState("");
  // useEffect(() => {
  //   setNoSpaceInputValue(inputValue.replace(" ", "%20"));
  // }, [inputValue]);
  const [langFrom, setLangFrom] = useState<string>("en");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [langDetect, setLangDetect] = useState<any>("en");
  //TranslateOutput
  const [langTo, setLangTo] = useState<string>("fr");
  const [outputValue, setOutputValue] = useState<string>(
    "Bonjour, comment vas-tu?"
  );

  // API

  const APIData = useFetch(
    "https://api.mymemory.translated.net/get?q=" +
      inputValue +
      "&langpair=" +
      langFrom +
      "|" +
      langTo
  );

  const { data, error } = APIData;

  useEffect(() => {
    console.log(
      "https://api.mymemory.translated.net/get?q=" +
        inputValue +
        "&langpair=" +
        langFrom +
        "|" +
        langTo
    );
  }, [inputValue, langFrom, langTo, langDetect]);

  // Language Detection
  useEffect(() => {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: "https://language-detection4.p.rapidapi.com/language-detection",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        "X-RapidAPI-Key": "21de82d2e5msh1ca5ae5a7a0d863p12ce83jsnea0ee10d702d",
        "X-RapidAPI-Host": "language-detection4.p.rapidapi.com",
      },
      data: [
        {
          id: "1",
          // language: 'en',
          text: inputValue,
        },
      ],
    };

    axios
      .request(options)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: { data: any }) => {
        setLangDetect(response.data[0].detected_language);
        // console.log(langDetect);
      })
      .catch((error: string) => {
        console.error(error);
      });

    // console.log(langDetect)
  }, [inputValue, langDetect]); // Empty dependency array to run the effect only once

  return (
    <UserContext.Provider
      value={{
        inputValue,
        setInputValue,
        langDetect,
        setLangDetect,
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
            target="_blank"
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
