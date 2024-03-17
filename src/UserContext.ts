/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";

interface UserContextValue {
  inputValue: string;
  setInputValue: (value : string) => void;
  langFrom: string;
  setLangFrom: (value : string) => void;
  langTo: string;
  setLangTo: (value : string) => void;
  outputValue: string;
  setOutputValue: (value : string) => void;
  data: any; // Adjust the type accordingly
  error: any; // Adjust the type accordingly
}

const UserContext = createContext<UserContextValue | null>(null);

export default UserContext;
