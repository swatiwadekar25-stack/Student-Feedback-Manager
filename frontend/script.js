


const feedbackForm = document.getElementById("feedbackForm");
const message = document.getElementById("message");

// Correct Render backend URL
const API_URL = "https://student-feedback-manager-ce1o.onrender.com/api/feedback";

// Submit feedback form
feedbackForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const studentName = document.getElementById("studentName").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value;
    const year = document.getElementById("year").value;
    const semester = document.getElementById("semester").value;
    const batch = document.getElementById("batch").value.trim();
    const comment = document.getElementById("comment").value.trim();

    const selectedRating = document.querySelector(
        'input[name="rating"]:checked'
    );

    if (!selectedRating) {
        message.textContent = "Please select a rating.";
        return;
    }

    const feedbackData = {
        studentName,
        studentId,
        email,
        course,
        year,
        semester,
        batch,
        rating: Number(selectedRating.value),
        comment
    };

    try {
        message.textContent = "Submitting feedback...";

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(feedbackData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || `Request failed: ${response.status}`
            );
        }

        message.textContent =
            data.message || "Feedback submitted successfully!";

        feedbackForm.reset();

    } catch (error) {
        console.error("Feedback submission error:", error);

        message.textContent =
            "Unable to submit feedback. Please check your connection and try again.";
    }
});