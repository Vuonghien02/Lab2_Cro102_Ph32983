import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AddToDo = ({ onAdd }) => {
  const [title, setTitle] = useState(''); // Trạng thái tiêu đề
  const [context, setContext] = useState(''); // Trạng thái nội dung

  // Xử lý khi nhấn nút "Thêm"
  const handleAdd = () => {
    if (title.trim()) { // Kiểm tra tiêu đề không rỗng
      onAdd(title, context); // Gọi hàm onAdd từ cha
      setTitle(''); // Reset tiêu đề
      setContext(''); // Reset nội dung
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tiêu Đề</Text>
      <TextInput
        style={styles.input}
        placeholder="Thêm tiêu đề"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={[styles.label, styles.marginTop]}>Nội Dung</Text>
      <TextInput
        style={styles.input}
        placeholder="Thêm nội dung"
        value={context}
        onChangeText={setContext}
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Thêm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    height: 50,
    borderRadius: 10,
  },
  label: {
    color: "black",
    fontWeight: 'bold',
    fontSize: 16,
  },
  marginTop: {
    marginTop: 30,
  },
  button: {
    height: 50,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default AddToDo;