import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";

import AdminLayout from "../layouts/AdminLayout";

import { getProfile, updateProfile } from "../services/userService";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    profileImage: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getProfile(user.id);

      setFormData(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load profile");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setLoading(true);

      const data = new FormData();

      data.append("file", file);

      data.append("upload_preset", "chrchconnects_profile");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dprywfeee/image/upload",
        {
          method: "POST",
          body: data,
        },
      );

      const result = await response.json();

      console.log(result);

      if (!response.ok) {
        alert(result?.error?.message || "Image upload failed");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        profileImage: result.secure_url,
      }));

      alert("Image uploaded successfully!");
    } catch (error) {
      console.error(error);

      alert("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateProfile(user.id, formData);

      setFormData(response.data);

      localStorage.setItem("user", JSON.stringify(response.data));

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);

      alert("Failed to update profile");
    }
  };

  return (
    <AdminLayout>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar-wrapper">
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="profile-avatar"
                />
              ) : (
                <div className="profile-avatar">
                  {formData.fullName?.charAt(0)?.toUpperCase()}
                </div>
              )}

              <label htmlFor="profileUpload" className="avatar-edit-btn">
                <FaCamera />
              </label>

              <input
                id="profileUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </div>

            <h2>{formData.fullName || "User"}</h2>

            <p>{formData.role}</p>

            {loading && <p>Uploading image...</p>}
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone || ""}
              onChange={handleChange}
            />

            <input type="text" value={formData.role} readOnly />

            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Profile;
