const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', async () => {
    const departure = document.getElementById('inputdeparture').value;
    const arrival = document.getElementById('inputarrival').value
    const date = document.getElementById('date').value;
    console.log(typeof date);
    try {
        const query = `?departure=${encodeURIComponent(departure)}&arrival=${encodeURIComponent(arrival)}&date=${encodeURIComponent(date)}`;
        const response = await fetch(`http://localhost:3000/trips/search${query}`);
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
})