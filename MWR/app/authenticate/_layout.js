import {Stack} from "expo-router";

export default function layout() {
    
    return(
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="login" />
            <Stack.Screen name="register"/>
        </Stack>
    )
}