import React, { useRef } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
interface SearchBarProps {
    changeInputFocus: (focused: boolean) => void;
}

export default function SearchBar({ changeInputFocus }: SearchBarProps) {
    const inputSearch = useRef<TextInput>(null);

    return (
        <View style={styles.searchContainer}>
            <View style={styles.searchInput}>
                <Feather name="search" style={styles.searchIcon} color='#bbb' />
                <TextInput
                    style={styles.inputText}
                    placeholder={"Mau Cari Apa?"}
                    placeholderTextColor={'#fff'}
                    autoCorrect={false}
                    onFocus={() => changeInputFocus(true)}
                    onBlur={() => changeInputFocus(false)}
                    ref={inputSearch}
                />
                <Octicons name="filter" style={styles.searchIcon} color="white" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        padding: 20
    },
    searchInput: {
        backgroundColor: '#1F4287',
        borderRadius: 15,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    searchIcon: {
        marginRight: 10,
        fontSize: 22,
        color: '#fff',
    },
    inputText: {
        flex: 1,
        fontSize: 18,
        color: '#fff',
    },
});
