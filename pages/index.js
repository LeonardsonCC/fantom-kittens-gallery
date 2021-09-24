import { useWeb3React } from "@web3-react/core";
import React from "react";
import { injected } from "../components/wallet/connector";
import axios from "axios";
import KittenGallery from "../components/KittenGallery";

export default function Home() {
  const [nfts, setNfts] = React.useState([]);

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function connect() {
    try {
      await activate(injected);

      if (account !== undefined) {
        const result = await axios.get(
          `https://api.paintswap.finance/userNFTs/${account}`,
          {
            params: {
              allowNSFW: true,
              numToFetch: 10,
              numToSkip: 0,
            },
          }
        );
        console.log(result.data.nfts);
        if (result.data.nfts.length > 0) {
          const { nfts } = result.data;
          const tmpNfts = nfts
            .filter(
              ({ nft }) =>
                nft.address.toLowerCase() ==
                "0xfd211f3b016a75bc8d73550ac5adc2f1cae780c0"
            )
            .sort(({ nft: nftA }, { nft: nftB }) => {
              const nNftA = Number(nftA.tokenId);
              const nNftB = Number(nftB.tokenId);
              if (nNftA > nNftB) return +1;
              else if (nNftA < nNftB) return -1;
              return 0;
            })
            .map(({ nft }) => nft);

          for (let nft of tmpNfts) {
            const { data: fakeKitten } = await axios.get(
              `https://kittens.fakeworms.studio/api/kitten/${nft.tokenId}`
            );
            nft.imageUrl = fakeKitten.image;
            nft.name = fakeKitten.name;
            nft.attributes = fakeKitten.attributes;
          }
          console.log(tmpNfts);
          setNfts(tmpNfts);
        }
      }
    } catch (ex) {
      console.error(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={connect}
        className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800"
      >
        Connect to MetaMask
      </button>
      {active ? (
        <span>
          Connected with <b>{account}</b>
        </span>
      ) : (
        <span>Not connected</span>
      )}
      <button
        onClick={disconnect}
        className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800"
      >
        Disconnect
      </button>
      <KittenGallery nfts={nfts} />
    </div>
  );
}
