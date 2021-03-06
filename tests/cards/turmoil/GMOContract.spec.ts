import { expect } from "chai";
import { GMOContract } from "../../../src/cards/turmoil/GMOContract";
import { Player } from "../../../src/Player";
import { Color } from "../../../src/Color";
import { GameOptions, Game } from "../../../src/Game";
import { PartyName } from "../../../src/turmoil/parties/PartyName";
import { setCustomGameOptions } from "../../TestingUtils";

describe("GMOContract", function () {
    it("Should play", function () {
        const card = new GMOContract();
        const player = new Player("test", Color.BLUE, false);
        const gameOptions = setCustomGameOptions() as GameOptions;
        const game = new Game("foobar", [player], player, gameOptions);  

        if (game.turmoil !== undefined) {
            game.turmoil.rulingParty = game.turmoil.getPartyByName(PartyName.REDS);
            expect(card.canPlay(player, game)).to.eq(false);
            let greens = game.turmoil.getPartyByName(PartyName.GREENS);
            if (greens !== undefined) {
                greens.delegates.push(player.id, player.id);
                expect(card.canPlay(player, game)).to.eq(true); 
            }
            card.play();
            card.onCardPlayed(player,game,card);
            expect(player.megaCredits).to.eq(2);
        } 
    });
});
