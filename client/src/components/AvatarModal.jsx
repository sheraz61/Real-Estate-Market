import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateAvatar } from "../redux/user/userSlice.js"
export default function AvatarModal({ isOpen, onClose, currentAvatar }) {
  
  const fileRef = useRef(null);
  
  const dispatch=useDispatch()
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);


  // Select image & preview
  const handleSelect = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };


  // Upload image
  const handleSave = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const form = new FormData();
      form.append("image", file);

      const res=await fetch("/api/user/avatar", {
        method: "PUT",
        body: form,
      });
      const data=await res.json()

      // Close modal after success
      if (data.success){
        dispatch(updateAvatar(data.avatar))
        onClose();
      }

    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };


  const handleCancel = () => {
    setFile(null);
    setPreview(null);
    onClose();
  };


  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-xl p-6 w-[360px] animate-fade">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Update Avatar</h3>
          <button 
            type="button"
            onClick={handleCancel}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Preview */}
        <div className="flex justify-center mt-4">
          <img
            src={preview || currentAvatar}
            alt="preview"
            className="h-36 w-36 object-cover rounded-full border"
          />
        </div>

        {/* File Input */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleSelect}
        />

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-6">

          <button
            type="button"
            onClick={() => fileRef.current.click()}
            className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Choose Photo
          </button>

          <div className="flex justify-between gap-2">

            <button
              type="button"
              onClick={handleCancel}
              className="w-1/2 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={!file || loading}
              className="w-1/2 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 transition"
            >
              {loading ? "Uploading..." : "Save"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
