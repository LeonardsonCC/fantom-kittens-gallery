export default function KittenCard({ nft }) {
  return (
    <section style={{borderImageRepeat: "stretch"}} className={`nes-container with-title is-rounded flex flex-col items-center`}>
      <p className="title">{nft.name}</p>
      <img
        alt={`FakeKitten #${nft.tokenId}`}
        src={nft.imageUrl}
        style={{ maxHeight: 150, maxWidth: 150 }}
      />
      <span className={"mt-5"}>
        {nft.name}
      </span>
      <div className="mt-5">
        <div style={{borderImageRepeat: "stretch"}} className="nes-container is-rounded ">
          <p>Attributes</p>
          <ul className="nes-list is-disc">
            {nft.attributes.map((attr) => {
              return (
                <li key={attr.trait_type}>
                  {attr.trait_type}: {attr.value}
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
    </section>
  );
}
