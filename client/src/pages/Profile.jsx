import React, { useState } from "react";
import { useSelector } from "react-redux";
import AvatarModal from "../components/AvatarModal";

function Profile() {
  const { currentUser } = useSelector(state => state.user);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
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
      <form className="flex flex-col gap-4 mt-6">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
        />

        <button className="bg-slate-700 text-white rounded-lg p-3">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
