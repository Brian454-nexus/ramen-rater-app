// Sample ramen data
const ramens = [
    {
        id: 1,
        name: "Shoyu Ramen",
        restaurant: "Ichiran",
        image: "https://i.pinimg.com/736x/7c/9d/aa/7c9daa9345d6a208d2f67657998a617b.jpg",
        rating: 5,
        comment: "Delicious!",
    },
    {
        id: 2,
        name: "Miso Ramen",
        restaurant: "Menya",
        image: "https://i.pinimg.com/736x/00/76/fe/0076fe7fc47124e6e4fe5ef54eb7ad36.jpg",
        rating: 4,
        comment: "Very flavorful!",
    },
    {
        id: 3,
        name: "Tonkotsu Ramen",
        restaurant: "Ramen-ya",
        image: "https://i.pinimg.com/736x/3c/37/f1/3c37f10c09c7fe31f988c7d4750f80ca.jpg",
        rating: 3,
        comment: "Rich broth!",
    },
];

// Wait for the DOM to fully load before running the main function
document.addEventListener("DOMContentLoaded", main);

function main() {
    // Display the initial list of ramens
    displayRamens();
    // Add event listener for the form submission
    addSubmitListener();
    // Setup event listener for the delete button
    setupEditAndDelete();
    // Display the first ramen's details if there are any ramens
    if (ramens.length) handleClick(ramens[0]);
}

// Function to display the list of ramen images in the menu
function displayRamens() {
    const menu = document.getElementById("ramen-menu");
    menu.innerHTML = ""; // Clear the menu
    ramens.forEach((ramen) => {
        const img = document.createElement("img");
        img.src = ramen.image || "https://via.placeholder.com/150";
        img.alt = ramen.name || "Unknown Ramen";
        img.addEventListener("click", () => handleClick(ramen)); // Add click event to display details
        menu.appendChild(img);
    });
}

// Function to display the details of the clicked ramen
function handleClick(ramen) {
    const detailImg = document.querySelector("#ramen-detail img");
    const name = document.getElementById("ramen-name");
    const restaurant = document.getElementById("ramen-restaurant");
    const rating = document.getElementById("ramen-rating");
    const comment = document.getElementById("ramen-comment");

    detailImg.src = ramen.image || "https://via.placeholder.com/300";
    detailImg.alt = ramen.name || "Mysterious Ramen";
    name.textContent = ramen.name || "Unnamed Ramen";
    restaurant.textContent = ramen.restaurant || "Unknown Spot";
    rating.textContent = ramen.rating ? `${ramen.rating}/10` : "N/A";
    comment.textContent = ramen.comment || "No thoughts yet!";
}

// Function to add event listener for the form submission
function addSubmitListener() {
    const form = document.getElementById("new-ramen-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        const name = document.getElementById("new-ramen-name").value;
        const restaurant = document.getElementById("new-ramen-restaurant").value;
        const image = document.getElementById("new-ramen-image").value;
        const rating = parseInt(document.getElementById("new-ramen-rating").value);
        const comment = document.getElementById("new-ramen-comment").value;

        // Validate the rating input
        if (isNaN(rating) || rating < 0 || rating > 10) {
            alert("Rating must be between 0 and 10!");
            return;
        }

        // Create a new ramen object
        const newRamen = {
            id: ramens.length + 1,
            name,
            restaurant,
            image,
            rating,
            comment,
        };

        // Add the new ramen to the list and update the display
        ramens.push(newRamen);
        displayRamens();
        form.reset(); // Reset the form fields
    });
}

// Function to setup event listener for the delete button
function setupEditAndDelete() {
    const deleteRamen = document.getElementById("delete-ramen");
    deleteRamen.addEventListener("click", () => {
        const ramenName = document.getElementById("ramen-name").textContent;
        const index = ramens.findIndex(r => r.name === ramenName);
        if (index !== -1) {
            ramens.splice(index, 1); // Remove the ramen from the list
            displayRamens();
            if (ramens.length) {
                handleClick(ramens[0]); // Display the first ramen if there are any left
            } else {
                // Display a placeholder if no ramens are left
                handleClick({ image: "https://via.placeholder.com/300", name: "No Ramen", restaurant: "N/A", rating: "N/A", comment: "No comments" });
            }
        }
    });
}
