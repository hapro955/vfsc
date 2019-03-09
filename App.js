import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
//login
import LoginContainer from './src/view/containers/login/LoginContainer';
import WelcomContainer from './src/view/containers/login/WelcomContainer';
import AccountAuthenticateContainer from './src/view/containers/login/AccountAuthenticateContainer';

//production-plan
import ProductionPlanContainer from './src/view/containers/production-plan/ProductionPlanContainer';

//remind-work
import RemindWorkContainer from './src/view/containers/remind-work/RemindWorkContainer';

//notification
import NotificationContainer from './src/view/containers/notification/NotificationContainer';
import PerformWorkContainer from './src/view/containers/notification/PerformWorkContainer';

//profile
import ProfileContainer from './src/view/containers/profile/ProfileContainer';

import Menu from './src/view/containers/Menu';

const AppNavigator = createStackNavigator(
  {
    Welcom: {screen: WelcomContainer},
    Login: {screen: LoginContainer},
    AccountAuthenticate: {screen: AccountAuthenticateContainer},
    Menu: {screen: Menu},
    ProductionPlan: {screen: ProductionPlanContainer},
    RemindWork: {screen: RemindWorkContainer},
    Notification: {screen: NotificationContainer},
    PerformWork: {screen: PerformWorkContainer},
    Profile: {screen: ProfileContainer},
  },
  {
    initialRouteName: 'Welcom'    
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {  
  render() {
    return <AppContainer />;
  }
}