
import { expect } from "chai";
import { PhysicsComplex } from "../../src/cards/PhysicsComplex";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";

describe("PhysicsComplex", function () {
    it("Can't act", function () {
        const card = new PhysicsComplex();
        const player = new Player("test", Color.BLUE, false);
        expect(card.canAct(player)).to.eq(false);
    });
    it("Should play", function () {
        const card = new PhysicsComplex();
        const player = new Player("test", Color.BLUE, false);
        const action = card.play();
        expect(action).to.eq(undefined);
        card.scienceResources = 4;
        card.onGameEnd(player);
        expect(player.victoryPoints).to.eq(8);
    });
    it("Should act", function () {
        const card = new PhysicsComplex();
        const player = new Player("test", Color.BLUE, false);
        player.energy = 6;
        const action = card.action(player);
        expect(player.energy).to.eq(0);
        expect(card.scienceResources).to.eq(1);
        expect(action).to.eq(undefined);
    });
});
