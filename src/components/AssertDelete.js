import React, { useState, useEffect } from "react"
import Axios from "axios"
import { Link, useParams, useNavigate } from "react-router-dom"

const AssertDelete = () => {
  const [asset, setAsset] = useState([])
  const param = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    Axios.get(`/Assets/${param.id}`)
      .then(response => {
        console.log(response.data)
        setAsset(response.data)
      })
      .catch(e => {})
  }, [param.id])

  const handleSubmit = e => {
    e.preventDefault()
    Axios.delete(`/assets/${param.id}`)
      .then(response => {
        navigate("/")
      })
      .catch(error => {})
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-header">Warning</div>
        <div className="card-body">
          <h5 className="card-title">Warning</h5>
          <p className="card-text">Are you sure you want to delete Asset {asset.name} ?</p>
          <div>
            <Link className="btn btn-light mx-1" to="/">
              Cancel
            </Link>
            <button className="btn btn-danger" type="submit">
              Delete
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default AssertDelete
