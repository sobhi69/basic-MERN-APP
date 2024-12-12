import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Record = ({record,deleteRecord}) => {

    
    return (
        <tr>
            <td>{record.recordName}</td>
            <td>{record.position}</td>
            <td>{record.level}</td>
            <td>
                <Link to={`/edit/${record._id}`}>Edit</Link>
                <button onClick={() =>deleteRecord(record._id)}>Delete</button>
            </td>
        </tr>
    )
}

const Records = () => {
    const [records,setRecords] = useState([])

    useEffect(() => {
        const getRecords = async () => {
            const response = await fetch('http://localhost:4900/record')
            const data = await response.json()
            if (!response.ok) {
                window.alert(data.message)
                return 
            }
            setRecords(data)
        }

        getRecords()
        return

    },[records.length])

    const deleteRecord = async (id) => {
       await fetch(`http://localhost:4900/record/${id}`,{
            method:"DELETE"
        });
        
        const filteredRecords = records.filter(record => record._id != id)
        setRecords(filteredRecords)
    }


  return (
   <>
    <table>
        <thead>
            <tr>
                <th>name</th>
                <th>position</th>
                <th>level</th>
                <th>action</th>
            </tr>
        </thead>
        <tbody>
            {records.map((ele,index) => (
                <Record key={index} record={ele} deleteRecord={deleteRecord} />
            ))}
        </tbody>
    </table>

    <Link to='/create'>Create a new record</Link>
   </>
  )
}

export default Records
