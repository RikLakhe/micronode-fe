import {gql} from '@apollo/client'

export const LOAD_USERS = gql`
    query{
        users{
            user_id,
            user_name
        }
    }`;