export default function ConnectWallet({ account, connect, disconnect }) {
  return (
    <>
      {account === undefined ? (
        <button onClick={connect} className="nes-btn is-primary">
          Connect to MetaMask
        </button>
      ) : (
        <button onClick={disconnect} className="nes-btn is-error">
          Disconnect
        </button>
      )}
    </>
  );
}
