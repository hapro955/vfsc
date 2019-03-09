import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Color from "../../../res/Colors";
import { loginApi, getPublicUser } from "../../../data/services/VfscApi";
import TokenLocal from "../../../data/local/TokenLocal";

export default class LoginContainer extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      password: "",
      isShowPassword: false
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  showPassword = () => {
    if (this.state.isShowPassword === true) {
      this.setState({
        isShowPassword: false
      });
    } else {
      this.setState({
        isShowPassword: true
      });
    }
  };

  forgotPassword = () => {};

  handleLogin = async () => {
    console.log(11);
    let body = {
      usernameOrPhone: this.state.phoneNumber,
      password: this.state.password
    };
    let response = await loginApi(body);
    await TokenLocal.setAccessToken(response.accessToken);
    let accessToken = "";
    await TokenLocal.getAccessToken().then(data => {
      accessToken = data;
    });
    
    if (accessToken !== "") {
      let user = await getPublicUser(accessToken);
      if (user.roles[0] !== undefined && user.roles[0] === "ROLE_FARMER") {
        this.props.navigation.navigate("Menu");
      }
    }
  };

  handleRegister = () => {};

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" />
          <View style={{ paddingTop: 20 }}>
            <View
              style={{ width: "100%", height: "100%", alignItems: "center" }}
            >
              <View style={{ width: "80%", height: "100%" }}>
                <View style={{ paddingTop: 40 }}>
                  <Image
                    style={{ width: 60, height: 90 }}
                    source={require("../../../assets/images/logo_black.png")}
                    resizeMode={"cover"}
                  />
                </View>
                <Text
                  style={{
                    paddingTop: 15,
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#5B5B5B"
                  }}
                >
                  {"Chào mừng trở lại"}
                </Text>
                <Text
                  style={{
                    paddingTop: 10,
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#D1CFCF"
                  }}
                >
                  {"Đăng nhập hệ thống"}
                </Text>
                <Text
                  style={{
                    paddingTop: 40,
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#5B5B5B"
                  }}
                >
                  {"Số điện thoại"}
                </Text>
                <View
                  style={{
                    width: "100%",
                    borderBottomWidth: 1,
                    borderBottomColor: "#B7B3B3"
                  }}
                >
                  <TextInput
                    style={styles.inputPhoneNumber}
                    keyboardType={"numeric"}
                    onChangeText={text => {
                      this.setState({ phoneNumber: text });
                    }}
                  />
                </View>
                <Text
                  style={{
                    paddingTop: 10,
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#5B5B5B"
                  }}
                >
                  {"Mật khẩu"}
                </Text>
                <View style={styles.containerPassword}>
                  <View style={{ width: "85%" }}>
                    <TextInput
                      style={styles.inputPassword}
                      secureTextEntry={!this.state.isShowPassword}
                      onChangeText={text => {
                        this.setState({ password: text });
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
                    onPress={this.showPassword}
                  >
                    {this.state.isShowPassword ? (
                      <Icon name="eye" size={20} color="black" />
                    ) : (
                      <Icon name="eye-slash" size={20} color="black" />
                    )}
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "flex-end"
                  }}
                >
                  <TouchableOpacity
                    hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
                    onPress={this.forgotPassword}
                  >
                    <Text
                      style={{
                        paddingTop: 20,
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#D1CFCF"
                      }}
                    >
                      {"Quên mật khẩu?"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: "100%", marginTop: 40 }}>
                  <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={this.handleLogin}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#FFFFFF"
                      }}
                    >
                      {"Đăng nhập"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    marginTop: 60,
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "#D1CFCF"
                    }}
                  >
                    {"Người dùng mới? "}
                  </Text>
                  <TouchableOpacity
                    style={{}}
                    hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
                    onPress={this.handleRegister}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#0462FD"
                      }}
                    >
                      {"Đăng kí"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  containerPassword: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#B7B3B3",
    justifyContent: "space-between",
    alignItems: "center"
  },
  inputPhoneNumber: {
    fontSize: 15,
    color: "#D1CFCF",
    paddingVertical: 10,
    fontWeight: "bold"
  },
  inputPassword: {
    fontSize: 15,
    color: "#D1CFCF",
    paddingVertical: 10,
    fontWeight: "bold"
  },
  buttonLogin: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.bgBlue,
    borderRadius: 5
  }
});
