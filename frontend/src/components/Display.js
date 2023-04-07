import React, { useState } from 'react'
import axios from "axios"
import "../styles/Display.css"

const Display = () => {

    const [data, setData] = useState({})
    const token = window.localStorage.getItem("token")
    // console.log(token)


    function waitTime() {
        setTimeout(async () => {
            // document.getElementById("output").innerHTML="success"
            try {

                const res = await axios.get('http://15.207.18.13:3001/api/v1/user/getoutput', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                // console.log(res.data)
                document.getElementById("output").innerHTML = `${res.data.data[0].output}`

            } catch (error) {
                // console.log("error")
                // console.log(error.response)
                document.getElementById("output").innerHTML = `${error.response.data.msg}`
            }

        }, 1000);
    }


    const start = async () => {

        try {
            const res = await axios.get('http://15.207.18.13:3001/api/v1/user/okbutton', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // console.log(res.data)
            waitTime()

        } catch (error) {
            console.log("error")
            console.log(error.response)
        }
    }


    const logout = () => {
        localStorage.clear()
        window.location.href = "/"
    }


    const update = () => {
        window.localStorage.setItem("data", JSON.stringify(data))
        window.location.href = "/update"
    }


    const callDisplayPage = async () => {

        try {

            const res = await axios.get('http://15.207.18.13:3001/api/v1/user/getuserdata', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setData(res.data.data)
            // console.log(res.data.data)

        } catch (error) {
            // console.log(error.response)
            if (error.response.data.res === "error") {
                console.log("error")
            }

        }
    }


    React.useEffect(() => {
        callDisplayPage();
    }, [])


    return (
        <div className='d1'>

            <button className='logout' onClick={logout}>Logout</button>
            <button className='start' onClick={start}>Start</button>
            <button className='update' onClick={update} >Update Personal Info</button>
            <button className='start' onClick={start}>Start</button>
            <p className='u-name'>Hello {data.name} 🙋‍♂️</p><br /><br />
            <div className="div-op">
                <p id='output'>Click start Button</p>
            </div>

        </div>
    )
}

export default Display
