import { useEffect, useState } from "react";
import { getUserDetails, updateUserDetails } from "./api";
import "../css/profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    linkedinURL: "",
    githubURL: "",
    bio: "",
  });

  useEffect(() => {
    getUserDetails().then((data) => {
      if (data?.data) {
        setUser(data.data);
        setFormData(data.data);
      }
    });
  }, []);

  const handleUpdate = async () => {
    try {
      await updateUserDetails(formData);
      alert("Profile updated!");
      setEditing(false);
    } catch (err) {
      alert(err.message || "Update failed");
    }
  };

  if (!user) return <p className="loading-text">Loading...</p>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2 className="profile-heading">My Profile</h2>
        <img
          src={user.imageURL || "https://via.placeholder.com/100"}
          alt="Profile"
          className="profile-img"
        />
        <div className="profile-info">
          <label>Name:</label>
          <input
            className="profile-input"
            disabled={!editing}
            value={formData.userName}
            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
            placeholder="Your Name"
          />

          <label>Email:</label>
          <input
            className="profile-input"
            disabled
            value={user.email}
            placeholder="Your Email"
          />

          <label>GitHub:</label>
          <input
            className="profile-input"
            disabled={!editing}
            value={formData.githubURL}
            onChange={(e) => setFormData({ ...formData, githubURL: e.target.value })}
            placeholder="GitHub Profile URL"
          />

          <label>LinkedIn:</label>
          <input
            className="profile-input"
            disabled={!editing}
            value={formData.linkedinURL}
            onChange={(e) => setFormData({ ...formData, linkedinURL: e.target.value })}
            placeholder="LinkedIn Profile URL"
          />

          <label>Bio:</label>
          <textarea
            className="profile-input"
            disabled={!editing}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Short bio"
            rows={3}
          />
        </div>

        <div className="profile-actions">
          {editing ? (
            <>
              <button className="save-btn" onClick={handleUpdate}>Save</button>
              <button className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
            </>
          ) : (
            <button className="edit-btn" onClick={() => setEditing(true)}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
}
