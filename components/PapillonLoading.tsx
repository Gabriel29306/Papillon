import React from 'react';
import { StyleSheet, ActivityIndicator, View, Platform, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

import GetUIColors from '../utils/GetUIColors';

interface Props {
  title: string;
  subtitle?: string;
  style?: ViewStyle;
  /** Most likely an icon component from `lucide-react-native`. */
  icon?: React.ReactElement | null;
}

const PapillonLoading: React.FC<Props> = ({ title, subtitle, icon = null, style = {} }) => {
  const UIColors = GetUIColors();

  return (
    <View style={[styles.newsLoading, style]}>
      {icon ? (
        <View>{icon}</View>
      ) : (
        <ActivityIndicator
          style={{ marginTop: 16 }}
          size={26}
          color={Platform.OS !== 'ios' ? UIColors.primary : undefined}
        />
      )}

      <Text style={styles.newsLoadingText}>{title}</Text>
      {subtitle && <Text style={styles.newsLoadingSubtext}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  newsLoading: {
    marginVertical: 24,
    marginHorizontal: 24,
    alignItems: 'center',
  },
  newsLoadingText: {
    fontSize: 17,
    fontFamily: 'Papillon-Semibold',
    marginTop: 8,
    textAlign: 'center',
  },
  newsLoadingSubtext: {
    fontSize: 15,
    marginTop: 4,
    opacity: 0.5,
    textAlign: 'center',
  },
});

export default PapillonLoading;