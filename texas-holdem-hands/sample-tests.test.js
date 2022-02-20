const hand = require("./hand");

describe("Execute Example Tests", function () {
  it("Let's play!", function () {
    expect(hand(["K♠", "A♦"], ["J♣", "Q♥", "9♥", "2♥", "3♦"])).toEqual({
      type: "nothing",
      ranks: ["A", "K", "Q", "J", "9"],
    });
    expect(hand(["K♠", "Q♦"], ["J♣", "Q♥", "9♥", "2♥", "3♦"])).toEqual({
      type: "pair",
      ranks: ["Q", "K", "J", "9"],
    });
    expect(hand(["K♠", "J♦"], ["J♣", "K♥", "9♥", "2♥", "3♦"])).toEqual({
      type: "two pair",
      ranks: ["K", "J", "9"],
    });
    expect(hand(["4♠", "9♦"], ["J♣", "Q♥", "Q♠", "2♥", "Q♦"])).toEqual({
      type: "three-of-a-kind",
      ranks: ["Q", "J", "9"],
    });
    expect(hand(["Q♠", "2♦"], ["J♣", "10♥", "9♥", "K♥", "3♦"])).toEqual({
      type: "straight",
      ranks: ["K", "Q", "J", "10", "9"],
    });
    expect(hand(["A♠", "K♦"], ["J♥", "5♥", "10♥", "Q♥", "3♥"])).toEqual({
      type: "flush",
      ranks: ["Q", "J", "10", "5", "3"],
    });
    expect(hand(["A♠", "A♦"], ["K♣", "K♥", "A♥", "Q♥", "3♦"])).toEqual({
      type: "full house",
      ranks: ["A", "K"],
    });
    expect(hand(["2♠", "3♦"], ["2♣", "2♥", "3♠", "3♥", "2♦"])).toEqual({
      type: "four-of-a-kind",
      ranks: ["2", "3"],
    });
    expect(hand(["8♠", "6♠"], ["7♠", "5♠", "9♠", "J♠", "10♠"])).toEqual({
      type: "straight-flush",
      ranks: ["J", "10", "9", "8", "7"],
    });
  });
});
