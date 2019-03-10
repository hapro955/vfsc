import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList
} from "react-native";
import String from "../../../res/Strings";
import Color from "../../../res/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import ScrollableTabView, {
  DefaultTabBar
} from "react-native-scrollable-tab-view";
import NormalTabBar from "../../components/NormalTabBarComponent";
import { remindWork, getNotification } from "../../../data/services/VfscApi";
import TokenLocal from "../../../data/local/TokenLocal";

const height = Dimensions.get("window").height;

export default class RemindWorkContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: String.remindWork,
      headerTitleStyle: {
        fontSize: 15,
        color: Color.textWhite
      },
      headerStyle: {
        height: 60,
        borderBottomWidth: 0,
        backgroundColor: Color.bgGreen
      },
      headerLeft: null,
      headerRight: (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
          onPress={navigation.getParam("goHome")}
        >
          <Icon name="bars" size={15} color={Color.textWhite} />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    console.log("s remindWorkContainer");
    super(props);
    this.state = {
      remindWork: [],
      notification: []
    };
  }

  componentWillMount() {
    this.props.navigation.setParams({ goHome: this._goHome });
  }

  async componentDidMount() {
    let accessToken = "";
    await TokenLocal.getAccessToken().then(data => {
      accessToken = data;
    });
    let remindWork = await this._getRemindWork(accessToken);
    let notification = await this._getNotification(accessToken);
    console.log(222, notification);
    console.log(111, remindWork);
    this.setState({
      remindWork: remindWork,
      notification: notification
    });
  }

  _goHome = () => {
    this.props.navigation.navigate("Menu");
  };

  _getRemindWork = async accessToken => {
    return await remindWork(accessToken);
  };

  _getNotification = async accessToken => {
    return await getNotification(accessToken);
  };

  renderTabBarChild = () => {
    const activeTabColor = Color.bgTabBar;
    let tabbarStyle = {
      height: 44 + 3, // tabStyle.height + borderBottomWidth
      backgroundColor: "#ffffff",
      elevation: 5,
      borderBottomColor: Color.textBrow,
      borderBottomWidth: 1,
      width: Dimensions.get("window").width + 2,
      marginHorizontal: -1
    };
    const tabStyle = {
      height: 44,
      backgroundColor: Color.bgWhite,
      marginHorizontal: 1
    };
    const activeTabStyle = {
      backgroundColor: activeTabColor
    };
    const textStyle = {
      color: Color.textBrow,
      fontSize: 14,
      fontWeight: "normal"
    };
    const activeTextStyle = {
      color: "#fff"
    };
    const indicatorStyle = {
      height: 0
    };
    return (
      <NormalTabBar
        tabbarStyle={tabbarStyle}
        tabStyle={tabStyle}
        textStyle={textStyle}
        activeTabStyle={activeTabStyle}
        activeTextStyle={activeTextStyle}
        indicatorStyle={indicatorStyle}
      />
    );
  };

  _renderRemindToday = () => {
    return (
      <ScrollView
        style={{ width: "100%", height: "100%", backgroundColor: "#F1F1F1" }}
        tabLabel="Hôm nay"
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center"
          }}
        >
          <View style={{ marginBottom: 10 }} />
          <FlatList
            style={{ width: "90%", height: "100%" }}
            data={this.state.remindWork}
            renderItem={this._renderListRemindWork}
            keyExtractor={(item, index) => `remindWork-${index}`}
          />
        </View>
      </ScrollView>
    );
  };

  _renderNotification = () => {
    return (
      <ScrollView
        style={{ width: "100%", height: "100%", backgroundColor: "#F1F1F1" }}
        tabLabel="Thông báo"
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center"
          }}
        >
          <View style={{ marginBottom: 10 }} />
          <FlatList
            style={{ width: "90%", height: "100%" }}
            data={this.state.notification}
            renderItem={this._renderListNotificatioin}
            keyExtractor={(item, index) => `notification-${index}`}
          />
        </View>
      </ScrollView>
    );
  };

  _renderListNotificatioin = (notification) => {
    let item = notification.item;
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
      <View
        style={{
          flex: 1,
          backgroundColor: Color.bgWhite,
          marginBottom: 20,
          borderRadius: 5,
          alignItems: "center"
        }}
      >
        <View style={{ width: "90%" }}>
          <View
            style={{
              marginBottom: 20,
              marginTop: 15,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: Color.textBlack
              }}
              numberOfLines={2}
            >
              {item.description}
            </Text>
          </View>
          <View style={{ marginBottom: 20, flexDirection: "row" }}>
            <View style={{ width: "100%" }}>
              <Text style={styles.textTitle}>{String.level}</Text>
              <Text style={[styles.textContent, styleTextWithLevel]}>
                {level}
              </Text>
            </View>
          </View>

          <View style={{ marginBottom: 30, alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("PerformWork", {
                  item: item
                });
              }}
              style={styles.buttonPerformWork}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "bold",
                  color: Color.textWhite
                }}
              >
                {String.performTheWork}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  renderProductionPlanMonth = () => {
    return (
      <ScrollView tabLabel="Đã làm">
        <View style={{ flex: 1, backgroundColor: "yellow" }}>
          <Text>da xong</Text>
        </View>
      </ScrollView>
    );
  };

  _renderListRemindWork = ({ item }) => {
    let arrayDate = [];
    for (let i = 0; i < item.dateAlert.length; i++) {
      let date = new Date(item.dateAlert[i]);
      arrayDate.push(date.toLocaleDateString("en-GB"));
    }
    let title = "";
    let contentTitle = "";
    let hour = "";
    if (item.work !== null) {
      title = "Công việc thời điểm: ";
      contentTitle = item.work.description;
      hour = item.work.hour;
    } else if (item.notify !== null) {
      title = "Thông báo: ";
      contentTitle = item.notify.description;
      hour = item.notify.hour;
    } else if (item.period !== null) {
      title = "Công việc định kì: ";
      contentTitle = item.period.description;
      hour = item.period.hour;
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Color.bgWhite,
          marginBottom: 20,
          borderRadius: 5,
          alignItems: "center"
        }}
      >
        <View style={{ width: "90%" }}>
          <View style={{ marginBottom: 15, marginTop: 15 }}>
            <Text style={styles.textTitle}>{title}</Text>
            <Text style={styles.textContent}>{contentTitle}</Text>
          </View>

          <View style={{ marginBottom: 15 }}>
            <Text style={styles.textTitle}>{String.doneAt}</Text>
            {hour !== undefined ? (
              <Text style={styles.textContent} numberOfLines={1}>
                {hour}
                {"h"}
              </Text>
            ) : null}
          </View>

          <View style={{ marginBottom: 15, flexDirection: "row" }}>
            <View style={{ width: "60%" }}>
              <Text style={styles.textTitle}>{String.doneOnDay}</Text>
              {arrayDate.map(item => {
                return (
                  <Text style={styles.textContent} numberOfLines={1}>
                    {item}
                  </Text>
                );
              })}
            </View>
          </View>

          <View style={{ marginBottom: 30, alignItems: "center" }}>
            <TouchableOpacity style={styles.buttonPerformWork}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "bold",
                  color: Color.textWhite
                }}
              >
                {String.performTheWork}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ScrollableTabView
          style={{ width: "100%", height: "100%" }}
          renderTabBar={this.renderTabBarChild}
          initialPage={0}
        >
          {this._renderRemindToday()}
          {this._renderNotification()}
          {this.renderProductionPlanMonth()}
        </ScrollableTabView>
      </View>
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
    fontSize: 14,
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
    width: "70%",
    height: 40
  }
});
