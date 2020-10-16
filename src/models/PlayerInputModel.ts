
import { PlayerInputTypes } from "../PlayerInputTypes";
import { CardModel } from './CardModel';
import { ColonyModel } from "./ColonyModel";
import { Color } from "../Color";

export interface PlayerInputModel {
    amount: number | undefined;
    availableSpaces: Array<string> | undefined;
    canUseHeat: boolean | undefined;
    canUseSteel: boolean | undefined;
    canUseTitanium: boolean | undefined;
    cards: Array<CardModel> | undefined;
    inputType: PlayerInputTypes;
    options: Array<PlayerInputModel> | undefined;
    max: number | undefined;
    maxCardsToSelect: number | undefined;
    microbes: number | undefined;
    floaters: number | undefined;
    minCardsToSelect: number | undefined;
    players: Array<Color> | undefined;
    title: string;
    buttonLabel: string;
    coloniesModel : Array<ColonyModel> | undefined;
}

