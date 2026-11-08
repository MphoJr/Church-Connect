import AdminLayout from "../layouts/AdminLayout";

function Profile() {
  return (
    <AdminLayout>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-top">
            <div className="profile-avatar">M</div>

            <div>
              <h2>Mpho Junior</h2>
              <p>Administrator</p>
            </div>
          </div>

          <hr />

          <div className="profile-details">
            <div>
              <label>Email</label>
              <input type="email" value="admin@churchconnect.com" readOnly />
            </div>

            <div>
              <label>Phone</label>
              <input type="text" value="0712345678" />
            </div>

            <div>
              <label>Role</label>
              <input type="text" value="Administrator" readOnly />
            </div>

            <div>
              <label>Church</label>
              <input type="text" value="ChurchConnect Demo Church" />
            </div>
          </div>

          <button className="profile-btn">Save Changes</button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Profile;
