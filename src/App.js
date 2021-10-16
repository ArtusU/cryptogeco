import { useEffect, useState } from "react";
import CoinGecko from "coingecko-api";

function App() {
  const [coins, setCoins] = useState(null);

  useEffect(() => {
    const CoinGecoClient = new CoinGecko();
    async function pingAPI() {
      return await CoinGecoClient.ping();
    }

    async function fetchCoinList() {
      const response = await CoinGecoClient.coins.all();
      setCoins(response.data);
    }

    pingAPI();
    fetchCoinList();
  }, []);

  return (
  <div>
    {coins && (
      <ul>
        {coins.map((coin) => {
          return <li key={coin.id}>{coin.name}</li>;
        })}
      </ul>
    )}
  </div>
  )
}

export default App;
