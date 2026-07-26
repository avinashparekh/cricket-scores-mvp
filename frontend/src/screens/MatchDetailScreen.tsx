/**
 * Match detail: header + Scorecard / Commentary tabs with refresh support.
 */
import React, { useState } from 'react';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommentaryList } from '../components/CommentaryList';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { ScorecardView } from '../components/ScorecardView';
import { WebRefreshButton } from '../components/WebRefreshButton';
import { ClientErrorCode } from '../constants/errorCodes';
import { getClientMessage } from '../constants/errorMessages';
import { useMatchDetail } from '../hooks/useMatchDetail';
import { RootStackParamList } from '../navigation/RootNavigator';
import { Match } from '../types/match';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { formatMatchDate, formatScore, statusColor } from '../utils/matchFormat';

type Props = NativeStackScreenProps<RootStackParamList, 'MatchDetail'>;
type TabKey = 'scorecard' | 'commentary';

function MatchHeader({ match }: { match: Match }) {
  return (
    <View style={styles.headerCard}>
      <View style={styles.headerTop}>
        <Text style={styles.format}>{match.format}</Text>
        <Text style={[styles.status, { color: statusColor(match.status) }]}>
          {match.status}
        </Text>
      </View>
      <Text style={styles.teams}>
        {match.teamA.name} vs {match.teamB.name}
      </Text>
      <View style={styles.scoreBlock}>
        <Text style={styles.scoreLine}>
          {match.teamA.shortName}{' '}
          {formatScore(match.teamA.runs, match.teamA.wickets, '-')}
          {match.teamA.overs !== null ? ` (${match.teamA.overs} ov)` : ''}
        </Text>
        <Text style={styles.scoreLine}>
          {match.teamB.shortName}{' '}
          {formatScore(match.teamB.runs, match.teamB.wickets, '-')}
          {match.teamB.overs !== null ? ` (${match.teamB.overs} ov)` : ''}
        </Text>
      </View>
      <Text style={styles.summary}>{match.summary}</Text>
      <Text style={styles.meta}>{match.venue}</Text>
      <Text style={styles.meta}>{formatMatchDate(match.startTime)}</Text>
    </View>
  );
}

export function MatchDetailScreen({ route }: Props) {
  const { matchId } = route.params;
  const [tab, setTab] = useState<TabKey>('scorecard');
  const {
    match,
    scorecard,
    commentary,
    scorecardUnavailable,
    commentaryUnavailable,
    scorecardError,
    commentaryError,
    loading,
    refreshing,
    error,
    reload,
    refresh,
  } = useMatchDetail(matchId);

  if (loading && !match) {
    return (
      <LoadingState
        message={getClientMessage(ClientErrorCode.LOADING_MATCH_DETAILS)}
      />
    );
  }

  if ((error && !match) || !match) {
    return (
      <ErrorState
        message={
          error || getClientMessage(ClientErrorCode.MATCH_NOT_FOUND)
        }
        onRetry={() => void reload()}
      />
    );
  }

  const tabs = (
    <View style={styles.tabsBlock}>
      <MatchHeader match={match} />
      {error ? (
        <Text style={styles.inlineError}>
          {error}
          {getClientMessage(ClientErrorCode.REFRESH_HINT)}
        </Text>
      ) : null}
      <WebRefreshButton
        onPress={() => void refresh()}
        refreshing={refreshing}
      />
      <View style={styles.tabs}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: tab === 'scorecard' }}
          style={[styles.tab, tab === 'scorecard' && styles.tabActive]}
          onPress={() => setTab('scorecard')}
        >
          <Text
            style={[
              styles.tabLabel,
              tab === 'scorecard' && styles.tabLabelActive,
            ]}
          >
            Scorecard
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: tab === 'commentary' }}
          style={[styles.tab, tab === 'commentary' && styles.tabActive]}
          onPress={() => setTab('commentary')}
        >
          <Text
            style={[
              styles.tabLabel,
              tab === 'commentary' && styles.tabLabelActive,
            ]}
          >
            Commentary
          </Text>
        </Pressable>
      </View>
    </View>
  );

  if (tab === 'commentary') {
    return (
      <View style={styles.screen}>
        <CommentaryList
          items={commentary}
          unavailable={commentaryUnavailable}
          error={commentaryError}
          ListHeaderComponent={<View style={styles.padded}>{tabs}</View>}
          refreshing={refreshing}
          onRefresh={() => void refresh()}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.padded}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => void refresh()}
            tintColor={colors.primary}
          />
        }
      >
        {tabs}
        <ScorecardView
          scorecard={scorecard}
          unavailable={scorecardUnavailable}
          error={scorecardError}
          onRetry={() => void refresh()}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  padded: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  tabsBlock: {
    gap: spacing.md,
  },
  headerCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  format: {
    color: colors.textMuted,
    fontWeight: '700',
    fontSize: 12,
  },
  status: {
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  teams: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  scoreBlock: {
    gap: 4,
  },
  scoreLine: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  summary: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  meta: {
    color: colors.textMuted,
    fontSize: 12,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.primarySoft,
  },
  tabLabel: {
    fontWeight: '600',
    color: colors.textMuted,
  },
  tabLabelActive: {
    color: colors.primary,
  },
  inlineError: {
    color: colors.danger,
    fontSize: 12,
  },
});
