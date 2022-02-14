import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'


const Axios = ():JSX.Element => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/photos')
        .then((res) => {
            setData(res.data)
            setLoading(true)
        })
        .catch((err) => {
            setError(err.message)
        })
    })



    console.log(data)


  return (
    <div>
        {error && <div>{error}</div>}
        {
            loading === false
            ? <div>Loading....</div>
            : data.map((item:any) => {
                return (
                    <img src={item.url} key={item.id}/>
                )
            })
        }
    </div>
  )
}

export default Axios