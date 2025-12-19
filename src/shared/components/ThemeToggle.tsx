import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleTheme } from '../theme/themeSlice';
import { THEME_EMOJI } from '../constants/ui';


export const ThemeToggle = ()=> {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme.mode);
    const isDark = theme === "dark";
     
    return (
        <TouchableOpacity
                     onPress={() => dispatch(toggleTheme())}
                     className={`px-4 py-2 rounded-lg ${
                       isDark ? "bg-dark-surface" : "bg-light-surface"
                     }`}
                     activeOpacity={0.7}
                   >
                     <Text className="text-xl">
                       {isDark ? THEME_EMOJI.DARK : THEME_EMOJI.LIGHT}
                     </Text>
                   </TouchableOpacity>
    );
};

export default ThemeToggle;
