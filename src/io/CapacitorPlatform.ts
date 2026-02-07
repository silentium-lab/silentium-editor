import { Capacitor } from "@capacitor/core";
import { Of } from "silentium";
import { Platform } from "./Platform";

/**
 * The name of the current platform
 */
export function PlatformName() {
    return Of(Capacitor.getPlatform() as Platform);
}
