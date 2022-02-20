function hand(holeCards, communityCards) {
  const cardMetadata = (card) => ({
    full: card,
    value: card.slice(0, -1),
    suite: card.slice(-1),
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
    return Object.values(valueCounts(hand)).some((count) => count === 2);
  };

  const hasTwoPair = (hand) => {
    const pairCount = Object.values(valueCounts(hand)).filter(
      (count) => count >= 2
    ).length;
    return pairCount > 1;
  };

  const hasThreeOfAKind = (hand) => {
    return Object.values(valueCounts(hand)).some((count) => count === 3);
  };

  const hasStraight = (hand) => {
    const ranks = hand.map((card) => cardRanks[card.value]);
    return ranks.some(
      (rank) =>
        ranks.includes(rank + 1) &&
        ranks.includes(rank + 2) &&
        ranks.includes(rank + 3) &&
        ranks.includes(rank + 4)
    );
  };

  const hasFlush = (hand) => {
    return hand.some((comparableCard) => {
      const suiteCount = hand.filter(
        (card) => card.suite === comparableCard.suite
      ).length;
      return suiteCount >= 5;
    });
  };

  const hasFullHouse = (hand) => {
    return hasThreeOfAKind(hand) && hasTwoPair(hand);
  };

  const hasFourOfAKind = (hand) => {
    return Object.values(valueCounts(hand)).some((count) => count === 4);
  };

  const hasStraightFlush = (hand) => {
    return hand.some((comparableCard) => {
      const hasPlus1 = hand.some(
        (card) =>
          card.suite === comparableCard.suite &&
          cardRanks[card.value] === cardRanks[comparableCard.value] + 1
      );
      const hasPlus2 = hand.some(
        (card) =>
          card.suite === comparableCard.suite &&
          cardRanks[card.value] === cardRanks[comparableCard.value] + 2
      );
      const hasPlus3 = hand.some(
        (card) =>
          card.suite === comparableCard.suite &&
          cardRanks[card.value] === cardRanks[comparableCard.value] + 3
      );
      const hasPlus4 = hand.some(
        (card) =>
          card.suite === comparableCard.suite &&
          cardRanks[card.value] === cardRanks[comparableCard.value] + 4
      );
      return hasPlus1 && hasPlus2 && hasPlus3 && hasPlus4;
    });
  };

  const type = (hand) => {
    if (hasStraightFlush(hand)) return "straight-flush";
    if (hasFourOfAKind(hand)) return "four-of-a-kind";
    if (hasFullHouse(hand)) return "full house";
    if (hasFlush(hand)) return "flush";
    if (hasStraight(hand)) return "straight";
    if (hasThreeOfAKind(hand)) return "three-of-a-kind";
    if (hasTwoPair(hand)) return "two pair";
    if (hasPair(hand)) return "pair";
    return "nothing";
  };

  const uniqueValues = [...new Set(fullHand.map((card) => card.value))];
  // const ranks = uniqueValues
  //   .sort((a, b) => cardRanks[b] - cardRanks[a])
  //   .slice(0, 5);

  return { type: type(fullHand) };
}

module.exports = hand;
