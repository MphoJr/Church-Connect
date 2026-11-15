import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import {
  getPrayerRequests,
  updatePrayerRequest,
} from "../../services/prayerRequestService";

function PrayerRequests() {
  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const response = await getPrayerRequests();

      setRequests(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await updatePrayerRequest(id, status);

      loadRequests();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredRequests = requests.filter(
    (request) =>
      request.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div className="prayer-requests-page">
        <h1>Prayer Requests</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading requests...</p>
        ) : (
          <div className="prayer-grid">
            {filteredRequests.length === 0 ? (
              <div className="empty-prayers">
                <h3>No Prayer Requests Found</h3>

                <p>Prayer requests will appear here.</p>
              </div>
            ) : (
              filteredRequests.map((request) => (
                <div key={request.id} className="prayer-card">
                  <div className="prayer-header">
                    <h3>{request.fullName}</h3>

                    <span
                      className={`status-badge ${
                        request.status === "Prayed For"
                          ? "status-prayed"
                          : "status-pending"
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>

                  <span className="category-badge">{request.category}</span>

                  <p className="prayer-request-text">{request.request}</p>

                  <small>
                    {new Date(request.createdAt).toLocaleDateString()}
                  </small>

                  <div className="prayer-actions">
                    {request.status === "Pending" && (
                      <button
                        className="prayed-btn"
                        onClick={() => updateStatus(request.id, "Prayed For")}
                      >
                        🙏 Mark Prayed
                      </button>
                    )}

                    {request.status !== "Archived" && (
                      <button
                        className="archive-btn"
                        onClick={() => updateStatus(request.id, "Archived")}
                      >
                        Archive
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default PrayerRequests;
