import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { Text, View, Image } from "react-native";
import JournalHome from "../journalComponents/journalHome";
import Habits from "../habitComponents/tracker";
import TaskList from "../taskListComponents/taskList";

const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="#ff0000"
        inactiveColor="#8effec"
        screenOptions={{
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "#493c72",
            height: 95,
          },
          headerTitleStyle: {
            fontSize: 26,
            color: "#fff",
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarShowLabel: false,

          tabBarStyle: {
            position: "absolute",
            bottom: 55,
            left: 20,
            right: 20,
            borderRadius: 15,
            height: 50,
            backgroundColor: "#000",
          },
        }}
      >
        <Tab.Screen
          name="Journal"
          component={JournalHome}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <Image
                  resizeMode="contain"
                  style={{ tintColor: focused ? "#ff0000" : "#8effec" }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: focused ? "#ff0000" : "#8effec",
                  }}
                >
                  Journal
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Habits"
          component={Habits}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <Image
                  resizeMode="contain"
                  style={{ tintColor: focused ? "#ff0000" : "#8effec" }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: focused ? "#ff0000" : "#8effec",
                  }}
                >
                  Tracker
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="TaskList"
          component={TaskList}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <Image
                  resizeMode="contain"
                  style={{ tintColor: focused ? "#ff0000" : "#8effec" }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: focused ? "#ff0000" : "#8effec",
                  }}
                >
                  TaskList
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
