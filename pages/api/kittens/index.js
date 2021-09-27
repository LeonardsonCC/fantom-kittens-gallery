import { extractAttrsFromName, kittensDict } from "../../../utils/fantomKittensDict";
import { getRarityScore, MINTED_KITTENS } from "../../../utils/rarity";

export default function handler(req, res) {
  let { page=1, kittensPerPage=50, search="", orderBy="tokenId", orderDir="ASC" } = req.query;
  page = Number(page)
  kittensPerPage = Number(kittensPerPage)

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
  kittens = kittens.sort((itemA, itemB) => {
      if (Number(itemA.rarity) < Number(itemB.rarity)) return 1;
      if (Number(itemA.rarity) > Number(itemB.rarity)) return -1;
      return 0;
    }).map((kitten, index) => {
    return {
      ...kitten,
      rarityRank: index+1
    }
  })
  
  if (!["rarity", "tokenId"].includes(orderBy)) orderBy = "tokenId"
  if (orderDir === "ASC") {
    kittens.sort((itemA, itemB) => {
      if (Number(itemA[orderBy]) < Number(itemB[orderBy])) return -1;
      if (Number(itemA[orderBy]) > Number(itemB[orderBy])) return 1;
      return 0;
    });
  } else if (orderDir === "DESC") {
    kittens.sort((itemA, itemB) => {
      if (Number(itemA[orderBy]) < Number(itemB[orderBy])) return 1;
      if (Number(itemA[orderBy]) > Number(itemB[orderBy])) return -1;
      return 0;
    });
  }
  kittens = kittens.slice((page-1) * kittensPerPage, ((page-1) * kittensPerPage) + kittensPerPage)
  if (search !== "") {
    kittens = kittens.filter(kitten => String(kitten.tokenId).includes(search))
  }


  res.status(200).json({
    page,
    pages: Math.ceil(MINTED_KITTENS / kittensPerPage),
    kittensPerPage,
    orderBy,
    orderDir,
    data: kittens,
  });
}
