import { Pressable, ScrollViewComponent, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Image, ScrollView } from 'react-native';
import { BottomModal, SlideAnimation, ModalTitle, ModalContent } from 'react-native-modals';
import axios from 'axios';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
const index = () => {
  const [todos, setTodos] = useState([]);
  const [isModalVisiblee, setModalVisiblee] = useState(false);
  const [todo, setTodo] = useState("");
  const [category, setCategory] = useState("All");
  const [pendingTodos, setpendingTodos] = useState([]);
  const [completedTodos, setcompletedTodos] = useState([]);
  const [marked, setMarked] = useState(false);
  const today = moment().format("YYYY-MM-DD");

  const calculateTimeRemaining = () => {
    // Get the current date and time
    const currentTime = new Date();

    // Set the end of the next day
    const endOfNextDay = new Date(currentTime);
    endOfNextDay.setDate(currentTime.getDate() + 1);
    endOfNextDay.setHours(0, 0, 0, 0); // Set to the beginning of the next day

    // Calculate the time difference until the end of the next day
    const timeDifference = endOfNextDay - currentTime;

    // Convert the time difference to hours, minutes, and seconds
    const hours = Math.floor(timeDifference / (60 * 60 * 1000));
    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;

    
};
useEffect(() => {
  // Update the time every second
  const intervalId = setInterval(() => {
    // Force a re-render to update the time
    // You might want to fetch fresh data here too
    getUserTodos();
    setMarked((prev) => !prev);
  }, 1000);

  // Clear the interval when the component unmounts
  return () => clearInterval(intervalId);
}, []);



  const isTaskExpired = (taskDate) => {
    const taskTimestamp = moment(taskDate).valueOf();
    
    // Get the end of the current day
    const endOfDayTimestamp = moment().endOf('day').valueOf();
    
    return taskTimestamp < endOfDayTimestamp;
  };
 

  const deleteTodo = async (tododailiesId) => {
    try {
      await axios.delete(`http://192.168.1.108:3000/users/65b97b9f5a9699823ede049b/tododailies/${tododailiesId}`);
      await getUserTodos();
    } catch (error) {
      console.log("error delete2", error);
    }
  };

  const addtodo = async () => {
    try {
      const todoData = {
        title: todo,
        category: category,
      };
      axios.post("http://192.168.1.108:3000/tododailies/65b97b9f5a9699823ede049b", todoData).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log("error add 2", error)
      });

      await getUserTodos();
      setModalVisiblee(false);
      setTodo("");

    } catch (error) {
      console.log("error2", error)
    }
  };
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };
  const suggestions = [
    {
      id: "0",
      todo: "Drink Water, keep healthy",
    },
    {
      id: "1",
      todo: "Go Excercising",
    },
    {
      id: "2",
      todo: "Go to bed early",
    },
    {
      id: "3",
      todo: "Take pill reminder",
    },
    {
      id: "4",
      todo: "Go Shopping",
    },
    {
      id: "5",
      todo: "finish assignments",
    },
  ];
  useEffect(() => {
    getUserTodos();
  }, [marked, isModalVisiblee]);
  const getUserTodos = async () => {
    try {
      const response = await axios.get("http://192.168.1.108:3000/users/65b97b9f5a9699823ede049b/tododailies")
      console.log(response.data.tododailies);
      setTodos(response.data.tododailies);
      const fetchTodos = response.data.tododailies || [];
     
      const pending = fetchTodos.filter((tododailies) => tododailies.status !== "completed" && isTaskExpired(tododailies.createdAt));
      const completed = fetchTodos.filter((tododailies) => tododailies.status === "completed"|| !isTaskExpired(tododailies.createdAt));
      setpendingTodos(pending);
      setcompletedTodos(completed);

    } catch (error) {
      console.log("error gettodouser2", error);
    }
  };
  const markTodoAscompleted = async (tododailiesId) => {
    try {
      setMarked(true);
      const response = await axios.patch(`http://192.168.1.108:3000/tododailies/${tododailiesId}/complete`);
      console.log(response.data);
    } catch (error) {
      console.log("error marltodo2", error);
    }
  }
  console.log("completedTodos2", completedTodos);
  console.log("pendingTodos2", pendingTodos);
  useEffect(() => {
    // Update the time every second
    const intervalId = setInterval(() => {
      // Force a re-render to update the time
      // You might want to fetch fresh data here too
      
      setMarked((prev) => !prev);
    }, 1000);
  
    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <View style={styles.va} >
        <Pressable style={styles.item} >
          <Text style={styles.text}>All</Text>
        </Pressable>

        <Pressable style={styles.item} >
          <Text style={styles.text}>Work</Text>
        </Pressable>
        <Pressable style={styles.item} >
          <Text style={styles.text}>Personal</Text>
        </Pressable>

        <Pressable style={{ marginLeft: "auto" }} >
          <Feather onPress={() => setModalVisiblee(!isModalVisiblee)} name="plus-circle" size={26} color="#007FFF" />
        </Pressable>
      </View>

      <ScrollView style={styles.scrol} >
        <View style={{ padding: 10 }}>
          {todos?.length > 0 ? (
            <View>
              {pendingTodos?.length > 0 && <Text>Tasks to Do! {today}</Text>}

              {pendingTodos?.map((item, index) => (
                <Pressable

                  style={{
                    backgroundColor: "#E0E0E0",
                    padding: 10,
                    borderRadius: 7,
                    marginVertical: 10,
                  }}
                  key={index}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Entypo
                      onPress={() => markTodoAscompleted(item?._id)}
                      name="circle"
                      size={18}
                      color="black"
                    />
                    <Text style={{ flex: 1 }}>{item?.title}</Text>
                    <Text>{calculateTimeRemaining()}</Text>
                    <AntDesign onPress={() => deleteTodo(item?._id)} name="delete" size={24} color="black" />
                    <Feather name="flag" size={20} color="black" />
                  </View>
                </Pressable>
              ))}

              {completedTodos?.length > 0 && (
                <View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 10,
                    }}
                  >
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/6784/6784655.png",
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      marginVertical: 10,
                    }}
                  >
                    <Text>Completed Tasks</Text>
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={24}
                      color="black"
                    />
                  </View>

                  {completedTodos?.map((item, index) => (
                    <Pressable
                      style={{
                        backgroundColor: "#E0E0E0",
                        padding: 10,
                        borderRadius: 7,
                        marginVertical: 10,
                      }}
                      key={index}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <FontAwesome name="circle" size={18} color="gray" />
                        <Text
                          style={{
                            flex: 1,
                            textDecorationLine: "line-through",
                            color: "gray",
                          }}
                        >
                          {item?.title}
                        </Text>
                        <Text>{calculateTimeRemaining()}</Text>
                        <AntDesign onPress={() => deleteTodo(item?._id)} name="delete" size={24} color="black" />
                        <Feather name="flag" size={20} color="gray" />
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View style={{ justifyContent: "center", flex: 1, alignItems: "center", marginTop: 30, marginLeft: "auto", marginRight: "auto" }}>
              <Image
                style={{ width: 200, height: 200, resizeMode: "contain" }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/2387/2387679.png",
                }}
              />
              <Text style={{ marginTop: 16, fontSize: 16, fontWeight: "600", textAlign: 'center' }}>No Tasks for today! Add task</Text>
              <Pressable onPress={() => setModalVisiblee(!isModalVisiblee)} style={{ marginTop: 15 }}>
                <Feather name="plus-circle" size={26} color="#007FFF" />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>

      <BottomModal onBackdropPress={() => setModalVisiblee(!isModalVisiblee)} onHardwareBackPress={() => setModalVisiblee(!isModalVisiblee)}
        swipeDirection={["up", "down"]}
        swipethreshold={200}
        modalTitle={<ModalTitle title="Add Task" />}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        visible={isModalVisiblee}
        onTouchOutside={() => setModalVisiblee(!isModalVisiblee)}
      >
        <ModalContent style={{ width: "100%", height: 300 }} >
          <View style={{ marginVertical: 10, flexDirection: "row", gap: 10, alignItems: "center" }} >
            <TextInput value={todo} onChangeText={(text) => setTodo(text)} placeholder="put ur new task"
              style={{
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 5,
                flex: 1,
                width: "80%",
                fontSize: 14,
                padding: 10

              }} />
            <Feather onPress={addtodo} name="send" size={24} color="black" />
          </View>

          <View>
            <Text>
              choose Category
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 10 }}>
            <Pressable
              onPress={() => setCategory("work")}
              style={{
                backgroundColor: isPressed ? "yellow" : "white", borderColor: "yellow",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25
              }} onPressIn={handlePressIn}
              onPressOut={handlePressOut} >
              <Text>
                Work
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setCategory("personal")}
              style={{
                borderColor: "red",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25
              }} >
              <Text>
                Personal
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setCategory("wishList")}
              style={{
                borderColor: "green",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25
              }} >
              <Text>
                wishList
              </Text>
            </Pressable>
          </View>
          <Text>
            some suggestions
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 10, flexWrap: "wrap" }}>
            {suggestions.map((item, index) => (
              <Pressable onPress={() => setTodo(item?.todo)} style={{ backgroundColor: "white", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 25, borderColor: "black", borderWidth: 0.5 }}>
                <Text style={{ textAlign: 'center' }} key={index}>
                  {item.todo}
                </Text>
              </Pressable>
            ))}
          </View>
        </ModalContent>

      </BottomModal>

    </>
  )
}

export default index

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#7CB9E8",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: "white",
    textAlign: 'center'
  },


  va: {
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12
  },
  scrol: {
    backgroundColor: 'white',
    flex: 1,
  },
})
