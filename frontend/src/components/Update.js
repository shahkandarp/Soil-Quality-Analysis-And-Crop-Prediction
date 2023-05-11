import React, { useState } from 'react'
import axios from 'axios'
import "../styles/Signup.css"

const Update = () => {

    const data = JSON.parse(window.localStorage.getItem("data"))
    
    const [productId, setProductId] = useState(data.productId)
    const [email, setEmail] = useState(data.email)
    const [password, setPassword] = useState("")
    const [name, setName] = useState(data.name)
    const [phoneno, setPhoneno] = useState(data.phoneno)

    const token = window.localStorage.getItem("token")
    // console.log(token)
    const isAdmin = window.localStorage.getItem("isAdmin")
    // console.log(isAdmin)

    const update = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post("http://15.207.68.117:3001/api/v1/user/update", {
                email, password, name, phoneno
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            // console.log(res.data)
            window.alert("Successfully changed")
            localStorage.removeItem("data")
            window.location.href = "/display"

        } catch (error) {
            if (error.response.data.res === 'error') {
                // console.log("error")
                window.alert(error.response.data.msg)
            }
        }
    }

    if (isAdmin==="no") {
        return (
            <div className='s-d1'>
                <div className="s-d2">
                    <form method="post" id='signup'>

                        <label className='signup-label' htmlFor="productID">ProductID : </label>
                        <input type="text" name='productID' id='productID' className='productID' placeholder='productID' value={productId} onChange={(e) => setProductId(e.target.value)} disabled required /> <br /><br /><br />

                        <label className='signup-label' htmlFor="email">Email : </label>
                        <input type='email' name='email' id='email' className='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br /><br />

                        <label className='signup-label' htmlFor="password">Password : </label>
                        <input type="text" name='password' id='password' className='password' placeholder='write new password' value={password} onChange={(e) => setPassword(e.target.value)} required /><br /><br /><br />

                        <label className='signup-label' htmlFor="name">Name : </label>
                        <input type="text" name='name' id='name' className='name' placeholder='name' value={name} onChange={(e) => setName(e.target.value)} required /><br /><br /><br />

                        <label className='signup-label' htmlFor="phone">Phone : </label>
                        <input type="text" name='phone' id='phone' className='phone' placeholder='phone' value={phoneno} onChange={(e) => setPhoneno(e.target.value)} required /><br /><br /><br />

                        <input type="submit" onClick={update} value="Update" className='btn-signup' />

                    </form>
                </div>
            </div>
        )
    }
    else {
        window.location.href = "/login"
    }
}


export default Update

