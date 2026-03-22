import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Pressable, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import { object, string } from 'yup';
import useSignIn from '../hooks/useSignIn'

import theme from '../theme';

const styles = StyleSheet.create({
  form: {
    backgroundColor: 'white',
    padding: 15
  },

  textInput: {
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary
  },

  submit: {
    padding: 12,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.primary
  },

  submitText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center'
  }
})

const validationSchema = object({
  username: 
    string()
    .required('Username is required'),
  
  password:
    string()
    .required('Password is required')
})

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log('Todo bien', data);
    } catch (e) {
      console.log('Todo mal', e);
    }
  };

  const initialValues = {
    username: '',
    password: '',
  };

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema} 
    >
      {({ handleSubmit }) =>  
        <View style={styles.form}>
          <FormikTextInput name="username" placeholder="Username" style={styles.textInput} />
          <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} style={styles.textInput} />
          <Pressable onPress={handleSubmit} style={styles.submit}>
            <Text style={styles.submitText}>Sign In</Text>
          </Pressable>
        </View>
      }      
    </Formik>
  )
};

export default SignIn;