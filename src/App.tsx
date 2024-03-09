
import TranslateInput from "./components/Translate Input";
import TranslateOutput from "./components/Translate Output";

const App = () => {
  return (
    <div className="min-h-screen font-DM-Sans bg-[url('./src/assets/images/hero_img.jpg')] bg-[#040711] bg-contain bg-no-repeat bg-fixed bg-top flex flex-col justify-center items-center">
      <div className="my-5">
        <img src="/logo.svg" alt="translated.io" />
      </div>

      <div className="flex flex-col lg:flex-row w-full justify-center items-center">
        <TranslateInput />
        <TranslateOutput />
      </div>
    </div>
  );
};

export default App;
