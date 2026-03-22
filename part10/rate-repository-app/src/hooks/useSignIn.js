import { gql,useMutation } from '@apollo/client';
import { AUTHENTICATE_USER } from '../graphql/mutations'


const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHENTICATE_USER);
  
    const signIn = async ({ username, password }) => {
        const mutation = await mutate({ variables: {credentials: {username, password}}})
        return mutation
    };

    return [signIn, result];
  };

export default useSignIn;