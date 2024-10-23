import React from 'react'
import { View, Text, Image} from "react-native"
import styles from './styles'

const QuottationItems = (props) => {
  return (
    <View style={styles.mainContent}>
      <View style={styles.contextLeft}>
        <View style={styles.boxLogo}>
          <Image style={styles.logBitcoin} source={require('../../../img/bitcoin.png')}/>
          <Text style={styles.dayCotation}>{props.date}</Text>
        </View>
      </View>
      <View style={styles.contextRight}>
        <Text style={styles.price}>{props.price}</Text>
      </View>
    </View>
  )
}

export default QuottationItems;