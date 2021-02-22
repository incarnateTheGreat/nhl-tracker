import { createContext } from "react";
import { IGame } from "../intefaces/Game.interface";

export interface INHLInterface {
  gameData: IGame;
  liveData: IGame;
  gameContent: IGame;
  goalsObjData: Array<object>;
  penaltiesObjData: Array<object>;
  headToHeadData: IGame;
}

export default createContext({} as IGame);
