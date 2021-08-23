import React, {useState} from 'react';
import {useMutation} from "@apollo/client";

import {CREATE_USER} from "../graphQL/Mutations";

function AddUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [createUser, {error}] = useMutation(CREATE_USER)

    const handleSubmit = () =>{
        createUser({
          variables: {name, email, password}
        })

        if(error){
            console.error("err",error)
        }

    }

    return (
        <div>
            <form>
                <input type={"text"} placeholder={"Name"} onChange={e=>setName(e.target.value)} />
                <input type={"text"} placeholder={"Email"} onChange={e=>setEmail(e.target.value)} />
                <input type={"text"} placeholder={"Password"} onChange={e=>setPassword(e.target.value)} />
                <button onClick={(e)=> {
                    e.preventDefault();
                    handleSubmit()
                }}>Submit</button>
            </form>
        </div>
    );
}

export default AddUser;