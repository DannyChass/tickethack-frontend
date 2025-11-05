let currentData = [];

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', async () => {
    const departure = document.getElementById('inputdeparture').value;
    const arrival = document.getElementById('inputarrival').value
    const date = document.getElementById('date').value;
    try {
        const query = `?departure=${encodeURIComponent(departure)}&arrival=${encodeURIComponent(arrival)}&date=${encodeURIComponent(date)}`;
        const response = await fetch(`http://localhost:3000/trips/search${query}`);
        const data = await response.json();
        console.log(data);

        const tripContainer = document.getElementById('tripsContainer');

        if (data.length !== 0) {
            currentData = data;
            tripContainer.innerHTML = '';
            for (let i = 0; i < 20; i++) {
                const tripModel = document.createElement('div');
                tripModel.classList.add('tripsModel');

                const pTrip = document.createElement('p');
                pTrip.innerHTML = `${data[i].departure} > ${data[i].arrival}`;
                tripModel.classList.add('pTrip')
                tripModel.appendChild(pTrip);

                const pHour = document.createElement('p');
                const dateTrip = new Date(data[i].date);
                tripModel.classList.add('pHour')
                pHour.textContent = dateTrip.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                tripModel.appendChild(pHour);

                const pPrice = document.createElement('p');
                pPrice.innerHTML = `${data[i].price}€`;
                tripModel.classList.add('pPrice')
                tripModel.appendChild(pPrice);

                bookButton = document.createElement('button');
                bookButton.innerHTML = 'Book';
                bookButton.classList.add('book');
                tripModel.appendChild(bookButton);
                bookButton.addEventListener('click', () => addTripToUserCart(data[i]));

                tripContainer.appendChild(tripModel);
            }
        } else {
            document.getElementById('imgtrain').src = "/ui/images/notfound.png";
            document.getElementById('textBook').innerHTML = 'No trip found.'
        }
    } catch (err) {
        console.log(err);
    }
})

async function addTripToUserCart(trip) {
    const userId = localStorage.getItem('Id');
    if (!userId) {
        alert("Vous devez être connecté pour réserver un voyage.");
        return
    }

    try {
        const response = await fetch('http://localhost:3000/users/addTripToUserCart', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, tripId: trip._id }),
        });

        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.log(error);
    }
}

const menu = document.querySelector('.menu');
menu.innerHTML=`<a href="/cart.html" id="cart">Cart</a>
          <a href="/booking.html" id="booking">Booking</a>`;

console.log(localStorage.userId);
if (!localStorage.Id) {
    
    const aBalise = document.createElement('a');
    aBalise.href = '/login.html';
    aBalise.id = 'connection';
    aBalise.innerHTML = 'Connexion';
    menu.appendChild(aBalise);
}else{
    const aBalise = document.createElement('a');
    aBalise.href = '/login.html';
    aBalise.id = 'deconnection';
    aBalise.innerHTML = 'Deconnection';
    menu.appendChild(aBalise);
}