import KittenCard from "./KittenCard";

export default function KittenGallery({ nfts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-y-10 w-full m-10">
      {nfts.map((nft, index) => (
        <div key={nft.tokenId}>
          <KittenCard
            nft={nft}
          />
        </div>
      ))}
    </div>
  );
}
