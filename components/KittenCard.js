import kittensTraitsCount from "../utils/KittensTraitsCount.json";

export default function KittenCard({ nft }) {
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
      <div className="mt-5">
        <div className="nes-container is-rounded ">
          <p>Attributes</p>
          <ul className="nes-list is-disc">
            {nft.attributes.map((attr) => {
              const traitIndex = kittensTraitsCount[attr.trait_type].findIndex(item => item.value === String(attr.value));
              return (
                <li key={attr.trait_type} className="flex justify-between text-xs">
                  <span>
                    {attr.trait_type}: {attr.value}
                  </span>
                  {attr.trait_type !== "RGB" ? (
                    <span className="text-blue-500">
                      ({kittensTraitsCount[attr.trait_type][traitIndex]?.count})
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
