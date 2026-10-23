

const feedbackList = document.getElementById("feedbackList");

// Render backend API URL
const API_URL =
  "https://student-feedback-manager-ce1o.onrender.com/api/feedback";

// GET ALL FEEDBACK
async function getFeedback() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const feedback = await response.json();

    feedbackList.innerHTML = "";

    if (!Array.isArray(feedback)) {
      throw new Error("Unexpected feedback response");
    }

    if (feedback.length === 0) {
      feedbackList.innerHTML = "<p>No feedback available yet.</p>";
      return;
    }

    feedback.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("feedback-item");

      card.innerHTML = `
        <h3>👤 ${item.studentName ?? ""}</h3>
        <p><strong>Student ID:</strong> ${item.studentId ?? ""}</p>
        <p><strong>Email:</strong> ${item.email || "Not provided"}</p>
        <p><strong>Course:</strong> ${item.course || "Not provided"}</p>
        <p><strong>Year:</strong> ${item.year ?? "Not provided"}</p>
        <p><strong>Semester:</strong> ${item.semester ?? "Not provided"}</p>
        <p><strong>Batch:</strong> ${item.batch || "Not provided"}</p>
        <p class="rating"><strong>Rating:</strong> ${item.rating ?? ""}/5 ⭐</p>
        <p><strong>Comment:</strong> ${item.comment ?? ""}</p>

        <button class="edit-btn"
          onclick="editFeedback('${item._id}')">
          ✏️ Edit
        </button>

        <button class="delete-btn"
          onclick="deleteFeedback('${item._id}')">
          ❌ Delete
        </button>
      `;

      feedbackList.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading feedback:", error);
    feedbackList.innerHTML =
      "<p>Unable to load feedback. Please try again later.</p>";
  }
}

// EDIT FEEDBACK
function editFeedback(id) {
  localStorage.setItem("editFeedbackId", id);
  window.location.href = "index.html";
}

// DELETE FEEDBACK
async function deleteFeedback(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this feedback?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete feedback");
    }

    alert(data.message || "Feedback deleted successfully!");

    // Refresh feedback list after deletion
    await getFeedback();
  } catch (error) {
    console.error("Error deleting feedback:", error);
    alert("Unable to delete feedback. Please try again.");
  }
}

// Load feedback when page opens
getFeedback();
