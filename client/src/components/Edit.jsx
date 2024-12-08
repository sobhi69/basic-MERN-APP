import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const Edit = () => {
    const [form, setFrom] = useState({
        recordName: "",
        position: "",
        level: ""
    })

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getFrom = async () => {
            const id = params.id
            const response = await fetch(`http://localhost:4900/record/${id}`)
            const data = await response.json()
            if (!response.ok) {
                alert(data.message)
                return
            }
            if (!data) {
                alert(`record with id: ${id} is not found`)
                navigate('/')
            }
            setFrom(data)
        }
        getFrom()
    }, [params.id, navigate])

    const updateFrom = (prop) => {
        setFrom((prev) => {
            return { ...prev, ...prop }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const editedRecord = { ...form }
        const response = await fetch(`http://localhost:4900/record/${params.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedRecord)
        })

        if (!response.ok) {
            const data = await response.json()
            alert(data.message)
            return 
        }

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
            <input type="submit" value="update" />
        </form>
    )
}

export default Edit
