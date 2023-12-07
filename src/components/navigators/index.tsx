import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import ListOrderScreen from "../screens/ListOrderScreen";
import CreateOrderScreen from "../screens/CreateOrderScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function OrderStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="OrderList" component={ListOrderScreen} />
            <Stack.Screen name="OrderDetail" component={CreateOrderScreen} />
        </Stack.Navigator>
    );
}

const Tab = createMaterialBottomTabNavigator();

function AppNavigation() {
    return (
        <Tab.Navigator barStyle={{ backgroundColor: "white" }}>
            <Tab.Screen name="Order" component={OrderStack} />
            <Tab.Screen name="Add new" component={CreateOrderScreen} />
        </Tab.Navigator>
    );
}

export default AppNavigation;
