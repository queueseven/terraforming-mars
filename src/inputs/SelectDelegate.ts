
import { PlayerInput } from "../PlayerInput";
import { NeutralPlayer, Player } from "../Player";
import { PlayerInputTypes } from "../PlayerInputTypes";

export class SelectDelegate implements PlayerInput {
    public inputType: PlayerInputTypes = PlayerInputTypes.SELECT_DELEGATE;
    public buttonLabel: string = "Save";
    constructor(public players: Array<Player | NeutralPlayer>, public title: string, public cb: (player: Player | NeutralPlayer) => PlayerInput | undefined) {

    }
}
