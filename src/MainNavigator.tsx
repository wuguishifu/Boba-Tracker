import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme, NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import { useAppearance } from "./context/AppearanceContext";

export type RootStackParamList = {
    HomeTest: undefined;
    BudgetTest: undefined;
    ListTest: undefined;
    ProfileTest: undefined;
}

export type MainStackNavigator = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

export default function MainNavigator() {
    const colors = useAppearance();
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='HomeTest'
                screenOptions={{
                    tabBarStyle: [{
                        backgroundColor: 'white',
                        borderTopColor: 'black'
                    }],
                    lazy: true
                }}
            >
                <Tab.Screen
                    name='HomeTest'
                    component={HomeTest}
                    options={{
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name='BudgetTest'
                    component={BudgetTest}
                    options={{
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name='ListTest'
                    component={ListTest}
                    options={{
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name='ProfileTest'
                    component={ProfileTest}
                    options={{
                        headerShown: false,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

function HomeTest() {
    return (
        <View style={{ backgroundColor: 'blue', flex: 1, width: '100%' }} />
    );
}

function BudgetTest() {
    return (
        <View style={{ backgroundColor: 'red', flex: 1, width: '100%' }} />
    );
}

function ListTest() {
    return (
        <View style={{ backgroundColor: 'yellow', flex: 1, width: '100%' }} />
    )
}

function ProfileTest() {
    return (
        <View style={{ backgroundColor: 'green', flex: 1, width: '100%' }} />
    );
}