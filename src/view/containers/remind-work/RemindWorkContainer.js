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
import { remindWork } from "../../../data/services/VfscApi";
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
      headerLeft: (
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
          onPress={() => {
            console.log(1111);
            _this.props.navigation.goBack();
            //navigation.getParam("goBack");
          }}
        >
          <Icon name="chevron-left" size={15} color={Color.textWhite} />  
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    console.log("s remindWorkContainer");
    super(props);
    this.state = {
      today: "Thứ Ba ngày 29/1/2019",
      // work: [],
      // period: [],
      // notify: [],
      remindWork: [],
    };
  }

  componentWillMount() {
    _this = this;
  }

  async componentDidMount() {
    // let work = [];
    // let period = [];
    // let notify = [];
    let remindWork = await this.getRemindWork();
    this.setState({remindWork: remindWork});
    // for(let i = 0; i < remindWork.length; i++) {
    //   if(remindWork[i].notify !== null) {
    //     notify.push(remindWork[i].notify);
    //   }else if(remindWork[i].period !== null) {
    //     period.push(remindWork[i].period);
    //   }else if(remindWork[i].work !== null) {
    //     work.push(remindWork[i].work);
    //   }
    // }
    // this.setState({
    //   work: work,
    //   period: period,
    //   notify: notify,
    // });
  }

  getRemindWork = async () => {
    let accessToken = "";
    await TokenLocal.getAccessToken().then(data => {  
      accessToken = data; 
    });
    return (notification = await remindWork(accessToken));
  };

  goBack = () => {
    this.props.navigation.goBack();
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

  renderProductionPlanDay = () => {
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
          <View style={{marginBottom: 10}}/>
          <FlatList
            style={{ width: "90%", height: "100%" }}
            data={this.state.remindWork}
            renderItem={this.renderListProductionPlanDay}
          />
        </View>
      </ScrollView>
    );
  };

  renderProductionPlanWeek = () => {
    return (
      <ScrollView tabLabel="Thông báo">
        <View style={{ flex: 1, backgroundColor: "yellow" }}>
          <Text>da xong</Text>
        </View>
      </ScrollView>
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

  renderListProductionPlanDay = ({ item }) => {
    console.log(item);
    let title="";
    if(item.work !== null) {
      title = "Công việc thời điểm: " + `\n`+ item.work.description;
    }else if(item.notify !== null) {
      title = "Thông báo: " + `\n` +item.notify.description;
    }else if(item.period !== null) {
      title = "Công việc định kì: " + `\n` + item.period.description;
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
          <View style={{ marginBottom: 20, marginTop: 15 }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.textBlack
              }}
            >
              {title}
            </Text>
          </View>
          <View style={{ marginBottom: 20, flexDirection: "row" }}>
            <View style={{ width: "60%" }}>
              <Text style={styles.textTitle}>{String.codePlan}</Text>
              <Text style={styles.textContent} numberOfLines={1}>
                {item.codePlan}
              </Text>
            </View>
            <View style={{ width: "40%", alignItems: "flex-end" }}>
              <TouchableOpacity style={styles.buttonDetail}>
                <Text
                  style={{
                    fontSize: 11,
                    color: "#87CB4C",
                    fontWeight: "bold",
                    padding: 5
                  }}
                >
                  {String.seeDetails}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.textTitle}>{String.placeOfImplementation}</Text>
            <Text style={styles.textContent} numberOfLines={1}>
              {item.area}
            </Text>
          </View>
          <View style={{ marginBottom: 30 }}>
            <Text style={styles.textTitle}>{String.workContent}</Text>
            <Text style={styles.textContent} numberOfLines={1}>
              {item.content}
            </Text>
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
          {this.renderProductionPlanDay()}
          {this.renderProductionPlanWeek()}
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
    width: "70%",
    height: 40
  },
});

