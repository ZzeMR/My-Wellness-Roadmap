import { Stack } from "expo-router";
import { ModalPortal } from 'react-native-modals';

export default function layout() {

    return (
        <>
            <Stack screenOptions={{headerShown:false}}>
                  <Stack.Screen name="index" />
            </Stack>

        
        </>
    )
}