import React, {useState, useEffect} from 'react';
import {useQuery, gql} from '@apollo/client'

import {LOAD_USERS} from "../GraphQL/Queries";

function GetUsers(){
    const {error, loading, data} = useQuery(LOAD_USERS)
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if(data){
            setUsers(data.users);
        }
    }, [data]);

    return <>{users.map(user=> <h1>{user.user_name}</h1>)}</>
};


export default GetUsers;
