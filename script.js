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
        tripContainer.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const tripModel = document.createElement('div');
            tripModel.classList.add('tripsModel');

            const pTrip = document.createElement('p');
            pTrip.innerHTML = `${data[i].departure} > ${data[i].arrival}`;
            tripModel.appendChild(pTrip);

            const pHour = document.createElement('p');
            const dateTrip = new Date(data[i].date);
            pHour.textContent = dateTrip.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            tripModel.appendChild(pHour);

            const pPrice = document.createElement('p');
            pPrice.innerHTML=`${data[i].price}€`;
            tripModel.appendChild(pPrice);

            bookButton = document.createElement('button');
            bookButton.innerHTML='Book';
            bookButton.classList.add('book');
            tripModel.appendChild(bookButton);

            tripContainer.appendChild(tripModel);
        }

    } catch (err) {
        console.log(err);
    }
})