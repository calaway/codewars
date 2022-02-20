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

  const valueCounts = (hand) => {
    return hand.reduce((memo, card) => {
      memo[card.value] ? (memo[card.value] += 1) : (memo[card.value] = 1);
      return memo;
    }, {});
  };

  const hasPair = (hand) => {
    const pairCount = Object.values(valueCounts(hand)).filter(
      (count) => count === 2
    ).length;
    return pairCount === 1;
  };

  const hasTwoPair = (hand) => {
    const pairCount = Object.values(valueCounts(hand)).filter(
      (count) => count === 2
    ).length;
    return pairCount > 1;
  };

  const type = (hand) => {
    if (hasTwoPair(hand)) return "two pair";
    if (hasPair(hand)) return "pair";
    return "nothing";
  };

  const uniqueValues = [...new Set(fullHand.map((card) => card.value))];
  const ranks = uniqueValues
    .sort((a, b) => cardRanks[b] - cardRanks[a])
    .slice(0, 5);

  return { type: type(fullHand) };
}

module.exports = hand;
