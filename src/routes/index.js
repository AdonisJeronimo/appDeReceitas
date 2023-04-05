import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { StackRoutes } from "./stackRoutes"; 
import { Favorites } from "../pages/Favorites";

import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#121212",

        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={StackRoutes}
        options={{
          tabBarIcon: ({color, size, focused}) => {
            if (focused) {
              return <Ionicons name="home-sharp" color="#000" size={size} />;
            }

            return <Ionicons name="home-outline" color={color} size={size} />;
          },
        }}
      />

      <Tab.Screen 
      name="Favorites" 
      component={Favorites} 
      options={{
        tabBarIcon: ({color, size, focused}) => {
          if (focused) {
            return <Fontisto name="favorite" color="#ff4141" size={size} />;
          }

          return <Fontisto name="favorite" color={color} size={size} />;
        },
      }}
      
      />
    </Tab.Navigator>
  );
}
