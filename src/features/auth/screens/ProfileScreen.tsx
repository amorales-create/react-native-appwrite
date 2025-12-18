import React from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '../../../shared/store/hooks';
import { selectUser } from '../store/authSelectors';
import Avatar from '../../../shared/components/Avatar';

const ProfileScreen = () => {
    const user = useAppSelector(selectUser);

    return (
        <View className="flex-1 items-center justify-start px-6 pt-16 bg-light-bg dark:bg-dark-bg">
            <Avatar email={user?.email} />

            <Text className="text-xl font-bold mt-6">{user?.name ?? '—'}</Text>
            <Text className="text-sm text-gray-500 mt-1">{user?.email ?? '—'}</Text>
            <Text className="text-sm text-gray-500 mt-1">{`Type: ${user?.type ?? '—'}`}</Text>
        </View>
    );
};

export default ProfileScreen;
