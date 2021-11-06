import traits from "../utils/KittensTraitsCount.json";
import { getRarityScore, getTraitPercentage } from "../utils/rarity";

export default function KittenCard({ nft, showRarityRank = false }) {
  const kittenColor = nft.attributes.find((attr) => attr.trait_type === "RGB").value;

  return (
    <section
      className={`nes-container is-dark with-title is-rounded flex flex-col items-center`}
      style={{ color: kittenColor }}
    >
      <p>{nft.name}</p>
      <br />
      <img
        alt={`FakeKitten #${nft.tokenId}`}
        src={nft.imageUrl}
        style={{ maxHeight: 256, maxWidth: 256 }}
      />
      {showRarityRank ? (
        <span className={"mt-5"}>#{nft.rarityRank} rarity rank</span>
      ) : null}

      <span className={"mt-5"}>
        Rarity Score {getRarityScore(nft.attributes)}
      </span>
      <div className="mt-5 ">
        <div className="nes-container is-rounded" style={{ color: kittenColor }}>
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
                    {attr.trait_type === "Eye Frame" && "Eyes"}
                    {attr.trait_type === "Ear Frame" && "Ears"}
                    {attr.trait_type === "Mouth Frame" && "Mouth"}
                    {attr.trait_type === "Glass Frame" && "Glasses"}{" "}
                    <b>{attr.value}</b>{" "}
                  </span>
                  {attr.trait_type !== "RGB" ? (
                    <span className="text-white ml-2">
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
