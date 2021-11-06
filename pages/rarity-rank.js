import { useEffect, useState } from "react";
import KittenGallery from "../components/KittenGallery";
import Link from "next/link";
import axios from "axios";

export default function RarityRank() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    axios.get("/api/kittens/", {
      params: {
        page: 1,
        kittensPerPage: 420,
        orderBy: "rarity",
        orderDir: "DESC",
      },
    }).then(({ data }) => {
      if (data.data) {
        setNfts(data.data)
      }
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="nes-container is-dark with-title md:w-3/6 mt-10 mx-3">
        <span className="title">My Kittens</span>
        <Link href="/">
          <a className="nes-btn is-primary">See my Kittens</a>
        </Link>
      </div>
      <KittenGallery nfts={nfts} showRarityRank />
    </div>
  );
}
