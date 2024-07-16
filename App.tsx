import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Modal, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToDoItem from './comp/ToDoItem';
import AddToDo from './comp/AddToDo';

type Todo = {
  id: string;
  title: string;
  context: string;
  completed: boolean;
};

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);  // Định nghĩa kiểu cho state todos
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Load todos từ AsyncStorage khi component được mount
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosString = await AsyncStorage.getItem('todos');
        if (todosString !== null) {
          setTodos(JSON.parse(todosString));
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadTodos();
  }, []);

  // Lưu todos vào AsyncStorage khi todos thay đổi
  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.error(error);
      }
    };
    saveTodos();
  }, [todos]);

  // Thêm một todo mới
  const addTodo = (title: string, context: string) => {
    setTodos([
      ...todos,
      { id: Date.now().toString(), title, context, completed: false }
    ]);
  };

  // Đánh dấu todo hoàn thành hoặc chưa hoàn thành
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Xóa một todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Chỉnh sửa một todo
  const editTodo = (id: string) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      setEditingTodo(todo);
      setModalVisible(true);
    }
  };

  // Lưu thay đổi khi chỉnh sửa todo
  const saveEdit = () => {
    if (editingTodo) {
      setTodos(
        todos.map(todo =>
          todo.id === editingTodo.id ? editingTodo : todo
        )
      );
      setEditingTodo(null);
      setModalVisible(false);
    }
  };

  // Đếm số lượng todo hoàn thành và chưa hoàn thành
  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <Text style={styles.header}>
        Hoàn thành: {completedCount} - Chưa hoàn thành: {pendingCount}
      </Text>
      <AddToDo onAdd={addTodo} />
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <ToDoItem item={item} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
        )}
        keyExtractor={(item) => item.id}
      />
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'black', fontSize: 30, marginBottom: 30, fontWeight: 'bold' }}>Sửa</Text>
          </View>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Tiêu Đề :</Text>
          <TextInput
            style={styles.input}
            placeholder="Tiêu đề"
            value={editingTodo?.title}
            onChangeText={(text) => setEditingTodo(prev => prev ? { ...prev, title: text } : prev)}
          />
          <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 10 }}>Nội Dung :</Text>
          <TextInput
            style={[styles.input, { marginBottom: 20 }]}
            placeholder="Nội dung"
            value={editingTodo?.context}
            onChangeText={(text) => setEditingTodo(prev => prev ? { ...prev, context: text } : prev)}
          />
          <TouchableOpacity onPress={saveEdit} style={styles.button_modal}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Lưu</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(false)} style={[{ marginTop: 10 }, styles.button_modal]}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 5
  },
  button_modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'black',
    borderRadius: 5
  },
});

export default App;