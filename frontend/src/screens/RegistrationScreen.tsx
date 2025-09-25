import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView, ActivityIndicator } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { api } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Registration'>;

export default function RegistrationScreen({ route, navigation }: Props) {
  const { plateNumber } = route.params;
  const [ownerName, setOwnerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [validityStart, setValidityStart] = useState('');
  const [validityEnd, setValidityEnd] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!ownerName || !phoneNumber || !validityStart || !validityEnd) {
      setError('All fields are required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await api.registerVehicle({
        plateNumber,
        ownerName,
        phoneNumber,
        validityStart,
        validityEnd,
      });
      
      // Return to camera screen after successful registration
      navigation.navigate('Camera');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register vehicle');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Vehicle Registration</Text>
      <Text style={styles.label}>Plate Number</Text>
      <TextInput
        style={styles.input}
        value={plateNumber}
        editable={false}
      />
      
      <Text style={styles.label}>Owner Name</Text>
      <TextInput
        style={styles.input}
        value={ownerName}
        onChangeText={setOwnerName}
        placeholder="Enter owner name"
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Validity Start Date</Text>
      <TextInput
        style={styles.input}
        value={validityStart}
        onChangeText={setValidityStart}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Validity End Date</Text>
      <TextInput
        style={styles.input}
        value={validityEnd}
        onChangeText={setValidityEnd}
        placeholder="YYYY-MM-DD"
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity 
        style={styles.button}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register Vehicle</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});