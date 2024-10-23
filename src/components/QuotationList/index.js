import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import styles from './styles';
import QuottationItems from './QuotationItem';

const Quotationslist = (props) => {
  const { filterDay } = props
  const { loading } = props

  return (
    <>
      <View style={styles.filters}>
        {loading ? (
          <View>
            <ActivityIndicator size="small" color="#f50d41" /> 
          </View>
        ) : (
          <>
            <TouchableOpacity style={styles.buttonQuery} onPress={() => filterDay(7)}>
              <Text style={styles.textButtonQuery}>7D</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonQuery} onPress={() => filterDay(15)}>
              <Text style={styles.textButtonQuery}>15D</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonQuery} onPress={() => filterDay(60)}>
              <Text style={styles.textButtonQuery}>1M</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonQuery} onPress={() => filterDay(90)}>
              <Text style={styles.textButtonQuery}>3M</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonQuery} onPress={() => filterDay(180)}>
              <Text style={styles.textButtonQuery}>6M</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <FlatList
        data={props.listTransactions}
        renderItem={({ item }) => (
          <QuottationItems date={item.date} price={item.price} />
        )}
      />
    </>
  );
};

export default Quotationslist;