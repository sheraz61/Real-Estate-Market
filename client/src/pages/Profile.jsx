import  { useState } from "react";
import { useSelector } from "react-redux";
import AvatarModal from "../components/AvatarModal";
import { useDispatch } from "react-redux";
import { updateUserFailure,updateUserStart,updateUserSuccess } from "../redux/user/userSlice.js";
function Profile() {
  const { currentUser,loading,error} = useSelector(state => state.user);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const dispatch=useDispatch()
  const [formdata,setFormdata]=useState({})
  const [updateSuccess,setUpdateSuccess]=useState(false)
  const handleChange=(e)=>{
    setFormdata({
      ...formdata,[e.target.id]:e.target.value
    })

  }
  const handleSubmit= async(e)=>{
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formdata)
      })
      const data=await res.json()
      if (data.success==false){
        dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
    setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
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
          {loading?'Loading...':'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-5">
<span className="text-red-700 cursor-pointer">Delete account</span>
<span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error:''}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? 'User is updated Successfully':''}</p>
    </div>
  );
}

export default Profile;
