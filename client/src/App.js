import React from "react"
import Records from "./components/Records"
import { Routes,Route } from "react-router-dom"
import Edit from "./components/Edit"
import Create from "./components/Create"
const App = () => {

   
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<Records />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/create" element={<Create />} />
            </Routes>
        </div>
    )
}

export default App