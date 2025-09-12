import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';

export interface PermissionStatus {
    granted: boolean;
    canAskAgain: boolean;
    status: string;
}

export const usePermissions = () => {
    const [audioPermission, setAudioPermission] = useState<PermissionStatus>({
        granted: false,
        canAskAgain: true,
        status: 'undetermined'
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        checkAudioPermission();
    }, []);

    const checkAudioPermission = async () => {
        try {
            const { status, canAskAgain } = await Audio.getPermissionsAsync();
            setAudioPermission({
                granted: status === 'granted',
                canAskAgain,
                status
            });
        } catch (error) {
            console.log('Error checking audio permission:', error);
        }
    };

    const requestAudioPermission = async (): Promise<boolean> => {
        if (isLoading) return false;

        setIsLoading(true);

        try {
            const { status, canAskAgain } = await Audio.requestPermissionsAsync();

            const newPermissionStatus = {
                granted: status === 'granted',
                canAskAgain,
                status
            };

            setAudioPermission(newPermissionStatus);

            if (status === 'granted') {
                return true;
            } else if (status === 'denied' && canAskAgain) {
                // Permission denied but can ask again
                Alert.alert(
                    'Microphone Permission',
                    'Microphone access is required for voice recording. Please allow microphone access in your device settings.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Try Again', onPress: () => requestAudioPermission() }
                    ]
                );
                return false;
            } else if (status === 'denied' && !canAskAgain) {
                // Permission permanently denied
                Alert.alert(
                    'Microphone Permission Blocked',
                    'Microphone access has been permanently denied. To use voice features, please enable microphone access in your device settings.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'Open Settings',
                            onPress: () => {
                                // On iOS, this will open the app settings
                                if (Platform.OS === 'ios') {
                                    // You can use Linking.openSettings() if needed
                                    console.log('Open iOS settings');
                                }
                            }
                        }
                    ]
                );
                return false;
            } else {
                // Other status (undetermined, etc.)
                Alert.alert(
                    'Microphone Permission',
                    'Unable to access microphone. Please check your device settings and try again.',
                    [{ text: 'OK' }]
                );
                return false;
            }
        } catch (error) {
            console.log('Error requesting audio permission:', error);
            Alert.alert(
                'Permission Error',
                'An error occurred while requesting microphone permission. Please try again.',
                [{ text: 'OK' }]
            );
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const showPermissionAlert = (type: 'blocked' | 'unavailable' | 'denied') => {
        const alerts = {
            blocked: {
                title: 'Microphone Permission Blocked',
                message: 'Microphone access has been permanently blocked. To use voice features, please enable microphone access in your device settings.',
                buttons: [
                    { text: 'Cancel', style: 'cancel' as const },
                    { text: 'Open Settings', onPress: () => console.log('Open settings') }
                ]
            },
            unavailable: {
                title: 'Microphone Unavailable',
                message: 'Microphone is not available on this device or is being used by another app. Please try again later.',
                buttons: [{ text: 'OK' }]
            },
            denied: {
                title: 'Microphone Permission Denied',
                message: 'Microphone access is required for voice recording. Please allow microphone access to use this feature.',
                buttons: [
                    { text: 'Cancel', style: 'cancel' as const },
                    { text: 'Try Again', onPress: () => requestAudioPermission() }
                ]
            }
        };

        Alert.alert(alerts[type].title, alerts[type].message, alerts[type].buttons);
    };

    return {
        audioPermission,
        isLoading,
        requestAudioPermission,
        checkAudioPermission,
        showPermissionAlert
    };
};
