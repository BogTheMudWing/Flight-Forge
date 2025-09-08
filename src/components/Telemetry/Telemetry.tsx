import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Group, Button, Dialog, TextInput, Text, Progress, Stack, Anchor } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { init, track } from "@plausible-analytics/tracker";
import React from "react";
import { useEffect, useState } from "react";

let telemetryEnabled = false;

export function isTelemetryEnabled() {
    return telemetryEnabled;
}

export function recordTelemetry(event: string, value: any) {
    // If telemetry is disabled, do nothing.
    if (!telemetryEnabled) return;
    // Get telemetry URL from env.
    let plausibleUrl: string | undefined = import.meta.env.VITE_PLAUSIBLE_URL;
    // If undefined, do nothing.
    if (plausibleUrl == undefined) return;

    // Otherwise, send data
    console.log("Sending event " + event + " with data: " + value);
    let data: Record<string, string> = {[event]: value};
    track("test", { props: data });
}

function setCookie(name: string, value: any, expireDays: number) {
    const d = new Date();
    d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name: string) {
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

export function allowTelemetry(doSetCookie: boolean) {
    if (setCookie) setCookie("telemetry", true, 30);
    telemetryEnabled = true;
    localStorage.plausible_ignore = "false";
    init({
        domain: import.meta.env.VITE_HOST,
        endpoint: import.meta.env.VITE_PLAUSIBLE_URL,
        captureOnLocalhost: false
    });
}

export function denyTelemetry(doSetCookie: boolean) {
    if (setCookie) setCookie("telemetry", false, 30);
    telemetryEnabled = false;
    localStorage.plausible_ignore = "false";
}

export default function Telemetry() {

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
        denyTelemetry(true);
        close();
    }

    const acceptAndClose = () => {
        allowTelemetry(true);
        close();
    }

    useEffect(() => {

        // Get analytics URL.
        let plausibleUrl: string | undefined = import.meta.env.VITE_PLAUSIBLE_URL;
        // If undefined, do nothing.
        if (plausibleUrl == undefined) {
            denyTelemetry(false);
            return;
        }

        // Get privacy policy URL.
        let privacyPolicyUrl: string | undefined = import.meta.env.VITE_PRIVACY_POLICY_URL;
        // If undefined, do nothing.
        if (privacyPolicyUrl == undefined) {
            denyTelemetry(false);
            return;
        }

        // Get the cookie which records whether the user allows telemetry.
        let cookie = getCookie("telemetry");
        // If not empty, don't ask again.
        if (cookie != "") {
            close();
            if (cookie == "true") {
                allowTelemetry(true);
            } else {
                allowTelemetry(false);
            }
            return;
        }

        let timeoutMs = 30000;
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
                        "Don't share data" will be assumed if no option is chosen. By clicking "Share data", you acknowledge that you accept the <Anchor href={import.meta.env.VITE_PRIVACY_POLICY_URL} target="new">Privacy Policy<FontAwesomeIcon icon={faArrowUpRightFromSquare} size='xs' /></Anchor>.
                    </Text>
                </Stack>
                <Group justify="space-between" grow>
                    <Button onClick={acceptAndClose}>Share data</Button>
                    <Button onClick={denyAndClose}>Don't share</Button>
                </Group>
            </Stack>
        </Dialog>
    )
}