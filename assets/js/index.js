document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-button");

  deleteButtons.forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();

      const userId = button.getAttribute("data-id");
      const url = `/dashbord/${userId}`;

      fetch(url, {
        method: "DELETE"
      })
        .then(response => {
          if (response.ok) {
            // Handle successful response (e.g., update UI)
            alert("User deleted succesfully");
            window.location.replace('/register');
          } else {
            // Handle error response
            console.error("Failed to delete user");
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    });
  });
});

