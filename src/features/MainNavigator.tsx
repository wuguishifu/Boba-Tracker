import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme, NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator } from "react-native";

export type RootStackParamList = {

}

export type MainStackNavigator = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

export default function MainNavigator() {
    return (
        <NavigationContainer>

        </NavigationContainer>
    )
}