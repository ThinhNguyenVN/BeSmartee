/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./src/components";
import { name as appName } from "./app.json";

if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

export default function Main() {
    return <App />;
}

AppRegistry.registerComponent(appName, () => Main);
