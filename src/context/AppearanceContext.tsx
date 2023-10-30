import { ReactNode, createContext, useContext } from "react";

const colors = {
    blue: {
        primary: "#31555A",
        secondary: "#58949C",
        tertiary: '#ABC9CD',
        light: '#CDDFE1'
    },
    black: '#222222',
    white: '#FEFEFE',
    grey: '#565656',
    lightGrey: '#BBBABA',
    rose: '#E29782',
    yellow: '#F1D7B4',
    tan: '#EDE6D2'
};

const AppearanceContext = createContext({
    colors: colors
});

export function useAppearance() {
    return useContext(AppearanceContext).colors;
}

export function AppearanceProvider({ children }: { children: ReactNode }) {
    return (
        <AppearanceContext.Provider value={{ colors }}>
            {children}
        </AppearanceContext.Provider>
    );
}