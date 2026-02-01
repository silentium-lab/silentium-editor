import { Capacitor } from "@capacitor/core";
import { MessageType, Of } from "silentium";
import { Platform } from "../domain/Platform";

export function CapacitorPlatform() {
    return Of(Capacitor.getPlatform()) as MessageType<Platform>;
}
