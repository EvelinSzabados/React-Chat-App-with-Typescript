import { gql } from 'apollo-boost'
import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { client } from "./index"

export default function Test(props: any) {

    const [chats, setChats] = useState([]);

    client.query({
        query: gql`
          {
            chats{id,lastUpdated}
          }
        `
    }).then((response: any) => console.log(response.data.chats))
    return (
        <div>Test</div>
    )
}
