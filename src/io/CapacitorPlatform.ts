import { Capacitor } from "@capacitor/core";
import { Of } from "silentium";
import { Platform } from "../features/Platform";

export function CapacitorPlatform() {
    return Of(Capacitor.getPlatform() as Platform);
}
