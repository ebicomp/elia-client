import { BrowserRouter, Routes, Route } from "react-router-dom"

import Axios from "axios"
import "./App.css"
import AssetList from "./components/AssetList"
import AssertCreate from "./components/AssertCreate"
import AssertDelete from "./components/AssertDelete"
import Login from "./components/Login"
Axios.defaults.baseURL = "https://localhost:7061/api"

function App() {
  return (
    <div className="container mt-5">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column  ">
          <BrowserRouter>
            <Routes>
              {/* <Route path="/" element={state.logedIn ? <Home /> : <HomeGuest />} /> */}
              <Route path="/" element={<AssetList />} />
              <Route path="/create-asset/:id" element={<AssertCreate />} />
              <Route path="/delete-asset/:id" element={<AssertDelete />} />
              <Route path="/update-asset/:id" element={<AssertCreate />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  )
}

export default App
