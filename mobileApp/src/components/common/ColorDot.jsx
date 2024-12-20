import React from 'react';
import {View} from 'react-native';

const ColorDot = ({color, style}) => (
  <View
    style={[
      {
        width: 12,
        height: 12,
        borderRadius: 100,
        backgroundColor: color,
      },
      style,
    ]}
  />
);

export default ColorDot;
