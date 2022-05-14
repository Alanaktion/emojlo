import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  lightContainer: {
    backgroundColor: '#f1f5f9',
  },
  darkContainer: {
    backgroundColor: '#111827',
  },
  lightThemeText: {
    color: '#1e293b',
  },
  darkThemeText: {
    color: '#f3f4f6',
  },
  lightThemePrimary: {
    color: '#0d9488',
  },
  darkThemePrimary: {
    color: '#14b8a6',
  },
  // lightThemeAccent: {
  //   color: '#4f46e5',
  // },
  // darkThemeAccent: {
  //   color: '#6366f1',
  // },
  textInput: {
    alignSelf: 'stretch',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  lightThemeTextInput: {
    color: '#1e293b',
    backgroundColor: '#f1f5f9',
    borderColor: '#9ca3af',
  },
  darkThemeTextInput: {
    color: '#f3f4f6',
    backgroundColor: '#111827',
    borderColor: '#4b5563',
  },
});
