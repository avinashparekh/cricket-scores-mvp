/**
 * Horizontal chips that filter the match list by status (or All).
 */
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MatchFilter } from '../hooks/useMatches';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

const FILTERS: { key: MatchFilter; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'LIVE', label: 'Live' },
  { key: 'UPCOMING', label: 'Upcoming' },
  { key: 'COMPLETED', label: 'Completed' },
];

interface StatusFilterProps {
  value: MatchFilter;
  onChange: (value: MatchFilter) => void;
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {FILTERS.map((filter) => {
          const selected = filter.key === value;
          return (
            <Pressable
              key={filter.key}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => onChange(filter.key)}
              style={[styles.chip, selected && styles.chipSelected]}
            >
              <Text style={[styles.label, selected && styles.labelSelected]}>
                {filter.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    paddingVertical: spacing.sm,
  },
  row: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 14,
  },
  labelSelected: {
    color: colors.white,
  },
});
