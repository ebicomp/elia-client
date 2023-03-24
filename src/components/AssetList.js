import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

const AssetList = () => {
  const [assets, setAssets] = useState([])
  const navigate = useNavigate()

  let email = sessionStorage.getItem("email")
  if (email === null || email === "") {
    navigate("/login")
  }

  const jwt = sessionStorage.getItem("token")
  useEffect(() => {
    Axios.get("/Assets", { headers: { Authorization: "bearer " + jwt } }).then(response => {
      console.log(response.data)
      setAssets(response.data)
    })
  }, [])

  return (
    <div>
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
                <td>{asset.endDate}</td>
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
      </div>
    </div>
  )
}

export default AssetList
