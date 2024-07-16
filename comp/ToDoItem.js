import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ToDoItem = ({ item, onToggle, onDelete, onEdit }) => {
  return (
    <View style={styles.item}>
      {/* Nút để thay đổi trạng thái hoàn thành */}
      <TouchableOpacity onPress={() => onToggle(item.id)}>
        <Icon name={item.completed ? 'check-square' : 'square-o'} size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={[styles.title, item.completed && styles.completedText]}>
          Tiêu Đề : {item.title}
        </Text>
        <Text style={[styles.text, item.completed && styles.completedText]}>
          Nội Dung : {item.context}
        </Text>
      </View>
      {/* Nút chỉnh sửa */}
      <TouchableOpacity onPress={() => onEdit(item.id)} style={styles.iconContainer}>
        {/* <Icon name="edit" size={24} color="blue" /> */}
        <Image style={{width:25, height:25}} source={require('../images/image2.png')}/>
      </TouchableOpacity>
      {/* Nút xóa */}
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.iconContainer}>
        {/* <Icon name="trash" size={24} color="red" /> */}
        <Image style={{width:25, height:25}} source={require('../images/image.png')}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  text: {
    marginTop: 5,
    color: 'black',
  },
  completedText: {
    color: '#888',
    textDecorationLine: 'line-through',
  },
  iconContainer: {
    padding: 5,
  },
});

export default ToDoItem;