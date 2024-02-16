import React from 'react'

async function User() {

    const response = await fetch('https://mlm-update-blush.vercel.app/api/users')
        const data = await response.json()
        console.log(data)
     
  return (
    <div>{
        <data className="ma">{data}</data>
        }</div>
  )
}

export default User