import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  FlatList
} from "react-native";
import String from "../../../res/Strings";
import Color from "../../../res/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import ImagePicker from "react-native-image-picker";
import { uploadImage } from "../../../data/services/VfscApi";
import TokenLocal from "../../../data/local/TokenLocal";

const height = Dimensions.get("window").height;
const optionsPhoto = {
  title: "Select Photo",
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

const optionsVideo = {
  title: "Select Video",
  storageOptions: {
    skipBackup: true,
    path: "images"
  },
  mediaType: "video"
};

export default class PerformWorkContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: String.performTheWork,
      headerTitleStyle: {
        fontSize: 15,
        color: Color.textWhite
      },
      headerStyle: {
        height: 60,
        borderBottomWidth: 0,
        backgroundColor: Color.bgGreen
      },
      headerLeft: (
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
          onPress={navigation.getParam("goBack")}
        >
          <Icon name="chevron-left" size={15} color={Color.textWhite} />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      avatarSource: [],
      videoSource: [],
      contentDone: ""
    };
    console.log("perform work");
    console.log(1111, this.props.navigation.state.params.item);
  }

  async componentWillMount() {}

  componentDidMount() {
    this.props.navigation.setParams({ goBack: this._goBack });
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };

  _takePicture = () => {
    ImagePicker.showImagePicker(optionsPhoto, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let image = this.state.avatarSource;
        image.push({
          data: response.data,
          source: response.uri,
          uri: response.path
        });
        console.log(111, image);
        this.setState({
          avatarSource: image
        });
      }
    });
  };

  _renderListImage() {
    return (
      <View style={{ flex: 1, marginBottom: 15 }}>
        <Text style={styles.textTitle}>{String.image}</Text>
        <FlatList
          horizontal={true}
          data={this.state.avatarSource}
          renderItem={({ item }) => this._renderImage(item)}
          keyExtractor={(item, index) => `item-image-${index}`}
        />
      </View>
    );
  }

  _renderImage(item) {
    return (
      <View style={{ marginRight: 10 }}>
        <Image
          source={{ uri: item.source }}
          style={{ height: 100, width: 100 }}
        />
      </View>
    );
  }

  _handleCamera() {
    ImagePicker.showImagePicker(optionsVideo, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let video = this.state.videoSource;

        video.push({ path: response.path, uri: response.uri });
        console.log(1111, video);
        this.setState({
          videoSource: video
        });
      }
    });
  }

  _renderListVideo() {
    return (
      <View style={{ flex: 1, marginBottom: 15 }}>
        <Text style={styles.textTitle}>{String.video}</Text>
        <FlatList
          horizontal={true}
          data={this.state.videoSource}
          renderItem={({ item }) => this._renderVideo(item)}
          keyExtractor={(item, index) => `item-video-${index}`}
        />
      </View>
    );
  }

  _renderVideo(item) {
    return (
      <View style={{ marginRight: 10 }}>
        <Image source={{ uri: item.uri }} style={{ height: 100, width: 100 }} />
      </View>
    );
  }

  _handleFinish = async () => {
    let accessToken = "";
    await TokenLocal.getAccessToken().then(data => {
      accessToken = data;
    });

    let photo = { uri: this.state.avatarSource[0].uri};
    let body = new FormData();
    body.append("files", {
      uri: photo.uri,
      name: "image.jpg",
      type: "multipart/form-data"
    });
    console.log(111111, bod);
    let upload = await uploadImage(body, accessToken);
    console.log(3333, upload);
  };

  render() {
    let item = this.props.navigation.state.params.item;
    let level = "";
    let styleTextWithLevel = {};
    if (item.level == 0) {
      level = String.noraml;
      styleTextWithLevel = { color: Color.textBlack };
    } else if (item.level == 1) {
      level = String.important;
      styleTextWithLevel = { color: Color.textGreen };
    } else if (item.level == 2) {
      level = String.doItNow;
      styleTextWithLevel = { color: Color.textRed };
    }
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View
          style={{
            flex: 1,
            backgroundColor: Color.bgWhite,
            alignItems: "center"
          }}
        >
          <View style={{ width: "90%" }}>
            <View
              style={{
                marginBottom: 15,
                marginTop: 15,
                justifyContent: "center"
              }}
            >
              <Text style={styles.textTitle}>{String.content}</Text>
              <Text
                style={{
                  fontSize: 13,
                  color: Color.textBlack
                }}
                numberOfLines={2}
              >
                {item.description}
              </Text>
            </View>
            <View style={{ marginBottom: 15, justifyContent: "center" }}>
              <Text style={styles.textTitle}>{String.level}</Text>
              <Text style={[styles.textContent, styleTextWithLevel]}>
                {level}
              </Text>
            </View>
            <View style={{ marginBottom: 20, justifyContent: "center" }}>
              <Text style={styles.textTitle}>{String.perform}</Text>
              <TextInput
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 0.5,
                  borderColor: Color.textBrow,
                  fontSize: 13,
                  color: Color.textBlack
                }}
                onChangeText={text => this.setState({ contentDone: text })}
                value={this.state.contentDone}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginBottom: 15
              }}
            >
              <TouchableOpacity
                onPress={this._handleCamera.bind(this)}
                style={styles.buttonPerformWork}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    color: Color.textWhite
                  }}
                >
                  {String.video}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this._takePicture.bind(this)}
                style={styles.buttonPerformWork}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    color: Color.textWhite
                  }}
                >
                  {String.takePhoto}
                </Text>
              </TouchableOpacity>
            </View>
            {this.state.avatarSource.length > 0
              ? this._renderListImage()
              : null}
            {this.state.videoSource.length > 0 ? this._renderListVideo() : null}
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity
                onPress={this._handleFinish}
                style={styles.buttonPerformWork}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    color: Color.textWhite
                  }}
                >
                  {String.finish}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textTitle: {
    fontSize: 13,
    color: Color.textBrow,
    marginBottom: 5
  },
  textContent: {
    fontSize: 13,
    color: Color.textBlack,
    width: 250
  },
  buttonDetail: {
    backgroundColor: "#CCFCA2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  buttonPerformWork: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.bgTabBar,
    borderRadius: 5,
    width: "25%",
    height: 40
  }
});
