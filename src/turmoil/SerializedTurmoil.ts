import { IParty } from "./parties/IParty";
import { GlobalEventDealer } from "./globalEvents/GlobalEventDealer";
import { IGlobalEvent } from "./globalEvents/IGlobalEvent";
import { Color } from "../Color";

export interface SerializedTurmoil {
    chairman: undefined | Color;
    rulingParty: undefined | IParty;
    dominantParty: undefined | IParty;
    lobby: Set<string>;
    delegate_reserve: Array<Color>;
    parties: Array<IParty>;
    playersInfluenceBonus: Map<string, number>;
    globalEventDealer: GlobalEventDealer;
    distantGlobalEvent: IGlobalEvent | undefined;
    commingGlobalEvent: IGlobalEvent | undefined;
    currentGlobalEvent: IGlobalEvent | undefined;
}
