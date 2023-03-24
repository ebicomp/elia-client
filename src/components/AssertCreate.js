import Axios from "axios"
import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const AssertCreate = () => {
  const [name, setName] = useState("")
  const [type, setType] = useState()
  const [date, setDate] = useState()
  const [nameIsValid, setNameIsValid] = useState(name.length > 0)
  const param = useParams()

  const formAction = param.id === "0" ? "Create" : "Update"

  const [assetTypes, setAssetTypes] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    Axios.get("/AssetTypes")
      .then(response => {
        setAssetTypes(response.data)
      })
      .catch(e => {})

    if (formAction === "Update") {
      Axios.get(`/Assets/${param.id}`)
        .then(response => {
          setName(response.data.name)
          setType(response.data.assetTypeId)
          setDate(new Date(response.data.endDate).toISOString().split("T")[0])
          setNameIsValid(true)
        })
        .catch(e => {})
    }
  }, [param.id])

  const nameChangeHandler = e => {
    setName(e.target.value)
    setNameIsValid(e.target.value.length > 0)
  }

  const hanleSubmit = e => {
    e.preventDefault()
    const newAsset = {
      name: name,
      assetTypeId: type,
      endDate: date
    }
    if (formAction === "Create") {
      Axios.post("/Assets", newAsset)
        .then(response => {
          console.log(response.data)
          navigate("/")
        })
        .catch(e => {
          console.log(e.response)
        })
    } else if (formAction === "Update") {
      Axios.put(`/Assets/${param.id}`, newAsset)
        .then(response => {
          console.log(response.data)
          navigate("/")
        })
        .catch(e => {
          console.log(e)
        })
    }
  }

  return (
    <form onSubmit={hanleSubmit}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Asset Name</label>
        <input value={name} onChange={nameChangeHandler} type="text" className="form-control" />
      </div>

      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Asset Category</label>
        <select value={type} onChange={e => setType(e.target.value)} className="form-control">
          {assetTypes.map(assetType => (
            <option key={assetType.id} value={assetType.id}>
              {assetType.type}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="exampleInputEmail1">End Date</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="form-control" />
      </div>
      <div className="mt-2">
        <Link className="btn btn-light" to="/">
          Cancel
        </Link>
        <button disabled={!nameIsValid} className="btn btn-primary">
          {formAction}
        </button>
      </div>
    </form>
  )
}

export default AssertCreate
