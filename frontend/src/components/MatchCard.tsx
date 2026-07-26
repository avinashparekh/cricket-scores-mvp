/**
 * Tappable row summarizing one match for the list screen.
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Match } from '../types/match';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import {
  formatMatchDate,
  formatScore,
  statusBadgeColors,
} from '../utils/matchFormat';

interface MatchCardProps {
  match: Match;
  onPress: (matchId: string) => void;
}

export function MatchCard({ match, onPress }: MatchCardProps) {
  const badge = statusBadgeColors(match.status);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${match.teamA.name} versus ${match.teamB.name}, ${match.status}`}
      onPress={() => onPress(match.id)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.header}>
        <Text style={styles.format}>{match.format}</Text>
        <View style={[styles.badge, { backgroundColor: badge.bg }]}>
          <Text style={[styles.badgeText, { color: badge.fg }]}>
            {match.status}
          </Text>
        </View>
      </View>

      <View style={styles.teams}>
        <View style={styles.teamRow}>
          <Text style={styles.teamName}>{match.teamA.shortName}</Text>
          <Text style={styles.score}>
            {formatScore(match.teamA.runs, match.teamA.wickets)}
            {match.teamA.overs !== null ? (
              <Text style={styles.overs}> ({match.teamA.overs} ov)</Text>
            ) : null}
          </Text>
        </View>
        <View style={styles.teamRow}>
          <Text style={styles.teamName}>{match.teamB.shortName}</Text>
          <Text style={styles.score}>
            {formatScore(match.teamB.runs, match.teamB.wickets)}
            {match.teamB.overs !== null ? (
              <Text style={styles.overs}> ({match.teamB.overs} ov)</Text>
            ) : null}
          </Text>
        </View>
      </View>

      <Text style={styles.summary}>{match.summary}</Text>
      <Text style={styles.meta}>
        {match.venue}
        {'\n'}
        {formatMatchDate(match.startTime)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  pressed: {
    opacity: 0.92,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  format: {
    color: colors.textMuted,
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 0.4,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  teams: {
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  score: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  overs: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textMuted,
  },
  summary: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  meta: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
});
