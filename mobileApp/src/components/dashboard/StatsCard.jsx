import React from 'react';
import {View} from 'react-native';
import {Card, Avatar, IconButton} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {createStyles} from '../../theme/components/StatsCard.styles';

/**
 * StatsCard Component
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string} props.subtitle - Card subtitle
 * @param {string} props.icon - Icon name for the avatar
 * @param {Function} [props.onPress] - Optional callback for card press
 */
const StatsCard = ({title, subtitle, icon, onPress}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const renderAvatar = props => (
    <Avatar.Icon {...props} size={48} icon={icon} style={styles.avatar} />
  );

  const renderChevron = props => (
    <IconButton
      {...props}
      icon="chevron-right"
      size={24}
      color={theme.colors.onSurface}
      onPress={onPress}
    />
  );

  return (
    <View style={styles.container}>
      <Card
        mode="contained"
        elevation={1}
        style={styles.card}
        onPress={onPress}>
        <Card.Title
          title={title}
          subtitle={subtitle}
          left={renderAvatar}
          right={renderChevron}
        />
      </Card>
    </View>
  );
};

export default StatsCard;
