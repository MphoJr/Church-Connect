import { useState } from "react";

import { submitPrayerRequest } from "../../services/prayerRequestService";

function PrayerRequest() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    category: "Family",
    request: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await submitPrayerRequest(formData);

    alert("Prayer request submitted successfully.");

    setFormData({
      fullName: "",
      email: "",
      category: "Family",
      request: "",
    });
  };

  return (
    <div className="prayer-page">
      <h1>Prayer Request</h1>

      <form className="prayer-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({
              ...formData,
              fullName: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value,
            })
          }
        >
          <option>Family</option>

          <option>Health</option>

          <option>Financial</option>

          <option>Spiritual</option>

          <option>Other</option>
        </select>

        <textarea
          rows="6"
          placeholder="Prayer request..."
          value={formData.request}
          onChange={(e) =>
            setFormData({
              ...formData,
              request: e.target.value,
            })
          }
        />

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

export default PrayerRequest;
