import React, { useEffect } from 'react'

import {DatePickerAndroid, Text, StyleSheet} from 'react-native';

import moment from 'moment';

module.exports = ({ date, onDateChange }) => {
  useEffect(() => {
    handleDatePicker()
  }, [])

  const handleDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({ 
          date: new Date() ,
          mode: 'spinner'
    })

      if (action !== DatePickerAndroid.dismissedAction) {
          const pickedDate = new Date(year, month, day);

          onDateChange(moment(pickedDate).format("LL"));

          return pickedDate
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message)
    }
  }

  return (
    <Text
      style={styles.datePicker}
      onPress={() => handleDatePicker()}
    >
    {String(date)}
    </Text>
  )
}

const styles = StyleSheet.create({
  datePicker: {
    color: '#444',
    height: 44,
    fontSize: 20,
    marginBottom: 10,
    textAlignVertical: 'center'
  }
})