import { NavigationNative, React, ReactNative } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";

import { currentSettings } from ".";
import Constants from "./constants";
import { initialize } from "./utils";

const { ScrollView, TouchableOpacity, Text } = ReactNative;
const { FormInput, FormDivider, FormSwitchRow, FormText, FormIcon } = Forms;

function UpdateButton() {
    async function onPressCallback() {
        for (const key in storage) {
            if (storage[key] === false || storage[key]) {
                currentSettings[key] = storage[key];
            }
        }

        console.log("Applying settings...");
        await initialize();
        showToast("Settings updated!", getAssetIDByName("Check"));
    }

    return <TouchableOpacity onPress={onPressCallback}>
        <FormText style={{ marginRight: 12 }}>UPDATE</FormText>
    </TouchableOpacity>;

}

export default function Settings() {
    const settings = useProxy(storage) as PluginSettings;
    const navigation = NavigationNative.useNavigation();

    React.useEffect(() => {
        navigation.setOptions({
            title: "Last.fm Configuration",
            headerRight: UpdateButton
        });
    }, []);

    return (
        <ScrollView>
            <FormInput
                value={settings.appName || undefined}
                onChangeText={(value: string) => settings.appName = value.trim()}
                title="Discord Application Name"
                placeholder={Constants.DEFAULT_APP_NAME}
                returnKeyType="done"
            />
            <FormDivider />
            <FormInput required
                value={settings.username || undefined}
                onChangeText={(value: string) => settings.username = value.trim()}
                title="Last.fm username"
                helpText={!settings.username && <Text style={{ color: "#FF0000" }}>{"This field is required!"}</Text>}
                placeholder="wumpus123"
                returnKeyType="done"
            />
            <FormDivider />
            <FormInput
                value={settings.timeInterval}
                onChangeText={(value: string) => settings.timeInterval = Number(value)}
                title="Update interval (in seconds)"
                placeholder={Constants.DEFAULT_TIME_INTERVAL.toString()}
                keyboardType="numeric"
                returnKeyType="done"
            />
            <FormDivider />
            <FormSwitchRow
                label="Show time elapsed"
                subLabel="Show the time elapsed since the song started playing"
                leading={<FormIcon source={getAssetIDByName("clock")} />}
                value={settings.showTimestamp}
                onValueChange={(value: boolean) => settings.showTimestamp = value}
            />
            <FormDivider />
            <FormSwitchRow
                label="Set status as listening"
                subLabel='Set your status as "Listening to" instead of "Playing"'
                leading={<FormIcon source={getAssetIDByName("ic_headset_neutral")} />}
                value={settings.listeningTo}
                onValueChange={(value: boolean) => settings.listeningTo = value}
            />
            <FormDivider />
            <FormSwitchRow
                label="Verbose logging"
                subLabel="Log more information to the console for debugging purposes"
                leading={<FormIcon source={getAssetIDByName("pencil")} />}
                value={settings.verboseLogging}
                onValueChange={(value: boolean) => settings.verboseLogging = value}
            />
        </ScrollView>
    );
}
