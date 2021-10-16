import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { LineChart } from "./LineChart";

import CoinGecko from "coingecko-api";

export function Coin() {
  const { coinId } = useParams();

  const [labels, setLabels] = useState();
  const [priceData, setPriceData] = useState(null);

  useEffect(() => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayUnix = firstDay.getTime() / 1000;
    const currentDayUnix = date.getTime() / 1000;

    const CoinGeckoClient = new CoinGecko();

    function formatUnix(unixTimestamp) {
      const date = new Date(unixTimestamp);
      return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
    }

    async function fetchCoin() {
      const response = await CoinGeckoClient.coins.fetchMarketChartRange(
        coinId,
        {
          vs_currency: "usd",
          from: firstDayUnix,
          to: currentDayUnix,
        }
      );
      setPriceData(response.data.prices.map((item) => item[1]));
      console.log(response.data.prices.map((item) => item[1]))
      setLabels(response.data.prices.map((item) => formatUnix(item[0])));
      return response;
    }

    fetchCoin();
  }, [coinId]);

  return (
    <div>
      <h2>{coinId}</h2>
      {!priceData && "Loading..."}
      {priceData && labels && (
        <LineChart labels={labels} coinId={coinId} priceData={priceData} />
      )}
    </div>
  );
}
