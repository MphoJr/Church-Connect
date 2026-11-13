import { useState } from "react";
import { createAppointment } from "../../services/appointmentService";

function BookAppointment() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    meetingType: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createAppointment(formData);

      alert("Appointment request submitted successfully.");

      setFormData({
        fullName: "",
        phone: "",
        email: "",
        meetingType: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      alert("Failed to submit appointment request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointment-page">
      <div className="appointment-card">
        <h1>Book an Appointment</h1>

        <p>Submit an appointment request and a pastor will contact you.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <select
            name="meetingType"
            value={formData.meetingType}
            onChange={handleChange}
            required
          >
            <option value="">Select Meeting Type</option>

            <option value="Counselling">Counselling</option>

            <option value="Prayer Request">Prayer Request</option>

            <option value="Wedding Consultation">Wedding Consultation</option>

            <option value="Funeral Meeting">Funeral Meeting</option>

            <option value="General Enquiry">General Enquiry</option>
          </select>

          <input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Tell us how we can help..."
            rows="5"
            value={formData.message}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookAppointment;
