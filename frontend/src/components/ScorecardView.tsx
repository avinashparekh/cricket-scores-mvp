/**
 * Renders batting/bowling tables for each innings.
 * Distinguishes 404-unavailable vs fetch error vs truly empty data.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { InningsScorecard, Scorecard } from '../types/match';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { EmptyState } from './EmptyState';
import { ErrorState } from './ErrorState';
import { ClientErrorCode } from '../constants/errorCodes';
import { getClientMessage } from '../constants/errorMessages';

interface ScorecardViewProps {
  scorecard: Scorecard | null;
  unavailable?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

function InningsBlock({ innings }: { innings: InningsScorecard }) {
  return (
    <View style={styles.innings}>
      <View style={styles.inningsHeader}>
        <Text style={styles.inningsTitle}>{innings.battingTeam}</Text>
        <Text style={styles.inningsTotal}>
          {innings.totalRuns}/{innings.wickets} ({innings.overs} ov)
        </Text>
      </View>
      <Text style={styles.extras}>Extras: {innings.extras}</Text>

      <Text style={styles.sectionLabel}>Batting</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.colBatter, styles.headerCell]}>Batter</Text>
        <Text style={[styles.colNum, styles.headerCell]}>R</Text>
        <Text style={[styles.colNum, styles.headerCell]}>B</Text>
        <Text style={[styles.colNum, styles.headerCell]}>4s</Text>
        <Text style={[styles.colNum, styles.headerCell]}>6s</Text>
        <Text style={[styles.colSr, styles.headerCell]}>SR</Text>
      </View>
      {innings.batters.map((batter) => (
        <View key={batter.name} style={styles.row}>
          <View style={styles.colBatter}>
            <Text style={styles.playerName}>{batter.name}</Text>
            <Text style={styles.dismissal}>{batter.dismissal}</Text>
          </View>
          <Text style={styles.colNum}>{batter.runs}</Text>
          <Text style={styles.colNum}>{batter.balls}</Text>
          <Text style={styles.colNum}>{batter.fours}</Text>
          <Text style={styles.colNum}>{batter.sixes}</Text>
          <Text style={styles.colSr}>{batter.strikeRate.toFixed(1)}</Text>
        </View>
      ))}

      <Text style={[styles.sectionLabel, styles.bowlingLabel]}>Bowling</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.colBatter, styles.headerCell]}>Bowler</Text>
        <Text style={[styles.colNum, styles.headerCell]}>O</Text>
        <Text style={[styles.colNum, styles.headerCell]}>M</Text>
        <Text style={[styles.colNum, styles.headerCell]}>R</Text>
        <Text style={[styles.colNum, styles.headerCell]}>W</Text>
        <Text style={[styles.colSr, styles.headerCell]}>Econ</Text>
      </View>
      {innings.bowlers.map((bowler) => (
        <View key={bowler.name} style={styles.row}>
          <Text style={[styles.colBatter, styles.playerName]}>{bowler.name}</Text>
          <Text style={styles.colNum}>{bowler.overs}</Text>
          <Text style={styles.colNum}>{bowler.maidens}</Text>
          <Text style={styles.colNum}>{bowler.runs}</Text>
          <Text style={styles.colNum}>{bowler.wickets}</Text>
          <Text style={styles.colSr}>{bowler.economy.toFixed(1)}</Text>
        </View>
      ))}
    </View>
  );
}

export function ScorecardView({
  scorecard,
  unavailable,
  error,
  onRetry,
}: ScorecardViewProps) {
  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={onRetry ?? (() => undefined)}
      />
    );
  }

  if (unavailable) {
    return (
      <EmptyState
        title={getClientMessage(ClientErrorCode.SCORECARD_UNAVAILABLE_TITLE)}
        message={getClientMessage(ClientErrorCode.SCORECARD_UNAVAILABLE_BODY)}
      />
    );
  }

  if (!scorecard || scorecard.innings.length === 0) {
    return (
      <EmptyState
        title={getClientMessage(ClientErrorCode.SCORECARD_EMPTY_TITLE)}
        message={getClientMessage(ClientErrorCode.SCORECARD_EMPTY_BODY)}
      />
    );
  }

  return (
    <View style={styles.container}>
      {scorecard.innings.map((innings, index) => (
        <InningsBlock
          key={`${innings.battingTeam}-${index}`}
          innings={innings}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
    paddingBottom: spacing.xl,
  },
  innings: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  inningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inningsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  inningsTotal: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  extras: {
    color: colors.textMuted,
    fontSize: 12,
  },
  sectionLabel: {
    marginTop: spacing.sm,
    fontWeight: '700',
    color: colors.text,
    fontSize: 13,
  },
  bowlingLabel: {
    marginTop: spacing.md,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerCell: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  colBatter: {
    flex: 1.6,
    paddingRight: spacing.xs,
  },
  colNum: {
    width: 28,
    textAlign: 'right',
    color: colors.text,
    fontSize: 12,
  },
  colSr: {
    width: 42,
    textAlign: 'right',
    color: colors.text,
    fontSize: 12,
  },
  playerName: {
    fontWeight: '600',
    color: colors.text,
    fontSize: 13,
  },
  dismissal: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
});
