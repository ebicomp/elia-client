import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

const AssetList = () => {
  const [assets, setAssets] = useState([])
  const [assetnName, setAssetName] = useState()
  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    let email = sessionStorage.getItem("email")
    if (email === null || email === "") {
      navigate("/login")
    }
    loadAssets()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    loadAssets()
  }
  const handleLogout = params => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("email")
    navigate("/login")
  }

  const loadAssets = () => {
    const jwt = sessionStorage.getItem("token")
    Axios.get(`/Assets?assetName=${assetnName}&fromDate=${fromDate}&toDate=${toDate}`, { headers: { Authorization: "bearer " + jwt } })
      .then(response => {
        setAssets(response.data)
      })
      .catch(e => {
        console.log(e.response.status)
        console.log("unauth")
        if (e.response.status === 401) {
          navigate("/login")
        }
      })
  }

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <form onClick={handleSubmit} className="form-inline">
            <div className="form-group mb-2">
              <label>AssetName</label>
              <input value={assetnName} onChange={e => setAssetName(e.target.value)} type="text" className="form-control" id="staticEmail2" />
            </div>

            <div className="form-group mb-2">
              <label>From Date</label>
              <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="form-control" />
            </div>

            <div className="form-group mb-2">
              <label>To Date</label>
              <input value={toDate} onChange={e => setToDate(e.target.value)} type="date" className="form-control" />
            </div>
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Type</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map(asset => {
            return (
              <tr key={asset.id}>
                <th>{asset.id}</th>
                <td>{asset.name}</td>
                <td>{asset.assetTypeName}</td>
                <td>{new Date(asset.endDate).toISOString().split("T")[0]}</td>
                <td>
                  <Link className="btn btn-primary" to={`/update-asset/${asset.id}`}>
                    Update
                  </Link>{" "}
                  <Link className="btn btn-danger" to={`/delete-asset/${asset.id}`}>
                    Delete
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        <Link className="btn btn-primary" to={`/create-asset/0`}>
          Create Asset
        </Link>
        <button onClick={handleLogout} className="btn btn-primary" style={{ float: "right" }}>
          log out
        </button>
      </div>
    </div>
  )
}

export default AssetList
