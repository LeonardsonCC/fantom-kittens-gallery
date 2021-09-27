import traits from "../utils/KittensTraitsCount.json";

const MINTED_KITTENS = 419;

export default function KittenCard({ nft }) {
  const getTraitPercentage = (count) => {
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

  const getRarityScore = () => {
    const score = nft.attributes.reduce((acc, attr) => {
      const index = traits[attr.trait_type].findIndex((item) => {
        return item.value === String(attr.value);
      });

      return (acc += getTraitScore(traits[attr.trait_type][index]?.count));
    }, 0);

    return score.toFixed(2);
  };

  return (
    <section
      className={`nes-container with-title is-rounded flex flex-col items-center`}
    >
      <p className="title">{nft.name}</p>
      <img
        alt={`FakeKitten #${nft.tokenId}`}
        src={nft.imageUrl}
        style={{ maxHeight: 150, maxWidth: 150 }}
      />
      <span className={"mt-5"}>{nft.name}</span>

      <span className={"mt-5 text-blue-500"}>
        Rarity Score {getRarityScore()}
      </span>
      <div className="mt-5 ">
        <div className="nes-container is-rounded ">
          <p>Attributes</p>
          <ul className="nes-list is-disc">
            {nft.attributes.map((attr) => {
              const traitIndex = traits[attr.trait_type].findIndex(
                (item) => item.value === String(attr.value)
              );
              return (
                <li
                  key={attr.trait_type}
                  className="flex justify-between text-xs"
                >
                  <span>
                    {attr.trait_type}: {attr.value}
                  </span>
                  {attr.trait_type !== "RGB" ? (
                    <span className="text-blue-500">
                      (
                      {getTraitPercentage(
                        traits[attr.trait_type][traitIndex]?.count
                      )}
                      %)
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <a
        href={`https://paintswap.finance/nfts/assets/${nft.address}/${nft.tokenId}`}
        target="_blank"
        rel="noreferrer"
        className="nes-btn is-primary mt-5"
      >
        PaintSwap
      </a>
      <a
        href={`https://artion.io/explore/${nft.address}/${nft.tokenId}`}
        target="_blank"
        rel="noreferrer"
        className="nes-btn is-primary mt-5"
      >
        Artion
      </a>
    </section>
  );
}
