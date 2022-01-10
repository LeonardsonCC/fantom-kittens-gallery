const toHex = (num) => '0x' + num.toString(16)

export function getTransactionsByAccount(eth, myaccount, startBlockNumber, endBlockNumber) {
  if (endBlockNumber == null) {
    endBlockNumber = eth.blockNumber;
    console.log("Using endBlockNumber: " + endBlockNumber);
  }
  if (startBlockNumber == null) {
    startBlockNumber = endBlockNumber - 1000;
    console.log("Using startBlockNumber: " + startBlockNumber);
  }
  console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);

  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    if (i % 1000 == 0) {
      console.log("Searching block " + i);
    }
    var block = eth.getBlock(i, true, console.log);
    if (block != null && block.transactions != null) {
      block.transactions.forEach( function(e) {
        if (myaccount == "*" || myaccount == e.from || myaccount == e.to) {
          console.log("  tx hash          : " + e.hash + "\n"
            + "   nonce           : " + e.nonce + "\n"
            + "   blockHash       : " + e.blockHash + "\n"
            + "   blockNumber     : " + e.blockNumber + "\n"
            + "   transactionIndex: " + e.transactionIndex + "\n"
            + "   from            : " + e.from + "\n" 
            + "   to              : " + e.to + "\n"
            + "   value           : " + e.value + "\n"
            + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
            + "   gasPrice        : " + e.gasPrice + "\n"
            + "   gas             : " + e.gas + "\n"
            + "   input           : " + e.input);
        }
      })
    }
  }
}

async function addFantomChainToWallet() {
  return window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: toHex(250),
        chainName: "Fantom Opera",
        nativeCurrency: {
          name: "Fantom",
          symbol: "FTM",
          decimals: 18
        },
        blockExplorerUrls: ["https://ftmscan.com/"],
        rpcUrls: ["https://rpc.ftm.tools/"],
      }, address
    ],
  });
}

async function switchToFantomChain() {
  return window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: toHex(250) }]
  });
}

export async function requestSwitchToFantomChain() {
  try {
    await switchToFantomChain();
  } catch (error) {
    if (error.code === 4902) {
      await addFantomChainToWallet();
      return;
    }
    console.log(error)
  }
}