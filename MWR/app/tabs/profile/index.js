import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';


const index = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      router.replace("../authenticate/login"); // Assuming your login screen is at '/login'
    } catch (error) {
      console.log("khalils",error);
    }
  };
  return (
    <SafeAreaView>
    <View style={{marginTop:30}}>
     <Pressable onPress={handleLogout} style={{ width: 100, backgroundColor: "#6699CC", padding: 15, borderRadius: 6, marginLeft: "auto", marginRight: "auto" }}>
                            <Text style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: 16 }}>
                                Logout
                            </Text>
                        </Pressable>
    </View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})