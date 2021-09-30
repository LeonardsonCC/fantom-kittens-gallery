import KittenCard from "./KittenCard";

export default function KittenGallery({ nfts, showRarityRank=false }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-items-center gap-y-10 w-full m-10">
      {nfts.map((nft, index) => (
        <div key={nft.tokenId} className="ml-3 mr-3">
          <KittenCard
            nft={nft}
            showRarityRank={showRarityRank}
          />
        </div>
      ))}
    </div>
  );
}
