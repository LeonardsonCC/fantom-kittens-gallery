import { useEffect, useState } from "react";
import KittenGallery from "../components/KittenGallery";
import { extractAttrsFromName, kittensDict } from "../utils/fantomKittensDict";
import { getRarityScore } from "../utils/rarity";
import Link from "next/link";

export default function RarityRank() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    let kittens = Object.keys(kittensDict).map((kittenId) => {
      return {
        tokenId: kittenId,
        name: `Fantom Kitten #${kittenId}`,
        attributes: extractAttrsFromName(kittensDict[kittenId]),
        address: "0xfd211f3b016a75bc8d73550ac5adc2f1cae780c0",
        imageUrl: `https://kittens.fakeworms.studio/assets/${kittensDict[kittenId]}`,
        rarity: getRarityScore(extractAttrsFromName(kittensDict[kittenId])),
      };
    });
    setNfts(
      kittens.sort((itemA, itemB) => {
        if (Number(itemA.rarity) < Number(itemB.rarity)) return 1;
        if (Number(itemA.rarity) > Number(itemB.rarity)) return -1;
        return 0;
      })
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="nes-container with-title md:w-3/6 mt-10 mx-3">
        <span className="title">My Kittens</span>
        <Link href="/">
          <a className="nes-btn is-primary">See my Kittens</a>
        </Link>
      </div>
      <KittenGallery nfts={nfts} />
    </div>
  );
}
