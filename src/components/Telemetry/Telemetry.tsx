import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Group, Button, Dialog, TextInput, Text, Progress, Stack, Anchor } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { useEffect, useState } from "react";

let telemetryEnabled = false;

export default class Telemetry extends React.Component {

    isEnabled() {
        return telemetryEnabled;
    }

    record(event: string, value: any) {
        // If telemetry is disabled, do nothing.
        if (!telemetryEnabled) return;
        // Get telemetry URL from env.
        let plausibleUrl: string | undefined = import.meta.env.VITE_PLAUSIBLE_URL;
        // If undefined, do nothing.
        if (plausibleUrl == undefined) return;

        // Otherwise, send POST request
        var xhr = new XMLHttpRequest();
        xhr.open("POST", plausibleUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            name: event,
            url: window.location.href,
            domain: window.location.hostname
        }));
    }

    allowTelemetry() {
        telemetryEnabled = true;
        this.setCookie("telemetry", true, 30);
    }

    denyTelemetry() {
        telemetryEnabled = false;
        this.setCookie("telemetry", false, 30);
    }

    setCookie(name: string, value: any, expireDays: number) {
        const d = new Date();
        d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    getCookie(name: string) {
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name + "=") == 0) {
                return c.substring((name + "=").length, c.length);
            }
        }
        return "";
    }

    render() {

        const [opened, { toggle, close }] = useDisclosure(true);
        const [value, setValue] = useState(100);

        function decreaseProgress(time: number, amount: number) {
            setTimeout(() => {
                setValue((prev) => {
                    const newValue = prev - amount;
                    return newValue;
                });
            }, time);
        }

        const denyAndClose = () => {
            this.denyTelemetry();
            close();
        }

        const acceptAndClose = () => {
            this.allowTelemetry();
            close();
        }

        useEffect(() => {

            // Get the cookie which records whether the user allows telemetry.
            let cookie = this.getCookie("telemetry");
            // If not empty, don't ask again.
            if (cookie != "") {
                close();
                return;
            }

            // Get analytics URL.
            let plausibleUrl: string | undefined = import.meta.env.VITE_PLAUSIBLE_URL;
            // If undefined, do nothing.
            if (plausibleUrl == undefined) {
                close();
                return;
            }

            // Get privacy policy URL.
            let privacyPolicyUrl: string | undefined = import.meta.env.VITE_PRIVACY_POLICY_URL;
            // If undefined, do nothing.
            if (privacyPolicyUrl == undefined) {
                close();
                return;
            }

            let timeoutMs = 10000;
            let intervalMs = 100;
            let progressCapacity = 100;
            let intervals = timeoutMs / intervalMs;
            let progressToRemoveEachTime = progressCapacity / intervals;

            for (let i = 1; i <= intervals; i++) {
                decreaseProgress(intervalMs * i, progressToRemoveEachTime);
            }

            setTimeout(() => {
                denyAndClose();
            }, timeoutMs);
        }, []);

        return (
            <Dialog opened={opened} onClose={close} size="md" radius="md" shadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)">
                <Stack>
                    <Progress value={value} transitionDuration={100} />
                    <Stack gap={0}>
                        <Text size="sm">
                            Allow anonymous telemetry? Data is collected for the curiosity of the developer of Flight Forge.
                        </Text>
                        <Text size="xs">
                            "Don't share data" will be assumed if no option is chosen. More information can be found in the <Anchor href={import.meta.env.VITE_PRIVACY_POLICY_URL} target="new">Privacy Policy<FontAwesomeIcon icon={faArrowUpRightFromSquare} size='xs' /></Anchor>.
                        </Text>
                    </Stack>
                    <Group justify="space-between" grow>
                        <Button onClick={acceptAndClose}>Share data</Button>
                        <Button onClick={denyAndClose}>Don't share data</Button>
                    </Group>
                </Stack>
            </Dialog>
        )
    }

}