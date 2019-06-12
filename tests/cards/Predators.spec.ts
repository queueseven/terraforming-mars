
import { expect } from "chai";
import { Predators } from "../../src/cards/Predators";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";

describe("Predators", function () {
    it("Can not play", function () {
        const card = new Predators();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player], player);
        expect(card.canAct(player, game)).to.eq(false);
    });
    it("Should play", function () {
        const card = new Predators();
        const player = new Player("test", Color.BLUE, false);
        const action = card.play();
        expect(action).to.eq(undefined);
        card.animals = 5;
        card.onGameEnd(player);
        expect(player.victoryPoints).to.eq(5);
    });
    it("Should act", function () {
        const card = new Predators();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player], player);
        player.playedCards.push(card);
        card.animals = 1;
        const action = card.action(player, game);
        expect(action).not.to.eq(undefined);
        action.cb(action.cards);
        expect(card.animals).to.eq(1);
    });
});
