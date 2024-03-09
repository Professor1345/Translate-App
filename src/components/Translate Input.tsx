// import { useState } from "react";
import { useState } from "react";
import { Language } from "../Language data";

const TranslateInput = () => {
  // const [buttonLang, setButtonLang] = useState(Language);
  const [active, setActive] = useState("English");
  const [inputValue, setInputValue] = useState("Hello, how are you?");
  // const [selectedOption, setSelectedOption] = useState("English");
  return (
    <div className="translate-input">
      <header className="text-[#4D5562] ">
        {Language.slice(0, 3).map((language, index) => {
          return (
            <button
              key={index}
              value={language.langCode}
              className={`my-2 mr-5 p-3 rounded-2xl ${
                active === language.lang ? "bg-[#4D5562] text-[#F9FAFB]" : null
              }`}
              onClick={() => setActive(language.lang)}
            >
              {language.lang}
            </button>
          );
        })}
        <select
          id="others"
          className={`my-2 mr-5 p-3 rounded-2xl bg-transparent outline-none focus:outline-none w-24 cursor-pointer ${
            active === "Others" ? "bg-gray-500 text-[#F9FAFB]" : null
          }`}
          onChange={() => setActive("Others")}
        >
          {Language.slice(3).map((language, index) => {
            return (
              <option
                key={index}
                value={language.langCode}
                className="text-white bg-[#212936cc] w-full max-h-[20%] overflow-y-auto"
              >
                {language.lang}
              </option>
            );
          })}
        </select>
      </header>
      <hr className="border-[#4D5562]" />
      <section className="mt-5">
        <textarea
          id=""
          cols={50}
          rows={8}
          maxLength={500}
          value={inputValue}
          className="w-full bg-transparent focus:outline-none resize-none"
          onChange={(e) => setInputValue(e.target.value)}
        ></textarea>
        <div className="flex justify-end text-[#4D5562]">
          <span>{inputValue.length}</span>/500
        </div>
      </section>
    </div>
  );
};

export default TranslateInput;
