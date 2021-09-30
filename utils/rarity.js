import traits from "../utils/KittensTraitsCount.json";

export const MINTED_KITTENS = 419;

export const getTraitPercentage = (count) => {
  return ((count / MINTED_KITTENS) * 100).toFixed(2);
};

/**
 *
 * Rarity score math = 1 / (items with given attribute / total supply)
 *
 * @param {number} count number of kittens with a given attribute
 * @returns rarity score
 *
 */
const getTraitScore = (count) => {
  return 1 / (count / MINTED_KITTENS);
};

export const getRarityScore = (attributes) => {
  const score = attributes.reduce((acc, attr) => {
    const index = traits[attr.trait_type].findIndex((item) => {
      return item.value === String(attr.value);
    });

    return (acc += getTraitScore(traits[attr.trait_type][index]?.count));
  }, 0);

  return score.toFixed(2);
};
