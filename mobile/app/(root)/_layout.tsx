import { useUser } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Stack, Tabs } from "expo-router";

export default function Layout () {
    const {isSignedIn} = useUser();

    if(!isSignedIn) return <Redirect href={"/sign-in"}/>;

    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,  
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="home-outline" size={size} color={color}/>
                    ),
                }}
            />

            <Tabs.Screen
                name="budget"
                options={{
                    title: 'Budget',
                    headerShown: false,  
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="wallet-outline" size={size} color={color}/>
                    ),
                }}
            />

            <Tabs.Screen
                name="subscriptions"
                options={{
                    title: 'Subscriptions',
                    headerShown: false,   
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="calendar-outline" size={size} color={color}/>
                    ),
                }}
            />
        </Tabs>
    )
}