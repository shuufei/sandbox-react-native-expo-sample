/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import { DigimonVSScreen } from "../screens/DigimonVSScreen";
import { HomeScreen } from "../screens/HomeScreen";
import ModalScreen from "../screens/ModalScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { RootStackParamList, RootTabParamList } from "../types";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      // linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
      {/* <DrawerNavigator /> */}
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

const TabStackScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="One" component={TabOneScreen} />
    </Tab.Navigator>
  );
};

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Group screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="One" component={TabOneScreen} />
        <Drawer.Screen name="Two" component={TabTwoScreen} />
        <Drawer.Screen name="Digimon VS" component={DigimonVSScreen} />
      </Drawer.Group>
    </Drawer.Navigator>
  );
}

function RootNavigator() {
  return (
    <>
      <Stack.Navigator initialRouteName="Main">
        {/* <Stack.Screen name="TabStackScreen" component={TabStackScreen} /> */}
        <Stack.Screen
          name="Main"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Modal"
          component={ModalScreen}
          options={{ presentation: "modal" }}
        />
      </Stack.Navigator>
    </>
    // <Stack.Navigator initialRouteName="Home">
    //   <Stack.Group screenOptions={{headerShown: false, animation: 'none'}}>
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //     <Stack.Screen name="One" component={TabOneScreen} />
    //     <Stack.Screen name="Two" component={TabTwoScreen} />
    //   </Stack.Group>
    //     <Stack.Screen name="Modal" component={ModalScreen} options={{presentation: 'modal'}} />
    //   {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
    //   </Stack.Group> */}
    //   {/* <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
    //   <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    //   */}
    // </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

// function BottomTabNavigator() {
//   const colorScheme = useColorScheme();

//   return (
//     <BottomTab.Navigator
//       initialRouteName="TabOne"
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme].tint,
//       }}>
//       <BottomTab.Screen
//         name="TabOne"
//         component={TabOneScreen}
//         options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
//           title: 'Tab One',
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//           headerRight: () => (
//             <Pressable
//               onPress={() => navigation.navigate('Modal')}
//               style={({ pressed }) => ({
//                 opacity: pressed ? 0.5 : 1,
//               })}>
//               <FontAwesome
//                 name="info-circle"
//                 size={25}
//                 color={Colors[colorScheme].text}
//                 style={{ marginRight: 15 }}
//               />
//             </Pressable>
//           ),
//         })}
//       />
//       <BottomTab.Screen
//         name="TabTwo"
//         component={TabTwoScreen}
//         options={{
//           title: 'Tab Two',
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//         }}
//       />
//     </BottomTab.Navigator>
//   );
// }

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
