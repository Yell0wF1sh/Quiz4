import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const [userId, setUserId] = useState("")
  const [isNewUser, setIsNewUser] = useState(false)
  const [repos, setRepos] = useState(["None"])
  const [showReps, setShowReps] = useState(false)

  useEffect(() => {
    fetch('http://api.github.com/users/'+userId+'/repos')
    // fetch('http://cs.brandeis.edu/~tim/timgithub.json')
      .then((response) => response.json())
      .then((reposdata) => {
          setRepos(getName(reposdata))
          console.log(repos)
      })
      .catch((error) => console.error(error))
  },[showReps])

  const renderRepos = ({item}) => {
    <View style={{backgroundColor: 'lightgrey', padding: 10}}>
      <Text style={{fontSize: 32}}>{item}</Text>
    </View>
  }
  

  let button = (
    <TouchableOpacity
      onPress={() => {setShowReps(!showReps)}}
    >
      <Text style={{color: 'blue'}}>show repositoires</Text>
    </TouchableOpacity>
  )

  if (showReps) {
    button =
    <TouchableOpacity
      onPress={() => {
        setShowReps(!showReps)
        setRepos(["None"])
      }}
    >
      <Text style={{color: 'blue'}}>hide repositoires</Text>
    </TouchableOpacity>
  }

  function getName(item) {
    let array = []
    for (let x = 0; x < item.length; x++) {
      array.push(item[x].name)
    }
    return array
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{color: 'red', fontSize: 40, textAlign: 'center'}}>Github Viewer</Text>
      </View>
      <View style={{ flexDirection:'row'}}>
        <Text>github id:</Text>
        <TextInput 
          placeholder='userid'
          onChangeText={(text) => {
            setUserId(text)
            setIsNewUser(true)
          }}
        />
      </View>
      {button}
      <View style={styles.flatlist}>
        <FlatList
          data={repos}
          renderItem={renderRepos}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'black',
    paddingVertical: 20
  }, 
  flatlist: {
    padding: 10,
  },  
});
