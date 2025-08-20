import { useUser } from "@clerk/clerk-expo";
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
                }}
            />

            <Tabs.Screen
                name="createTransactions"
                options={{
                    href: null,
                    headerShown: false,
                }}
            />

            <Tabs.Screen
                name="createSubscriptions"
                options={{
                    href: null,
                    headerShown: false,
                }}
            />

            <Tabs.Screen
                name="subscriptions"
                options={{
                    title: 'Subscriptions',
                    headerShown: false,   
                }}
            />
        </Tabs>
    )
}