/**
 * Ball-by-ball commentary FlatList.
 * 404 → unavailable messaging; other errors → retry; empty array → empty state.
 */
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { CommentaryItem } from '../types/match';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { ClientErrorCode } from '../constants/errorCodes';
import { getClientMessage } from '../constants/errorMessages';
import { EmptyState } from './EmptyState';
import { ErrorState } from './ErrorState';
import { RetryButton } from './RetryButton';

interface CommentaryListProps {
  items: CommentaryItem[];
  unavailable?: boolean;
  error?: string | null;
  ListHeaderComponent?: React.ReactElement | null;
  refreshing?: boolean;
  onRefresh?: () => void;
}

function CommentaryRow({ item }: { item: CommentaryItem }) {
  const accent = item.isWicket
    ? colors.wicket
    : item.isBoundary
      ? colors.boundary
      : colors.textMuted;

  return (
    <View style={styles.row}>
      <View style={[styles.overBadge, { borderColor: accent }]}>
        <Text style={[styles.overText, { color: accent }]}>{item.over}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>{item.text}</Text>
        {(item.isWicket || item.isBoundary) && (
          <Text style={[styles.tag, { color: accent }]}>
            {item.isWicket ? 'WICKET' : 'BOUNDARY'}
          </Text>
        )}
      </View>
    </View>
  );
}

export function CommentaryList({
  items,
  unavailable,
  error,
  ListHeaderComponent,
  refreshing,
  onRefresh,
}: CommentaryListProps) {
  if (error) {
    return (
      <View style={styles.flex}>
        {ListHeaderComponent}
        <ErrorState
          message={error}
          onRetry={onRefresh ?? (() => undefined)}
        />
      </View>
    );
  }

  if (unavailable) {
    return (
      <FlatList
        style={styles.flex}
        data={[]}
        keyExtractor={() => 'unavailable'}
        renderItem={() => null}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={
          <View style={styles.unavailableBlock}>
            <EmptyState
              title={getClientMessage(
                ClientErrorCode.COMMENTARY_UNAVAILABLE_TITLE,
              )}
              message={getClientMessage(
                ClientErrorCode.COMMENTARY_UNAVAILABLE_BODY,
              )}
            />
            {onRefresh ? (
              <RetryButton
                label="Refresh"
                onPress={onRefresh}
                loading={refreshing}
              />
            ) : null}
          </View>
        }
        contentContainerStyle={styles.emptyContainer}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    );
  }

  return (
    <FlatList
      style={styles.flex}
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CommentaryRow item={item} />}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        <EmptyState
          title={getClientMessage(ClientErrorCode.COMMENTARY_EMPTY_TITLE)}
          message={getClientMessage(ClientErrorCode.COMMENTARY_EMPTY_BODY)}
        />
      }
      contentContainerStyle={
        items.length === 0 ? styles.emptyContainer : styles.listContent
      }
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.sm,
  },
  emptyContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
  },
  unavailableBlock: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  overBadge: {
    minWidth: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    alignSelf: 'flex-start',
  },
  overText: {
    fontWeight: '800',
    fontSize: 12,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  text: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  tag: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
});
