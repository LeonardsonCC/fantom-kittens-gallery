import { useWeb3React } from "@web3-react/core";
import React from "react";
import { injected } from "../components/wallet/connector";
import axios from "axios";

export default function Home() {
  const [transactions, setTransactions] = React.useState([]);

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function connect() {
    try {
      await activate(injected);

      const result = await axios.get("https://api.ftmscan.com/api", {
        params: {
          module: "account",
          action: "tokennfttx",
          address: account,
          startblock: 0,
          endblock: 999999999,
          sort: "asc",
          apikey: process.env.NEXT_PUBLIC_FTMSCAN_API_KEY,
        },
      });
      if (result.data.status == 0) return;
      setTransactions(result.data.result);
      console.log(result);
    } catch (ex) {
      console.log(ex);
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
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.blockNumber}>
              <a target="_blank" rel="noreferrer" href={`https://paintswap.finance/nfts/assets/${transaction.contractAddress}/${transaction.tokenID}`}>
                #{transaction.tokenID} - View on paintswap
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
