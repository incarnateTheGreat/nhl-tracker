import { createContext } from "react";
interface IDate {
  selectedDate: string;
  dispatch: any;
}

export default createContext({} as IDate);
