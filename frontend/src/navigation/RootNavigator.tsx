import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MatchDetailScreen } from '../screens/MatchDetailScreen';
import { MatchListScreen } from '../screens/MatchListScreen';
import { colors } from '../theme/colors';

export type RootStackParamList = {
  MatchList: undefined;
  MatchDetail: { matchId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MatchList"
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen
          name="MatchList"
          component={MatchListScreen}
          options={{ title: 'Cricket Scores' }}
        />
        <Stack.Screen
          name="MatchDetail"
          component={MatchDetailScreen}
          options={{ title: 'Match Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
