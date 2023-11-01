import { Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold, useFonts } from "@expo-google-fonts/nunito";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import store from './src/features/store';
import { Provider as ReduxProvider } from 'react-redux';
import MainNavigator from "./src/MainNavigator";
import { AppearanceProvider } from "./src/context/AppearanceContext";
import { DatabaseProvider } from "./src/context/DatabaseContext";

export default function App() {
    const [fontsLoaded] = useFonts({
        regular: Nunito_400Regular,
        medium: Nunito_500Medium,
        semibold: Nunito_600SemiBold,
        bold: Nunito_700Bold,
    });

    if (!fontsLoaded) return <View />;

    return (
        <ReduxProvider store={store}>
            <ProviderTree />
        </ReduxProvider>
    );
};

function ProviderTree() {
    return (
        <Composer components={[
            SafeAreaProvider,
            AppearanceProvider,
            DatabaseProvider
        ]}>
            <MainNavigator />
        </Composer>
    );
}

interface ComposerProps {
    components: Array<React.JSXElementConstructor<unknown & { children: React.ReactNode }>>;
    children: React.ReactNode;
}

function Composer(props: ComposerProps) {
    return <>{props.components.reduceRight((acc, Comp) => <Comp>{acc}</Comp>, props.children)}</>
}