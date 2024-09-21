import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Grafico = ({ labels, data, yAxisLabel = '', yAxisSuffix = '' }) => {
  return (
    <View>
      <LineChart
        data={{
          labels: labels, 
          datasets: [
            {
              data: data, 
            },
          ],
        }}
        width={Dimensions.get('window').width} 
        height={220}
        yAxisLabel={yAxisLabel} 
        yAxisSuffix={yAxisSuffix} 
        chartConfig={{
          backgroundColor: '#000',
          backgroundGradientFrom: '#1E2923',
          backgroundGradientTo: '#08130D',
          decimalPlaces: 2, // Optional
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default Grafico;
