import * as React from 'react';
import { TouchableOpacity, useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import styles from '../constants/styles';
import { AuthContext } from '../api/providers';
import { setToken, signIn, signOut } from '../api/rest';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import UserScreen from '../screens/UserScreen';
import PostScreen from '../screens/PostScreen';
import PostModalScreen from '../screens/PostModalScreen';

const HomeStack = createNativeStackNavigator();
function HomeStackNavigation() {
  const colorScheme = useColorScheme();
  const themePrimary =
    colorScheme === 'light' ? styles.lightThemePrimary.color : styles.darkThemePrimary.color;
  return (
    <HomeStack.Navigator screenOptions={({ navigation }) => ({
      headerRight: () => <TouchableOpacity onPress={() => navigation.push('PostModal')}>
        <Ionicons
          name="ios-create-outline"
          size={24}
          color={themePrimary}
        />
      </TouchableOpacity>,
    })}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Emojlo' }}
      />
      <HomeStack.Screen
        name="User"
        component={UserScreen}
        options={({ route }) => ({ title: route.params.username })}
      />
      <HomeStack.Screen name="Post" component={PostScreen} />
      <HomeStack.Screen
        name="PostModal"
        component={PostModalScreen}
        options={{ presentation: 'modal', headerRight: null, title: 'New Post' }}
      />
    </HomeStack.Navigator>
  );
}

const AuthStack = createNativeStackNavigator();
function AuthStackNavigation() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

const Stack = createNativeStackNavigator();
export default function Navigation({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
        setToken(userToken);
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        try {
          const tokenResponse = await signIn(data);
          if (tokenResponse.token) {
            await SecureStore.setItemAsync('userToken', tokenResponse.token);
            setToken(tokenResponse.token);
            dispatch({ type: 'SIGN_IN', token: tokenResponse.token });
          } else {
            console.warn(tokenResponse);
            alert('Failed to sign in, check your credentials and try again');
          }
        } catch {
          alert('Connection error, please try again');
        }
      },
      signOut: async () => {
        try {
          await signOut();
        } catch {}
        await SecureStore.deleteItemAsync('userToken');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
        // TODO: handle registration and token creation in this flow
        alert('Sign-up is not yet support in-app, please sign up on the website');
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  const colorScheme = useColorScheme();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: styles.lightThemePrimary.color,
    },
  };
  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: styles.darkThemePrimary.color,
    },
  };
  const theme = colorScheme === 'dark' ? MyDarkTheme : MyTheme;

  return (
    <NavigationContainer theme={theme}>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
          {state.userToken == null ? (
            <Stack.Screen name="AuthRoot" component={AuthStackNavigation} options={{
              animationTypeForReplace: state.isSignout ? 'pop' : 'push',
            }} />
          ) : (
            <Stack.Screen name="HomeRoot" component={HomeStackNavigation} />
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
