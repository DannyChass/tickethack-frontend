async function showCart() {
  const userId = localStorage.getItem("Id");
  const cartContainer = document.querySelector(".container");
  const total = document.getElementById("nbCart");

  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`);
    const data = await response.json();
    const cart = data.result.cart;

    cartContainer.innerHTML = "";
    total.textContent = `${cart.length}`;

    if (cart.length === 0) return;

    cart.forEach(trip => {
      const cartModel = document.createElement("div");
      cartModel.classList.add("cartModel");

      const pCart = document.createElement("p");
      pCart.textContent = `${trip.departure} > ${trip.arrival}`;
      cartModel.appendChild(pCart);

      const pHours = document.createElement("p");
      const date = new Date(trip.date);
      pHours.textContent = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      cartModel.appendChild(pHours);

      const pPrice = document.createElement("p");
      pPrice.textContent = `${trip.price}€`;
      cartModel.appendChild(pPrice);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.classList.add("deleCart");
      deleteButton.addEventListener("click", () => deleteTripFromCart(trip._id));
      cartModel.appendChild(deleteButton);

      cartContainer.appendChild(cartModel);
    });
  } catch (err) {
    console.error("Erreur lors de l'affichage du panier :", err);
  }
}

// Supprime un voyage du panier
async function deleteTripFromCart(tripId) {
  const userId = localStorage.getItem("Id");

  try {
    const response = await fetch("http://localhost:3000/users/removeTripFromUserCart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, tripId }),
    });

    const data = await response.json();
    console.log("Suppression :", data);
    await showCart();
  } catch (error) {
    console.error("Erreur suppression :", error);
  }
}

// Ajoute les voyages du panier à la réservation
async function addTripsToBooking() {
  const userId = localStorage.getItem("Id");

  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`);
    const data = await response.json();
    const cart = data.result.cart;

    for (const trip of cart) {
      const tripId = trip._id;

      try {
        const bookingResponse = await fetch("http://localhost:3000/users/addTripToUserBook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, tripId }),
        });

        const bookingData = await bookingResponse.json();
        console.log("Réservation :", bookingData);

        const deleteResponse = await fetch("http://localhost:3000/users/removeTripFromUserCart", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, tripId }),
        });

        const deleteData = await deleteResponse.json();
        console.log("Suppression après réservation :", deleteData);
      } catch (error) {
        console.error("Erreur pour le voyage :", tripId, error);
      }
    }

    await showCart();
  } catch (error) {
    console.error("Erreur lors de la réservation :", error);
  }
}

// Initialisation
document.getElementById("purchase").addEventListener("click", addTripsToBooking);
showCart();

