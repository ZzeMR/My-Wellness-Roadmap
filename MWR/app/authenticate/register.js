import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, Alert} from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Octicons } from '@expo/vector-icons';
import axios, { Axios } from 'axios';
const register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const handleRegister = () => {
        const user = {
        
            name: name,
            email: email,
            password: password,
            
        };

        axios.post("http://192.168.1.108:3000/register",user).then((response)=>{
            console.log(response);
            Alert.alert("success","user created successfully");
            setEmail("");
            setPassword("");
            setName("");
        }).catch((error) => {
            Alert.alert("Registration failed","an error ocurred during registration");
            console.log("error",error)
        })

    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <View style={{ marginTop: 80, }}>
                <Text style={{ fontSize: 16, fontWeight: 500, color: "#0066b2" }}>Todo List tracker</Text>
            </View>
            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: "red", marginTop: 20 }}>sign up</Text>
                </View>
                
                <View style={{ marginTop: 20 }}>
                     <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#E0E0E0", paddingVertical: 3, borderRadius: 10, marginTop: 30 }}>
                     <Octicons style={{ marginLeft: 10 }}  name="person" size={24} color="black" />
                        <TextInput value={name} onChangeText={(text) => setName(text)} style={{ color: "gray", marginVertical: 10, width: 300, fontSize: email ? 17 : 17 }} placeholder='enter name' />
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#E0E0E0", paddingVertical: 3, borderRadius: 10, marginTop: 30 }}>
                        <MaterialIcons style={{ marginLeft: 10 }} name="email" size={24} color="black" />
                        <TextInput value={email} onChangeText={(text) => setEmail(text)} style={{ color: "gray", marginVertical: 10, width: 300, fontSize: email ? 17 : 17 }} placeholder='enter your mail' />
                    </View>


                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#E0E0E0", paddingVertical: 3, borderRadius: 10, marginTop: 30 }}>
                        <MaterialCommunityIcons style={{ marginLeft: 10 }} name="form-textbox-password" size={24} color="black" />
                        <TextInput value={password} secureTextEntry={true} onChangeText={(text) => setPassword(text)} style={{ color: "gray", marginVertical: 10, width: 300, fontSize: email ? 17 : 17 }} placeholder='enter password' />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Pressable onPress={handleRegister} style={{ width: 100, backgroundColor: "#6699CC", padding: 15, borderRadius: 6, marginLeft: "auto", marginRight: "auto" }}>
                            <Text style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: 16 }}>
                                sign up
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => router.replace("./login")} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign: "center", color: "gray", fontWeight: "bold", fontSize: 14 }}>
                                already have an account
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default register

const styles = StyleSheet.create({})
