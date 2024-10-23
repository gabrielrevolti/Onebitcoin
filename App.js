import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';

import CurrentPrice from './src/components/CurrentPrice';
import HistoryGraphic from './src/components/HistoryGraphic';
import Quotationslist from './src/components/QuotationList';

const url = (qtdDays) => {
  return `https://data-api.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=` + qtdDays;
};

const getListCoins = async (url) => {
  let response = await fetch(url);
  let data = await response.json();
  const klines = data.map((kline) => {
    const date = new Date(kline[0]);
    const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    const formattedDate = `${('0' + utcDate.getUTCDate()).slice(-2)}/${('0' + (utcDate.getUTCMonth() + 1)).slice(-2)}/${utcDate.getUTCFullYear()}`;

    return {
      date: formattedDate,
      price: parseFloat(kline[4]).toFixed(4),
    };
  });

  data = klines.reverse();
  return data;
};

const getPriceCoinsGraphic = async (url) => {
  let responseG = await fetch(url);
  let dataG = await responseG.json();
  const klinesG = dataG.map((kline) => {
    return parseFloat(kline[4]).toFixed(4);
  });
  dataG = klinesG;
  return dataG;
};

export default function App() {
  const [coinsList, setCoinsList] = useState([]);
  const [coinsGraphicList, setCoinsGraphicList] = useState([0]);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState();

  const updateDay = (number) => {
    setDays(number);
    setLoading(true); 
  };

  const getPrice = async () => {
    const response = await fetch(
      "https://data-api.binance.vision/api/v3/ticker/price?symbol=BTCUSDT"
    );
    const data = await response.json();
    setPrice(parseFloat(data.price).toFixed(4));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const listData = await getListCoins(url(days));
        const graphicData = await getPriceCoinsGraphic(url(days));
        setCoinsList(listData);
        setCoinsGraphicList(graphicData);
        getPrice();
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [days]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f50d41" barStyle="dark-content" />
      <CurrentPrice current={price} />
      <HistoryGraphic infoDataGraphic={coinsGraphicList} />
      <Quotationslist
        filterDay={updateDay}
        listTransactions={coinsList}
        loading={loading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
});