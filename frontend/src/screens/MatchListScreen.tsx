/**
 * Match list: status filters, FlatList, and loading/error/empty/refresh UX.
 * FlatList stays mounted so pull-to-refresh works even after a failed refresh.
 */
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { MatchCard } from '../components/MatchCard';
import { StatusFilter } from '../components/StatusFilter';
import { WebRefreshButton } from '../components/WebRefreshButton';
import { ClientErrorCode } from '../constants/errorCodes';
import {
  getClientMessage,
  noMatchesMessage,
} from '../constants/errorMessages';
import { MatchFilter, useMatches } from '../hooks/useMatches';
import { RootStackParamList } from '../navigation/RootNavigator';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'MatchList'>;

export function MatchListScreen({ navigation }: Props) {
  const [filter, setFilter] = useState<MatchFilter>('ALL');
  const { matches, loading, refreshing, error, reload, refresh } =
    useMatches(filter);

  const showInitialLoader = loading && matches.length === 0 && !error;
  const showHardError = Boolean(error) && matches.length === 0;

  const listEmpty = () => {
    if (showInitialLoader) {
      return (
        <LoadingState
          message={getClientMessage(ClientErrorCode.FETCHING_MATCHES)}
        />
      );
    }
    if (showHardError && error) {
      return <ErrorState message={error} onRetry={() => void reload()} />;
    }
    return (
      <EmptyState
        title={getClientMessage(ClientErrorCode.NO_MATCHES_TITLE)}
        message={noMatchesMessage(
          filter === 'ALL' ? '' : filter.toLowerCase(),
        )}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <StatusFilter value={filter} onChange={setFilter} />
      <View style={styles.refreshRow}>
        <WebRefreshButton
          onPress={() => void refresh()}
          refreshing={refreshing}
        />
      </View>
      {error && matches.length > 0 ? (
        <Text style={styles.inlineError}>
          {error}
          {getClientMessage(ClientErrorCode.REFRESH_HINT)}
        </Text>
      ) : null}
      <FlatList
        data={showHardError || showInitialLoader ? [] : matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MatchCard
            match={item}
            onPress={(matchId) =>
              navigation.navigate('MatchDetail', { matchId })
            }
          />
        )}
        contentContainerStyle={
          matches.length === 0 || showHardError || showInitialLoader
            ? styles.emptyContainer
            : styles.listContent
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshing={refreshing}
        onRefresh={() => void refresh()}
        ListHeaderComponent={
          matches.length > 0 && !showHardError ? (
            <Text style={styles.count}>
              {matches.length} match{matches.length === 1 ? '' : 'es'}
            </Text>
          ) : null
        }
        ListEmptyComponent={listEmpty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  refreshRow: {
    paddingHorizontal: spacing.lg,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  emptyContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
  },
  separator: {
    height: spacing.md,
  },
  count: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  inlineError: {
    color: colors.danger,
    fontSize: 12,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
});
