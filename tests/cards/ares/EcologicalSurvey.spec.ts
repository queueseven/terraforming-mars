import { EcologicalSurvey } from "../../../src/cards/ares/EcologicalSurvey";
import { Color } from "../../../src/Color";
import { Game } from "../../../src/Game";
import { Player } from "../../../src/Player";
import { expect } from "chai";
import { ALL_ADJACENCY_BONUSES, ARES_GAME_OPTIONS, AresTestHelper } from "../../ares/AresTestHelper";
import { TileType } from "../../../src/TileType";
import { Ants } from "../../../src/cards/Ants";
import { Pets } from "../../../src/cards/Pets";
import { EmptyBoard } from "../../ares/EmptyBoard";

describe("EcologicalSurvey", function () {
  let card : EcologicalSurvey, player : Player, game : Game;

  beforeEach(function() {
    card = new EcologicalSurvey();
    player = new Player("test", Color.BLUE, false);
    game = new Game("foobar", [player, player], player, ARES_GAME_OPTIONS);
    game.board = new EmptyBoard();
  });

  it("Can play", function () {
      AresTestHelper.addGreenery(game, player);
      expect(card.canPlay(player, game)).is.false;

      AresTestHelper.addGreenery(game, player);
      expect(card.canPlay(player, game)).is.false;

      AresTestHelper.addGreenery(game, player);
      expect(card.canPlay(player, game)).is.true;
  });

  // This doesn't test anything about this card, but about the behavior this card provides, from
  // AresHandler.
  it("Bonus in the field", function() {
    // tile types in this test are irrelevant.
    // What's key is that this space has a weird behavior - it grants all the bonuses.
    // Only three of them will grant additional bonuses: plants, animals, and microbes.
    var firstSpace = game.board.getAvailableSpacesOnLand(player)[0];
    firstSpace.adjacency = { bonus: ALL_ADJACENCY_BONUSES };
    firstSpace.player = player;

    var microbeCard = new Ants();
    var animalCard = new Pets();

    player.playedCards = [card, microbeCard, animalCard];

    // firstSpace tile might grant resources, so resetting all the resource values.
    player.megaCredits = 0;
    player.titanium = 0;
    player.steel = 0;
    player.heat = 0;
    player.energy = 0;
    player.plants = 0;
    player.cardsInHand = [];
    microbeCard.resourceCount = 0;
    animalCard.resourceCount = 0;

    var adjacentSpace = game.board.getAdjacentSpaces(firstSpace)[0];
    game.addTile(player, adjacentSpace.spaceType, adjacentSpace, {tileType: TileType.GREENERY});

    expect(player.megaCredits).eq(2);
    expect(player.titanium).eq(1);
    expect(player.steel).eq(1);
    expect(player.heat).eq(1);
    expect(player.energy).eq(1);
    expect(player.plants).eq(2);
    expect(player.cardsInHand).is.length(1);
    expect(microbeCard.resourceCount).eq(2);
    expect(animalCard.resourceCount).eq(2);
  });
});
