import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ReceivePage from "./receive-page";
import UserInfoPage from "./user-info-page";
import HomePage from "./home-page";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === "UserInfo") {
            iconName = focused ? "person" : "person-outline";
          } else if (rn === "Receive") {
            iconName = focused ? "bookmark" : "bookmark-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          paddingBottom: 10,
          opacity:0,
        },
        tabBarItemStyle:{
          
        },
        activeTintColor: "blue",
        inactiveTintColor: "grey",
      })}
      screenOptions={{
        headerShown:false,
        activeTintColor: "blue",
        inactiveTintColor: "grey",
        labelStyle: { paddingBottom: 15, fontSize: 10 },
        
      }}
    >
      <Tab.Screen name="Receive" component={ReceivePage} />
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="UserInfo" component={UserInfoPage} />
    </Tab.Navigator>
  );
}

export default Navigation;
