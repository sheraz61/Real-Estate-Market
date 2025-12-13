import { useState } from "react";
import { useSelector } from "react-redux";
import AvatarModal from "../components/AvatarModal";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import { updateUserFailure, updateUserStart, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess } from "../redux/user/userSlice.js";
function Profile() {
  const { currentUser, loading, error } = useSelector(state => state.user);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const dispatch = useDispatch()
  const [formdata, setFormdata] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [showListingError, setShowListingError] = useState(false)
  const [userListings, setUserListings] = useState([])
  const handleChange = (e) => {
    setFormdata({
      ...formdata, [e.target.id]: e.target.value
    })

  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata)
      })
      const data = await res.json()
      if (data.success == false) {
        dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  const handleLogoutUser = async () => {
    try {
      dispatch(signOutUserStart)
      const res = await fetch('/api/auth/signout')
      const data = res.json()
      if (data.success == false) {
        dispatch(signOutUserFailure(data.message))
        return
      }
      dispatch(signOutUserSuccess(data))
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
  }
  const handleShowListings = async () => {
    try {
      setShowListingError(false)
      const res = await fetch(`/api/user/listings/${currentUser._id}`)
      const data = await res.json()
      if (data.success == false) {
        setShowListingError(true)
        return
      }
      setUserListings(data)
    } catch (error) {
      setShowListingError(true)
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-6">
        Profile
      </h1>

      {/* Avatar */}
      <img
        src={currentUser.avatar}
        onClick={() => setShowAvatarModal(true)}
        alt="profile"
        className="rounded-full h-24 w-24 mx-auto cursor-pointer object-cover hover:opacity-80 transition"
      />

      {/* AVATAR POPUP */}
      <AvatarModal
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)} // no need to pass avatar here; Redux already updated
        currentAvatar={currentUser.avatar}
      />

      {/* PROFILE FORM */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
        <input
          type="text"
          placeholder="Username"
          id="username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-3 rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3">
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link className="bg-green-700 text-white rounded-lg uppercase text-center hover:opacity-95 hover:cursor-pointer p-3" to={'/create-listing'}>Create Listing</Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={handleLogoutUser} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ''}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? 'User is updated Successfully' : ''}</p>
      <button onClick={handleShowListings} className="text-green-700 w-full hover:opacity-70 hover:cursor-pointer "> Show Listings</button>
      <p className="text-red-700 mt-5">{showListingError ? 'Error Showing listings' : ''}</p>

      {userListings && userListings.length > 0 &&
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">Your Listings</h1>
          {userListings.map((listing) => (
            <div key={listing._id} className="border rounded-lg flex justify-between items-center p-3 gap-4">
              <Link to={`/listing/${listing._id}`}>
                <img className="h-16 w-16 object-contain rounded-lg" src={listing.imageUrls[0]} alt="listing image" />
              </Link>
              <Link className="flex-1 text-slate-700 font-semibold hover:underline truncate" to={`/listing/${listing._id}`}>
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center">
                <button className="hover:cursor-pointer text-red-700 uppercase hover:opacity-70" >Delete</button>
                <button className="hover:cursor-pointer hover:opacity-70 text-green-700 uppercase" >Edit</button>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}

export default Profile;
