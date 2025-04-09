import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "../../assets/styles/signup.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Signup() {
  const [username, setUsername] = useState("");  
  const [email, setEmail] = useState("");        
  const [password, setPassword] = useState("");  
  const [showPassword, setShowPassword] = useState(false);  
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSignup = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <KeyboardAvoidingView style={{flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} >
      <View style={styles.container}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Booking App</Text>
            <Text style={styles.subtitle}>Share your favorite reads</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color={COLORS.primary} style={styles.inputIcon}/>
                <TextInput 
                  style={styles.input} 
                  placeholderTextColor={COLORS.placeholderText} 
                  placeholder="Enter your username" 
                  value={username} 
                  onChangeText={(text) => setUsername(text)}  
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color={COLORS.primary} style={styles.inputIcon}/>
                <TextInput style={styles.input} placeholderTextColor={COLORS.placeholderText} placeholder="Enter your email" value={email} onChangeText={(text) => setEmail(text)}/>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={COLORS.primary} style={styles.inputIcon}/>
                <TextInput style={styles.input} placeholderTextColor={COLORS.placeholderText} placeholder="********" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={!showPassword}/>
                <TouchableOpacity style={styles.showPasswordButton} onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color={COLORS.primary}/>
                </TouchableOpacity>
              </View>
            </View>
                   
            <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color={COLORS.white}/>
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
