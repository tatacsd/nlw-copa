import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';
import { PlusCircle, SoccerBall } from 'phosphor-react-native';
import { Platform } from 'react-native';
import { Details } from '../screens/Details';
import { FindPoll } from '../screens/FindPoll';
import { NewPoll } from '../screens/NewPoll';
import { Polls } from '../screens/Polls';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes = () => {
  const { colors, sizes } = useTheme();
  const iconSize = Platform.OS === 'ios' ? sizes[6] : sizes[5];
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: 'absolute',
          height: sizes[22],
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },
        tabBarLabelPosition: 'beside-icon',
        tabBarItemStyle: {
          position: 'relative',
          top: Platform.OS === 'ios' ? 0 : -10,
        },
      }}
    >
      <Screen
        name="newPoll"
        component={NewPoll}
        options={{
          tabBarIcon: ({ color }) => (
            <PlusCircle size={iconSize} color={color} />
          ),
          tabBarLabel: 'New Poll',
        }}
      />
      <Screen
        name="polls"
        component={Polls}
        options={{
          tabBarIcon: ({ color }) => (
            <SoccerBall size={iconSize} color={color} />
          ),
          tabBarLabel: 'My polls',
        }}
      />

      <Screen
        name="findPoll"
        component={FindPoll}
        options={{ tabBarButton: () => null }} // hide tab bar button
      />

      <Screen
        name="details"
        component={Details}
        options={{ tabBarButton: () => null }} // hide tab bar button
      />
    </Navigator>
  );
};
