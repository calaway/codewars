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
    value: card.slice(0, -1),
    suite: card.slice(-1),
    rank: cardRanks[card.slice(0, -1)],
  });
  const hand = [...holeCards, ...communityCards]
    .map(cardMetadata)
    .sort((cardA, cardB) => cardB.rank - cardA.rank);

  const valueTallies = (hand) => {
    return hand.reduce((memo, card) => {
      memo[card.value] ? (memo[card.value] += 1) : (memo[card.value] = 1);
      return memo;
    }, {});
  };

  const nothing = (hand) => ({
    type: "nothing",
    values: [],
    rankCardQuantity: 5,
  });

  const pair = (hand) => {
    const match = Object.entries(valueTallies(hand)).find(
      ([_value, count]) => count === 2
    );
    if (match) {
      const values = [match[0]];
      return { type: "pair", values, rankCardQuantity: 4 };
    }
    return false;
  };

  const twoPair = (hand) => {
    const match = Object.entries(valueTallies(hand)).filter(
      ([_value, count]) => count === 2
    );
    if (match.length > 1) {
      const values = match.map((pair) => pair[0]);
      return { type: "two pair", values, rankCardQuantity: 3 };
    }
    return false;
  };

  const threeOfAKind = (hand) => {
    const match = Object.entries(valueTallies(hand)).find(
      ([_value, count]) => count === 3
    );
    if (match) {
      values = [match[0]];
      return { type: "three-of-a-kind", values, rankCardQuantity: 3 };
    }
    return false;
  };

  const straight = (hand) => {
    const ranks = hand.map((card) => card.rank);
    const firstRank = ranks.find(
      (rank) =>
        ranks.includes(rank + 1) &&
        ranks.includes(rank + 2) &&
        ranks.includes(rank + 3) &&
        ranks.includes(rank + 4)
    );
    if (firstRank) {
      const allValues = [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
        "A",
      ];
      return {
        type: "straight",
        values: allValues.slice(firstRank - 2, firstRank + 3),
        rankCardQuantity: 5,
      };
    }
    return false;
  };

  const flush = (hand) => {
    const match = hand.find((comparableCard) => {
      const suiteCount = hand.filter(
        (card) => card.suite === comparableCard.suite
      ).length;
      return suiteCount >= 5;
    });
    if (match) {
      const values = hand
        .filter((card) => card.suite === match.suite)
        .map((card) => card.value);
      return { type: "flush", values, rankCardQuantity: 5 };
    }
    return false;
  };

  const fullHouse = (hand) => {
    const pairValues = pair(hand) && pair(hand).values;
    const threeOfAKindValues = threeOfAKind(hand) && threeOfAKind(hand).values;
    if (pairValues && threeOfAKindValues) {
      const values = [...pairValues, ...threeOfAKindValues];
      return { type: "full house", values, rankCardQuantity: 2 };
    }
    return false;
  };

  const fourOfAKind = (hand) => {
    const match = Object.entries(valueTallies(hand)).find(
      ([_value, count]) => count === 4
    );
    if (match) {
      const values = [match[0]];
      return { type: "four-of-a-kind", values, rankCardQuantity: 2 };
    }
    return false;
  };

  const straightFlush = (hand) => {
    let values = [];
    hand.some((comparableCard) => {
      const plus1 = hand.find(
        (card) =>
          card.suite === comparableCard.suite &&
          card.rank === comparableCard.rank + 1
      );
      const plus2 = hand.find(
        (card) =>
          card.suite === comparableCard.suite &&
          card.rank === comparableCard.rank + 2
      );
      const plus3 = hand.find(
        (card) =>
          card.suite === comparableCard.suite &&
          card.rank === comparableCard.rank + 3
      );
      const plus4 = hand.find(
        (card) =>
          card.suite === comparableCard.suite &&
          card.rank === comparableCard.rank + 4
      );
      if (plus1 && plus2 && plus3 && plus4) {
        values = [comparableCard, plus1, plus2, plus3, plus4].map(
          (card) => card.value
        );
        return true;
      }
      return false;
    });
    if (values.length !== 0) {
      return { type: "straight-flush", values: values, rankCardQuantity: 5 };
    }
    return false;
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

  const determineRanks = (hand, primaryValues, rankCardQuantity) => {
    const uniqueValues = (values) => [...new Set(values)];
    const uniqueRanking = (values) =>
      uniqueValues(values)
        .sort((a, b) => cardRanks[b] - cardRanks[a])
        .slice(0, 5);
    const primaryRanking = uniqueRanking(primaryValues);
    const secondaryRanking = uniqueRanking(hand.map((card) => card.value));
    const overallRanking = uniqueValues([
      ...primaryRanking,
      ...secondaryRanking,
    ]).slice(0, rankCardQuantity);
    return overallRanking;
  };

  const typeMetadata = determineType(hand);
  const type = typeMetadata.type;
  const ranks = determineRanks(
    hand,
    typeMetadata.values,
    typeMetadata.rankCardQuantity
  );

  return { type, ranks };
}

module.exports = hand;
