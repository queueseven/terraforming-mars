import { Colony, IColony } from '../../colonies/Colony';
import { Player } from '../../Player';
import { Game } from '../../Game';
import { ColonyName } from '../../colonies/ColonyName';
import { MAX_COLONY_TRACK_POSITION, PLAYER_DELEGATES_COUNT } from '../../constants';
import { SelectParty } from '../../interrupts/SelectParty';

export class Pallas extends Colony implements IColony {
    public name = ColonyName.PALLAS;
    public description: string = "Politics";

    public trade(player: Player, game: Game, usesTradeFleet: boolean = true): void {
        if (usesTradeFleet) this.beforeTrade(this, player, game);

        let qty: number = 0;

        if (this.trackPosition === MAX_COLONY_TRACK_POSITION) {
            qty = 3;
        } else if (this.trackPosition > 3) {
            qty = 2;
        } else if (this.trackPosition > 1) {
            qty = 1;
        }

        if (game.turmoil) {
            qty = Math.min(qty, game.turmoil.getDelegates(player.id));

            for (let i = 0; i < qty; i++) {
                game.addInterrupt(new SelectParty(player, game, "Select where to send delegate", 1, undefined, undefined, false));
            }
        }

        if (usesTradeFleet) this.afterTrade(this, player, game);
    }

    public onColonyPlaced(player: Player, game: Game): undefined {
        super.addColony(this, player, game);

        const turmoil = game.turmoil;
        if (turmoil) turmoil.addInfluenceBonus(player);

        return undefined;
    }
    
    public giveTradeBonus(player: Player, game: Game): void {
        const turmoil = game.turmoil;
        
        if (turmoil) {
            let partyDelegateCount = PLAYER_DELEGATES_COUNT - turmoil.getDelegates(player.id);
            if (turmoil.chairman === player.id) partyDelegateCount--;
            
            player.megaCredits += partyDelegateCount;
        }
    }   
}