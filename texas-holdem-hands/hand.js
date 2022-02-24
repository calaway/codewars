function hand(holeCards, communityCards) {
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
  const cardMetadata = (card) => ({
    full: card,
    value: card.slice(0, -1),
    suite: card.slice(-1),
    rank: cardRanks[card.slice(0, -1)],
  });
  fullHand = [...holeCards, ...communityCards].map(cardMetadata);

  const valueCounts = (hand) => {
    return hand.reduce((memo, card) => {
      memo[card.value] ? (memo[card.value] += 1) : (memo[card.value] = 1);
      return memo;
    }, {});
  };

  const nothing = (hand) => ({
    type: "nothing",
    typeRanks: [],
    typeCardCound: 0,
  });

  const pair = (hand) => {
    const pairValue = Object.entries(valueCounts(hand)).find(
      ([_value, count]) => count === 2
    )?.[0];
    if (pairValue) {
      return { type: "pair", typeRanks: [pairValue], typeCardCound: 2 };
    }
    return false;
  };

  const twoPair = (hand) => {
    const pairCount = Object.values(valueCounts(hand)).filter(
      (count) => count >= 2
    ).length;
    return pairCount > 1;
  };

  const threeOfAKind = (hand) => {
    return Object.values(valueCounts(hand)).some((count) => count === 3);
  };

  const straight = (hand) => {
    const ranks = hand.map((card) => card.rank);
    return ranks.some(
      (rank) =>
        ranks.includes(rank + 1) &&
        ranks.includes(rank + 2) &&
        ranks.includes(rank + 3) &&
        ranks.includes(rank + 4)
    );
  };

  const flush = (hand) => {
    return hand.some((comparableCard) => {
      const suiteCount = hand.filter(
        (card) => card.suite === comparableCard.suite
      ).length;
      return suiteCount >= 5;
    });
  };

  const fullHouse = (hand) => {
    return threeOfAKind(hand) && twoPair(hand);
  };

  const fourOfAKind = (hand) => {
    return Object.values(valueCounts(hand)).some((count) => count === 4);
  };

  const straightFlush = (hand) => {
    return hand.some((comparableCard) => {
      const hasPlus1 = hand.some(
        (card) =>
          card.suite === comparableCard.suite &&
          card.rank === comparableCard.rank + 1
      );
      const hasPlus2 = hand.some(
        (card) =>
          card.suite === comparableCard.suite &&
          card.rank === comparableCard.rank + 2
      );
      const hasPlus3 = hand.some(
        (card) =>
          card.suite === comparableCard.suite &&
          card.rank === comparableCard.rank + 3
      );
      const hasPlus4 = hand.some(
        (card) =>
          card.suite === comparableCard.suite &&
          card.rank === comparableCard.rank + 4
      );
      return hasPlus1 && hasPlus2 && hasPlus3 && hasPlus4;
    });
  };

  const determineType = (hand) => {
    return (
      straightFlush(hand) ||
      fourOfAKind(hand) ||
      fullHouse(hand) ||
      flush(hand) ||
      straight(hand) ||
      threeOfAKind(hand) ||
      twoPair(hand) ||
      pair(hand) ||
      nothing(hand)
    );
  };

  const determineRanks = (hand, typeRanks, typeCardCound) => {
    const uniqueValues = (values) => [...new Set(values)];
    const uniqueRanking = (values) =>
      uniqueValues(values)
        .sort((a, b) => cardRanks[b] - cardRanks[a])
        .slice(0, 5);
    const typeRanking = uniqueRanking(typeRanks);
    const secondaryRanking = uniqueRanking(
      hand.map((card) => card.value)
    ).slice(0, 6 - typeCardCound);
    const overallRanking = uniqueValues([...typeRanking, ...secondaryRanking]);
    return overallRanking;
  };

  const typeMetadata = determineType(fullHand);
  const type = typeMetadata.type;
  const ranks = determineRanks(
    fullHand,
    typeMetadata.typeRanks,
    typeMetadata.typeCardCound
  );

  return { type, ranks };
}

module.exports = hand;
