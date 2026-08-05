import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AvatarScreen } from '../screens/AvatarScreen';

/**
 * The navigation shape is a placeholder. The real information architecture — where the avatar,
 * feed, questionnaires, profile, leaderboard, and invite live — is being designed separately
 * (`docs/plans/ideas/app-design-exploration.md`).
 */
export type RootStackParamList = {
  Avatar: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Avatar" component={AvatarScreen} options={{ title: 'ecomania' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
