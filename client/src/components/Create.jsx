import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Create = () => {
    const [form, setFrom] = useState({
        recordName: "",
        position: "",
        level: ""
    })

    const navigate = useNavigate()

    const updateFrom = (prop) => {
        setFrom((prev) => {
            return { ...prev, ...prop }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newRecord = {...form}

        if (!form.recordName || !form.position || !form.level) {
            alert('please fill up the entire form')
            return
        }
        // push a new record to the Database

        const response = await fetch('http://localhost:4900/record',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newRecord)
        })        

        if (!response.ok) {
            const data = await response.json()
            alert(data.message)
            return
        }

        // clean the form
        setFrom({
            recordName: "",
            position: "",
            level: ""
        })
        
        navigate('/')
    }


    return (
        <form onSubmit={(e) => handleSubmit(e)} action="">
            <div className="form-group">
                <label htmlFor="">name</label>
                <input
                    value={form.recordName}
                    onChange={(e) => updateFrom({ recordName: e.target.value })}
                    type="text" />
            </div>
            <div className="form-group">
                <label htmlFor="">position</label>
                <input
                    value={form.position}
                    onChange={(e) => updateFrom({ position: e.target.value })}
                    type="text" />
            </div>
            <div className="form-group">
                <label htmlFor="">level</label>
                <input
                    value={form.level}
                    onChange={(e) => updateFrom({ level: e.target.value })}
                    type="text" />
            </div>
            <input type="submit" value="create" />
        </form>
    )
}

export default Create
