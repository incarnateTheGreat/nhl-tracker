import { createContext } from "react";
import {
  IGameData,
  ILiveData,
  IGameContent,
} from "../intefaces/Game.interface";

export interface INHLInterface {
  gameData: IGameData;
  liveData: ILiveData;
  contentData: IGameContent | undefined;
  goalsObjData: Array<object>;
  penaltiesObjData: Array<object>;
  headToHeadData: IGameData | undefined;
}

export default createContext({} as INHLInterface);
