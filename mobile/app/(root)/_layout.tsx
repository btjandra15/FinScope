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
                name="create"
                options={{
                    href: null,
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