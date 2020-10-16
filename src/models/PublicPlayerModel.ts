
import { CardModel } from "./CardModel";
import { Color } from "../Color";
import { ITagCount } from "../ITagCount";
import { TurmoilModel } from "./TurmoilModel";
import { VictoryPointsBreakdown } from "../VictoryPointsBreakdown";

export interface PublicPlayerModel {
    actionsTakenThisRound: number;
    actionsThisGeneration: Array<string>;
    corporationCard: CardModel | undefined;
    playedCards: Array<CardModel>;
    cardsInHandNbr: number;
    citiesCount: number;
    coloniesCount: number;
    coloniesExtension: boolean;
    color: Color;
    deckSize: number;
    id: string | undefined;
    influence: number;
    energy: number;
    energyProduction: number;
    fleetSize: number;
    heat: number;
    heatProduction: number;
    isActive: boolean;
    megaCredits: number;
    megaCreditProduction: number;
    name: string;
    needsToDraft: boolean | undefined;
    noTagsCount: number;
    plants: number;
    plantProduction: number;
    preludeExtension: boolean;
    selfReplicatingRobotsCards: Array<CardModel>;
    showOtherPlayersVP: boolean;
    steel: number;
    steelProduction: number;
    steelValue: number;
    tags: Array<ITagCount>;
    terraformRating: number;
    tradesThisTurn: number;
    titanium: number;
    titaniumProduction: number;
    titaniumValue: number;
    turmoil: TurmoilModel | undefined;
    venusNextExtension: boolean;
    venusScaleLevel: number;
    victoryPointsBreakdown: VictoryPointsBreakdown;
}
