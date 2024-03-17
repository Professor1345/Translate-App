// import { useState } from "react";
import { useContext, useEffect, useState } from "react";
import { Language } from "../Language data";
import {
  Copy,
  ExpandDown,
  HorizontalTLM,
  SoundMaxFill,
} from "../assets/images";
import UserContext from "../UserContext";

const TranslateOutput = () => {
  // const [buttonLang, setButtonLang] = useState(Language);
  const [active, setActive] = useState<string>("French");

  const [otherLangs, setOtherLangs] = useState<string>("Spanish");
  const [otherLangsToggle, setOtherLangsToggle] = useState<boolean>(false);

  const { langTo, setLangTo, outputValue, setOutputValue } =
    useContext(UserContext) || {};

    if (!setLangTo || !setOutputValue) {
      throw new Error("imported values are not available in UserContext");
    }
  useEffect(() => {
    console.log(langTo);
  }, [langTo]);
  // const [selectedOption, setSelectedOption] = useState("English");
  const langToSound = () => {
    if ("speechSynthesis" in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(outputValue);

      // const voices = synthesis.getVoices();
      // if (voices.length > 0) {
      //   utterance.voice = voices[2];
      // } else {
      //   alert("No voices available")
      // }

      const voices = synthesis.getVoices();
    const selectedVoice = voices.find(voice => voice.lang.includes(langTo || "")); // Find the voice that matches the language code
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else {
      alert("No voice available for the selected language");
    }
      console.log(utterance);
      // utterance.lang = langTo;
      synthesis.speak(utterance);
    }
  };

  const langToCopy = () => {
    const text = outputValue || "";
    
    if(navigator.clipboard){
    navigator.clipboard.writeText(text);}
    else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    alert("Copied: " + text);
  };
  return (
    <div className="translate-output flex flex-col justify-between">
      <div>
        <header className="text-[#4D5562] flex flex-row justify-between">
          <div className="flex flex-wrap">
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
                    // console.log(langTo);
                    setLangTo(language.langCode);
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
                        setLangTo(language.langCode);
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
              className={`mb-1 sm:mb-2 md:mb-3 lg:mb-3 mr-1 md:mr-2 lg:mr-4 py-2 px-3 rounded-[14px] outline-none focus:outline-none w-24 cursor-pointer ${
                active === "Others"
                  ? "bg-[#4D5562] text-[#F9FAFB]"
                  : "bg-transparent"
              }`}
              // onClick={}
              onLoad={() => {setLangTo("ar")}}
              onFocus={() => {
                setLangTo("ar");
              }}
              onChange={(e) => {
                setActive("Others");
                console.log(e.target.value);
                setLangTo(e.target.value);
              }}
            >
              {Language.slice(3).map((language, index) => {
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
          </div>
          <button className="self-start p-[6px] border-[3px] rounded-xl border-[#4D5562] border-solid">
            <img src={HorizontalTLM} alt="Copy" className="size-full" />
          </button>
        </header>
        <hr className="border-[#4D5562] my-2 sm:my-1" />
        <section className="mt-5 ">
          <textarea
            id="text"
            cols={50}
            rows={10}
            value={outputValue || ""}
            disabled
            className="w-full bg-transparent focus:outline-none resize-none"
            onChange={(e) => setOutputValue(e.target.value)}
          ></textarea>
        </section>
      </div>
      <div  className="flex flex-row">
        <button onClick={langToSound} className="p-[6px] border-[3px] mr-2 rounded-xl border-[#4D5562] border-solid">
          <img src={SoundMaxFill} alt="Sound" className="size-full" />
        </button>
        <button
          onClick={langToCopy}
          className="p-[6px] border-[3px] rounded-xl border-[#4D5562] border-solid"
        >
          <img src={Copy} alt="Copy" className="size-full" />
        </button>
      </div>
    </div>
  );
};

export default TranslateOutput;
