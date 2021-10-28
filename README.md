# Fantom Kittens Gallery
This is just a simple gallery to see your Fantom Kittens NFTs authenticating using MetaMask.

## What this exactly do
- Authenticating using MetaMask just to get your public wallet address;
- Fetch your NFTs using PaintSwap API (they don't have docs about that, but I got it using their website);
- Check which NFTs is from FantomKittens contract (0xfd211f3b016a75bc8d73550ac5adc2f1cae780c0);
- Fetch on [FantomKittens API](https://github.com/fakenickels/fantom-kittens/blob/main/pages/api/kitten/%5Bid%5D.ts) the images of each FantomKitten ID that you have;
- Show them using [NES.css](https://nostalgic-css.github.io/NES.css/) because it's pretty and pixelated

## About the MetaMask usage
I know, this is strange, but I just did the MetaMask authentication to get your wallet because I wanted
to learn how that works. So don't worry, I'm not storing any usage data, or something like that, you can
see the source code.

## Feel free to use
This was just a test to know better about how NFTs works. So feel free to use this source for any purposes;

## Getting Started

First, run the development server:

```bash
# install dependencies
npm i

# run dev environment
npm run dev
# or
yarn dev
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
