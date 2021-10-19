import { useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import CoinGecko from "coingecko-api";
import { LineChart } from "./LineChart";
import { AuthContext } from "../context/AuthContext";

export function Coin() {
  const { coinId } = useParams();
  const { user } = useContext(AuthContext);

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
      console.log(response.data.prices.map((item) => item[1]));
      setLabels(response.data.prices.map((item) => formatUnix(item[0])));
      return response;
    }

    fetchCoin();
  }, [coinId]);

  return (
    <div className="border-t border-gray-200 py-5">
      <h2 className="py-5 text-2xl text-gray-800">{coinId}</h2>
      {!priceData && (
        <div className="bg-gray-100 rounded-sm py-5 text-center">
          <h4 className="text-xl text-gray-600">Loading...</h4>
        </div>
      )}
      {user ? (
        <>
          {priceData && labels && (
            <LineChart labels={labels} coinId={coinId} priceData={priceData} />
          )}
        </>
      ) : (
        <h2>Please login to see the chart</h2>
      )}
    </div>
  );
}
