import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

export default function App() {
  const [userId, setUserId] = useState("")
  const [isNewUser, setIsNewUser] = useState(false)
  const [repos, setRepos] = useState([])
  const [showReps, setShowReps] = useState(false)

  useEffect(() => {
    fetch('http://api.github.com/users/' + userId + '/repos')
      // fetch('http://cs.brandeis.edu/~tim/timgithub.json')
      .then((response) => response.json())
      .then((reposdata) => {
        setRepos(getName(reposdata))
        console.log(repos)
      })
      .catch((error) => console.error(error))
  }, [showReps])

  const renderRepos = ({ item }) => {
    return (
      <View style={{ padding: 10 }}>
        <View style={{ backgroundColor: 'lightgrey', padding: 10 }}><Text style={{ fontSize: 24 }}>{item.name}</Text></View>
      </View>
    )
  }

  let flatlist = (
    <View style={{ padding: 10 }}>
      <View style={{ backgroundColor: 'lightgrey', padding: 10 }}><Text style={{ fontSize: 24 }}>None</Text></View>
    </View>
  )

  let button = (
    <TouchableOpacity
      onPress={() => { setShowReps(!showReps) }}
    >
      <Text style={{ fontSize: 20, color: 'blue' }}>show repositoires</Text>
    </TouchableOpacity>
  )

  if (showReps) {
    button =
      <TouchableOpacity
        onPress={() => {
          setShowReps(!showReps)
        }}
      >
        <Text style={{ fontSize: 20, color: 'blue' }}>hide repositoires</Text>
      </TouchableOpacity>

    flatlist =
      <FlatList
        data={repos}
        renderItem={renderRepos}
      />
  }

  function getName(item) {
    let array = []
    for (let x = 0; x < item.length; x++) {
      array.push({ "name": item[x].name })
    }
    return array
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: 'red', fontSize: 25, textAlign: 'center', fontWeight: '600' }}>Github Viewer</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 25, fontWeight: '600' }}>github id: </Text>
        <TextInput
          style={{ fontSize: 25, fontWeight: '600', width: "50%" }}
          placeholder='userid'
          onChangeText={(text) => {
            setUserId(text)
            setIsNewUser(true)
          }}
        />
      </View>
      {button}
      <View style={styles.list}>
        {flatlist}
      </View>
      <View>
        <Text>DEBUGGING</Text>
        <Text>userId: {userId}</Text>
        <Text>showRepos: {showReps.toString()}</Text>
        <Text>repos.length: {repos.length}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'black',
    paddingVertical: 20,
  },
  list: {
    alignItems: 'flex-start',
    height: 430,
    padding: 5,
  },
});
