async function showBook() {
  const userId = localStorage.getItem("Id");
  const bookingContainer = document.querySelector(".container");

  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`);
    const data = await response.json();
    const bookings = data.result.booking;

    bookingContainer.innerHTML = "";

    if (bookings.length === 0) return;

    bookings.forEach(trip => {
      const bookModel = document.createElement("div");
      bookModel.classList.add("bookModel");

      // Trajet
      const pRoute = document.createElement("p");
      pRoute.textContent = `${trip.departure} > ${trip.arrival}`;
      bookModel.appendChild(pRoute);

      // Heure de départ
      const date = new Date(trip.date);
      const pHours = document.createElement("p");
      pHours.textContent = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });
      bookModel.appendChild(pHours);

      // Prix
      const pPrice = document.createElement("p");
      pPrice.textContent = `${trip.price}€`;
      bookModel.appendChild(pPrice);

      // Temps avant départ
      const now = new Date();
      const hoursUntilDeparture = Math.round((date - now) / (1000 * 60 * 60));
      const pCountdown = document.createElement("p");
      pCountdown.textContent = `Departure in ${hoursUntilDeparture} hours`;
      pCountdown.classList.add("dateBook");
      bookModel.appendChild(pCountdown);

      bookingContainer.appendChild(bookModel);
    });
  } catch (err) {
    console.error("Erreur lors de l'affichage des réservations :", err);
  }
}

showBook();
