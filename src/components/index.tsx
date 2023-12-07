// In App.js in a new project

import * as React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppNavigation from "./navigators";
import styles from "./styles";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <SafeAreaView style={styles.container}>
            <NavigationContainer>
                <AppNavigation />
            </NavigationContainer>
        </SafeAreaView>
    );
}

export default App;
