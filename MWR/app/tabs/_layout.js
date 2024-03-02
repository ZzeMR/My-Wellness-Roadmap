import { Tabs } from "expo-router";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
export default function layout() {

    return (
        <Tabs>
            <Tabs.Screen 
                name="home"
                options={{
                    tabBarLabel: "home",
                    tabBarBadgeStyle: { color: "#7CB9E8" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => focused ? (
                        <FontAwesome name="tasks" size={24} color="#7CB9E8" />
                    ) : (
                        <FontAwesome name="tasks" size={24} color="#000000" />
                    )
                }}




            />


            <Tabs.Screen
                name="daily"
                options={{
                    tabBarLabel: "daily",
                    tabBarBadgeStyle: { color: "#7CB9E8" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => focused ? (
                        <AntDesign name="book" size={24} color="#7CB9E8" />
                    ) : (
                        <AntDesign name="book" size={24} color="#000000" />
                    )
                }}




            />

<Tabs.Screen
                name="profile"
                options={{
                    tabBarLabel: "profile",
                    tabBarBadgeStyle: { color: "#7CB9E8" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => focused ? (
                        <Ionicons name="person-circle-outline" size={24} color="#7CB9E8" />
                    ) : (
                        <Ionicons name="person-circle-outline" size={24} color="#000000" />
                    )
                }}




            />

        </Tabs>
    );

}