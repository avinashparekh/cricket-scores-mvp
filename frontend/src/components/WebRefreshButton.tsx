import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

interface WebRefreshButtonProps {
  onPress: () => void;
  refreshing?: boolean;
}

/**
 * Pull-to-refresh is unreliable in Chrome; show an explicit control on web only.
 */
export function WebRefreshButton({
  onPress,
  refreshing = false,
}: WebRefreshButtonProps) {
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View style={styles.wrap}>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        disabled={refreshing}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
          refreshing && styles.disabled,
        ]}
      >
        <Text style={styles.label}>{refreshing ? 'Refreshing…' : 'Refresh'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingBottom: spacing.sm,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
});
