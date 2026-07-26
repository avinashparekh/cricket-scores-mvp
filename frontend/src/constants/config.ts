import { Platform } from 'react-native';

/**
 * Default API host:
 * - Android emulator: 10.0.2.2 maps to the host machine
 * - iOS simulator / web: localhost
 * Override with EXPO_PUBLIC_API_URL for a physical device (use your LAN IP).
 */
const defaultHost =
  Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '') || defaultHost;

export const REQUEST_TIMEOUT_MS = 10000;
