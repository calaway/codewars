function hand(holeCards, communityCards) {
  const cardMetadata = (card) => ({
    full: card,
    value: card[0],
    suite: card[1],
  });
  fullHand = [...holeCards, ...communityCards].map(cardMetadata);
  const cardRanks = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  };

  const hasPair = (hand) => {
    values = hand.map((card) => card.value);
    return values.some(
      (value) => values.indexOf(value) !== values.lastIndexOf(value)
    );
  };

  const type = (hand) => {
    if (hasPair(hand)) {
      return "pair";
    }
    return "nothing";
  };

  const uniqueValues = [...new Set(fullHand.map((card) => card.value))];
  const ranks = uniqueValues
    .sort((a, b) => cardRanks[b] - cardRanks[a])
    .slice(0, 5);

  return { type: type(fullHand) };
}

module.exports = hand;
