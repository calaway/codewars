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
  hand = [...holeCards, ...communityCards]
    .map(cardMetadata)
    .sort((cardA, cardB) => cardB.rank - cardA.rank);

  const valueCounts = (hand) => {
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
    const pairValue = Object.entries(valueCounts(hand)).find(
      ([_value, count]) => count === 2
    )?.[0];
    if (pairValue) {
      return { type: "pair", values: [pairValue], rankCardQuantity: 4 };
    }
    return false;
  };

  const twoPair = (hand) => {
    const pairValues = Object.entries(valueCounts(hand))
      .filter(([_value, count]) => count === 2)
      ?.map((pair) => pair[0]);
    if (pairValues.length > 1) {
      return { type: "two pair", values: pairValues, rankCardQuantity: 3 };
    }
    return false;
  };

  const threeOfAKind = (hand) => {
    const threeOfAKindValue = Object.entries(valueCounts(hand)).find(
      ([_value, count]) => count === 3
    )?.[0];
    if (threeOfAKindValue) {
      return {
        type: "three-of-a-kind",
        values: [threeOfAKindValue],
        rankCardQuantity: 3,
      };
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
    const suite = hand.find((comparableCard) => {
      const suiteCount = hand.filter(
        (card) => card.suite === comparableCard.suite
      ).length;
      return suiteCount >= 5;
    })?.suite;
    if (suite) {
      const values = hand
        .filter((card) => card.suite === suite)
        .map((card) => card.value);
      return { type: "flush", values: values, rankCardQuantity: 5 };
    }
    return false;
  };

  const fullHouse = (hand) => {
    const pairValues = pair(hand)?.values;
    const threeOfAKindValues = threeOfAKind(hand)?.values;
    if (pairValues && threeOfAKindValues) {
      return {
        type: "full house",
        values: [...pairValues, ...threeOfAKindValues],
        rankCardQuantity: 2,
      };
    }
    return false;
  };

  const fourOfAKind = (hand) => {
    const fourOfAKindValue = Object.entries(valueCounts(hand)).find(
      ([_value, count]) => count === 4
    )?.[0];
    if (fourOfAKindValue) {
      return {
        type: "four-of-a-kind",
        values: [fourOfAKindValue],
        rankCardQuantity: 2,
      };
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
