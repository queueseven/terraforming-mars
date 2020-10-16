
import { CardModel } from "./CardModel";
import { ClaimedMilestoneModel } from "./ClaimedMilestoneModel";
import { ColonyModel } from "./ColonyModel";
import { Color } from "../Color";
import { IProjectCard } from "../cards/IProjectCard";
import { CorporationCard } from "../cards/corporation/CorporationCard";
import { FundedAwardModel } from "./FundedAwardModel";
import { Phase } from "../Phase";
import { PlayerInputModel } from "./PlayerInputModel";
import { PublicPlayerModel } from "./PublicPlayerModel";
import { SpaceModel } from "./SpaceModel";

export interface PlayerModel extends PublicPlayerModel {
    awards: Array<FundedAwardModel>;
    boardName: string;
    cardCost: number;
    cardsInHand: Array<CardModel>;
    colonies: Array<ColonyModel>;
    dealtCorporationCards: Array<CorporationCard>;
    dealtPreludeCards: Array<IProjectCard>;
    dealtProjectCards: Array<IProjectCard>;
    draftedCards: Array<CardModel>;
    gameAge: number;
    generation: number;
    oceans: number;
    oxygenLevel: number;
    initialDraft: boolean;
    isSoloModeWin: boolean;
    milestones: Array<ClaimedMilestoneModel>;
    passedPlayers: Array<Color>;
    phase: Phase;
    players: Array<PublicPlayerModel>;
    spaces: Array<SpaceModel>;
    temperature: number;
    waitingFor: PlayerInputModel | undefined;
}
