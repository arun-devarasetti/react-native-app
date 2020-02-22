import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';

class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };

  }

  componentDidMount = () => {
    fetch('https://jsonplaceholder.typicode.com/photos', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        responseJson = responseJson.filter(
          d => d.albumId === this.props.route.params.itemId
        );
        this.setState({
          data: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const { itemId } = this.props.route.params;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>

        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.card} onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate('Imgview', {
                  itemId: item.thumbnailUrl,
                });
              }}>
                <Image
                  style={styles.userImage}
                  source={{ uri: item.thumbnailUrl }}
                />
                <View style={styles.cardFooter}>
                  <View
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>AlbumId: {JSON.stringify(itemId)}</Text>
                    <Text numberOfLines={1} style={{ width: 100 }}>
                      {item.title}
                    </Text>
                  </View>
                </View>

              </TouchableOpacity>

            );
          }}
        />
      </View>
    );
  }
}

export default Photos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: '#E6E6E6',
  },
  listContainer: {
    alignItems: 'center',
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor: 'white',
    flexBasis: '46%',
    marginHorizontal: 5,
  },

  userImage: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    borderColor: '#DCDCDC',
    borderWidth: 3,
  },
});
