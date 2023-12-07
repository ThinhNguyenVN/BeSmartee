import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ListOrderScreen from "../screens/ListOrderScreen";
import CreateOrderScreen from "../screens/CreateOrderScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OrderStackParamList } from "../../types";

const Stack = createNativeStackNavigator<OrderStackParamList>();

function OrderStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="OrderList"
                component={ListOrderScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="OrderDetail"
                component={CreateOrderScreen}
                options={({ route }) => ({
                    title: route.params.order
                        ? `Order-${route.params.order?.id}`
                        : "Create Order",
                })}
            />
        </Stack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function AppNavigation() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarIconStyle: {
                    display: "none",
                },
                tabBarLabelStyle: {
                    fontSize: 16,
                },
            }}
        >
            <Tab.Screen
                name="Order"
                component={OrderStack}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen name="Add new" component={CreateOrderScreen} />
        </Tab.Navigator>
    );
}

export default AppNavigation;
