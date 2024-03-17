// import { useState } from "react";
import { useContext, useEffect, useState } from "react";
import { Language } from "../Language data";
import { Copy, ExpandDown, SoundMaxFill } from "../assets/images";
import UserContext from "../UserContext";

const TranslateInput: React.FC = () => {
  // const [buttonLang, setButtonLang] = useState(Language);
  const [active, setActive] = useState<string>("English");

  const {
    inputValue,
    setInputValue,
    langFrom,
    setLangFrom,
    setOutputValue,
    data,
    error,
  } = useContext(UserContext) || {};

  if (
    !inputValue ||
    !setOutputValue ||
    !langFrom ||
    !setLangFrom ||
    !setInputValue
  ) {
    throw new Error("imported values are not available in UserContext");
  }
  // if (!UserContext) {
  //   // Handle the case when context is not available
  //   return <div>Context not available</div>;
  // }

  const [otherLangs, setOtherLangs] = useState<string>("Spanish");
  const [otherLangsToggle, setOtherLangsToggle] = useState<boolean>(false);
  useEffect(() => {
    console.log(langFrom);
  }, [langFrom]);

  const langFromSound = () => {
    if ("speechSynthesis" in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(inputValue);

      const voices = synthesis.getVoices();
      if (voices.length > 0) {
        utterance.voice = voices[2];
      } else {
        alert("No voices available");
      }

      synthesis.speak(utterance);
    }
  };

  const langFromCopy = () => {
    const text = inputValue;
    // text.select();
    // text.setSelectionRange(0,500);
    navigator.clipboard.writeText(text);
    alert("Copied: " + text);
  };

  const inputHandler = (e: { target: { value: string } }) => {
    setInputValue(e.target.value.length >= 1 ? e.target.value : " ");
  };

  // const [selectedOption, setSelectedOption] = useState("English");
  return (
    <div className="translate-input flex flex-col justify-between">
      <div>
        <header className="text-[#4D5562] ">
          {Language.slice(0, 3).map((language, index) => {
            return (
              <button
                key={index}
                value={language.langCode}
                className={`mb-1 sm:mb-2 md:mb-3 lg:mb-3 mr-1 md:mr-2 lg:mr-4 py-2 px-3 rounded-[14px] ${
                  active === language.lang
                    ? "bg-[#4D5562] text-[#F9FAFB]"
                    : null
                }`}
                onClick={() => {
                  setActive(language.lang);
                  // console.log(language.langCode);
                  setLangFrom(language.langCode);
                }}
              >
                {language.lang}
              </button>
            );
          })}

          {/* Other languages */}
          {/* <div className="relative"> */}
          <button
            // value={otherLangs}
            className={`mb-1 sm:mb-2 md:mb-3 lg:mb-3 mr-1 md:mr-2 lg:mr-4 py-2 px-3 rounded-[14px] relative cursor-pointer ${
              active === "Others"
                ? "bg-[#4D5562] text-[#F9FAFB]"
                : "bg-transparent"
            }`}
            onClick={() => {
              setActive("Others");
              setOtherLangsToggle((toggle) => !toggle);
            }}
          >
            <span className="flex flex-nowrap">
              <span>{otherLangs}</span>{" "}
              <span className="my-auto ml-3">
                <img src={ExpandDown} alt="∨" />
              </span>
            </span>

            <ul
              className={` flex-col absolute overflow-y-auto overflow-x-hidden top-[150%] -left-2 max-h-60 lg:max-h-60 list-none ${
                otherLangsToggle ? "flex" : "hidden"
              }`}
            >
              {Language.slice(3).map((language, index) => {
                return (
                  <li
                    key={index}
                    value={language.langCode}
                    className={`text-white bg-[#212936cc] py-2 px-3 hover:bg-[#4D5562]`}
                    onClick={() => {
                      setOtherLangs(language.lang);
                      setActive(language.lang);
                      // console.log(langTo);
                      setLangFrom(language.langCode);
                    }}
                  >
                    {language.lang}
                  </li>
                );
              })}
            </ul>
          </button>

          {/* </div> */}
          {/* <select
            id="others"
            // selected={inputValue.toString()}
            className={`mb-1 sm:mb-2 md:mb-3 lg:mb-3 mr-1 md:mr-2 lg:mr-4 py-2 px-3 rounded-[14px] outline-none focus:outline-none w-24 cursor-pointer ${
              active === "Others"
                ? "bg-[#4D5562] text-[#F9FAFB]"
                : "bg-transparent"
            }`}
            value={langFrom}
            onChange={(e) => {
              setActive("Others");
              console.log(e.target.value);
              setLangFrom(e.target.value);
            }}
          >
            <option value={langFrom}>Others</option>
            {Language.slice(3).map((language, index) => {
              // console.log( Language.slice(3)[0])

              return (
                <option
                  key={index}
                  value={language.langCode}
                  className="text-white bg-[#212936cc] max-h-[20%] overflow-y-auto"
                >
                  {language.lang}
                </option>
              );
            })}
          </select> */}
        </header>
        <hr className="border-[#4D5562] my-2 sm:my-1" />
        <section className="mt-5">
          <textarea
            id="text"
            cols={50}
            rows={8}
            maxLength={500}
            value={inputValue}
            className="w-full h-full bg-transparent focus:outline-none resize-none"
            onChange={inputHandler}
          ></textarea>
          <div className="flex justify-end text-[#4D5562] my-1">
            <span>{inputValue.length}</span>/500
          </div>
        </section>
      </div>
      <div className="flex justify-between flex-row">
        <div className="flex flex-row self-center">
          <button
            onClick={langFromSound}
            className="p-[6px] border-[3px] mr-2 rounded-xl border-[#4D5562] border-solid"
          >
            <img src={SoundMaxFill} alt="Sound" className="size-full" />
          </button>
          <button
            onClick={langFromCopy}
            className="p-[6px] border-[3px] rounded-xl border-[#4D5562] border-solid"
          >
            <img src={Copy} alt="Copy" className="size-full" />
          </button>
        </div>
        <div
          onClick={() => {
            // setInputValue(inputValue.trimStart().length >= 1? inputValue.trimStart() : " ");
            setOutputValue(data || error);
            console.log(data || error);
          }}
        >
          <button className=" py-2 px-4 md:px-5 bg-[#3662E3] rounded-[12px] border border-[#CDD5E0] border-solid">
            <span className="underline mr-1 md:mr-2 lg:mr-3">A</span>
            Translate
          </button>
        </div>
      </div>
    </div>
  );
};

export default TranslateInput;
