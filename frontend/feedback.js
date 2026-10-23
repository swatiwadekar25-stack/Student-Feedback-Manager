
const feedbackList = document.getElementById("feedbackList");

async function getFeedback() {
const API_URL="https://student-feedback-manager-frontend-tau.vercel.app/api/feedback"
try {

    const response = await fetch(
        API_URL
    );

    const feedback = await response.json();

    feedbackList.innerHTML = "";

    feedback.forEach((item) => {

        const card = document.createElement("div");

        card.classList.add("feedback-item");

        card.innerHTML = `

            <h3> 👤 ${item.studentName} </h3>

            <p><strong>Student ID:</strong> ${item.studentId}</p>
            <p><strong>Email:</strong>${item.email || "Not provided"}</p>
            <p><strong>Course:</strong>${item.course || "Not provided"}</p>
            <p><strong>Year:</strong>${item.year || "Not provided"}</p>
            <p><strong>Semester:</strong>${item.semester || "Not provided"}</p>
            <p><strong>Batch:</strong>${item.batch || "Not provided"}</p>
            <p class="rating"><strong>Rating:</strong>${item.rating}/5 ⭐</p>
            <p><strong>Comment:</strong>${item.comment}</p>

            <button class="edit-btn" onclick="editFeedback('${item._id}')">✏️ </button>

            <button class="delete-btn" onclick="deleteFeedback('${item._id}')"> &#10060</button>
        `;

        feedbackList.appendChild(card);

    });

} catch (error) {

    console.log(error);

    feedbackList.innerHTML =
        "<p>Unable to load feedback.</p>";
}
}

//EDIT FEEDBACK
function editFeedback(id) {

    console.log("Edit ID:", id);

    localStorage.setItem("editFeedbackId", id);

    window.location.href = "index.html";
}


//DELETE FEEDBACK
async function deleteFeedback(id){
    const confirmDelete =confirm(
        "Are you sure you want to delete this feedback?"
    );
    if(!confirmDelete){
        return
    }
    try{
        const response =await fetch(`/api/feedback/${id}`,{
            method:"DELETE"
        })

        const data =await response.json();
        if(!response.ok){
            throw new Error(data.message)
        }
        alert(data.message)
        // getFeedback()
    }
    catch(error){
        console.log(error)
            alert("Error deleting feedback")
        }
    }

    

getFeedback();


