

const feedbackForm = document.getElementById("feedbackForm");
const message = document.getElementById("message");


feedbackForm.addEventListener("submit", async (e) => {

    e.preventDefault();

 // Get student information
    const studentName = document.getElementById("studentName").value;
    const studentId = document.getElementById("studentId").value;
    const email = document.getElementById("email").value;
    const course = document.getElementById("course").value;
    const year = document.getElementById("year").value;
    const semester = document.getElementById("semester").value;
    const batch = document.getElementById("batch").value;

     // Get selected rating
    const selectedRating = document.querySelector(
        'input[name="rating"]:checked'
    );

    // Check if rating is selected
    if (!selectedRating) {
        message.textContent = "Please select a rating.";
        return;
    }

    const rating = selectedRating.value;

    // Get comment
    const comment = document.getElementById("comment").value;

    try {

        const response = await fetch(
            "http://localhost:4000/api/feedback",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                   studentName:studentName,
                   studentId:studentId,
                   email:email,
                   course:course,
                   year:year,
                   semester:semester,
                   batch:batch,
                   rating:Number(rating),
                   comment:comment
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            message.textContent = data.message;

            feedbackForm.reset();

        } else {

            message.textContent = data.message;
        }

    } catch (error) {

        console.error(error);

        message.textContent = "Something went wrong. Please try again.";
    }
});