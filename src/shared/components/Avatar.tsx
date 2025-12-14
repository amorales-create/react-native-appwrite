import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

interface AvatarProps {
    email?: string | null;
    size?: number;
    onPress?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({ email, size = 40, onPress }) => {
    const initials = email ? email.charAt(0).toUpperCase() : '?';

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden' }}
        >
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#3B82F6',
                }}
            >
                <Text style={{ color: 'white', fontWeight: '600' }}>{initials}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default Avatar;
