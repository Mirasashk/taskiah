import {ThemeContext} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Card, Avatar} from 'react-native-paper';
import {useTheme} from 'react-native-paper';

const StatsCard = ({title, subtitle, icon}) => {
  const theme = useTheme();

  useEffect(() => {
    // console.log(theme.colors);
  }, []);

  const styles = StyleSheet.create({
    container: {},
    card: {
      backgroundColor: theme.colors.surfaceContainerLow,
      borderRadius: 10,
    },
    cardTitle: {
      backgroundColor: theme.colors.surfaceContainerHigh,
      borderRadius: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Card mode="contained" elevation={1} style={styles.card}>
        <Card.Title
          title={title}
          subtitle={subtitle}
          left={props => (
            <Avatar.Icon
              {...props}
              size={48}
              icon={icon}
              style={{backgroundColor: theme.colors.surfaceContainerLow}}
            />
          )}
          style={styles.cardTitle}
        />
      </Card>
    </View>
  );
};

export default StatsCard;
