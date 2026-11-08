import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

function Profile() {
  return (
    <AdminLayout>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar">M</div>

          <h1>Mpho</h1>

          <p>Church Administrator</p>

          <div className="profile-details">
            <div>
              <strong>Email:</strong>
              <p>admin@churchconnect.com</p>
            </div>

            <div>
              <strong>Phone:</strong>
              <p>071 234 5678</p>
            </div>

            <div>
              <strong>Role:</strong>
              <p>Administrator</p>
            </div>

            <div>
              <strong>Joined:</strong>
              <p>06 Nov 2026</p>
            </div>
          </div>

          <button className="profile-btn">Edit Profile</button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Profile;
