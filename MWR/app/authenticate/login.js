import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    useEffect(() => {
        const checkloginStatus=async ()=>{
            try{
                const token= await AsyncStorage.getItem("authToken");
                if(token){
                    router.replace("/tabs/home");
                }
            }catch(error){
                console.log(error)
            }
        }
        checkloginStatus();
    },[])
    const handlelogin=() => {
    const user ={
        email:email,
        password:password,
    };
    axios.post("http://192.168.1.108:3000/login",user).then((response)=>{
           const token =response.data.token;
           AsyncStorage.setItem("authToken",token);
           router.replace("/tabs/home");

        })

};
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <View style={{ marginTop: 80, }}>
                <Text style={{ fontSize: 16, fontWeight: 500, color: "#0066b2" }}>Todo List tracker</Text>
            </View>
            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: "red", marginTop: 20 }}>Login into account</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#E0E0E0", paddingVertical: 3, borderRadius: 10, marginTop: 30 }}>
                        <MaterialIcons style={{ marginLeft: 10 }} name="email" size={24} color="black" />
                        <TextInput value={email} onChangeText={(text) => setEmail(text)} style={{ color: "gray", marginVertical: 10, width: 300, fontSize: email ? 17 : 17 }} placeholder='enter your mail' />
                    </View>


                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#E0E0E0", paddingVertical: 3, borderRadius: 10, marginTop: 30 }}>
                        <MaterialCommunityIcons style={{ marginLeft: 10 }} name="form-textbox-password" size={24} color="black" />
                        <TextInput value={password} secureTextEntry={true} onChangeText={(text) => setPassword(text)} style={{ color: "gray", marginVertical: 10, width: 300, fontSize: email ? 17 : 17 }} placeholder='enter password' />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Pressable onPress={handlelogin} style={{ width: 100, backgroundColor: "#6699CC", padding: 15, borderRadius: 6, marginLeft: "auto", marginRight: "auto" }}>
                            <Text style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: 16 }}>
                                Login
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => router.replace("./register")} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign: "center", color: "gray", fontWeight: "bold", fontSize: 14 }}>
                                Register
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default login

const styles = StyleSheet.create({})
