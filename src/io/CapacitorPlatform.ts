import { Capacitor } from "@capacitor/core";
import { Of } from "silentium";
import { Platform } from "../features/Platform";

/**
 * The name of the current platform
 */
export function CapacitorPlatform() {
    return Of(Capacitor.getPlatform() as Platform);
}
