const CONTAINER = document.querySelector('.container');
const SEATS = document.querySelectorAll('.row .seat:not(.occupied)');
const COUNT = document.getElementById('count');
const TOTAl = document.getElementById('total');
const MOVIE_SELECT = document.getElementById('movie');

let ticketPrice = +MOVIE_SELECT.value;

// Save Movie Data function
function setMovieData(movieIndex, moviePRice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePRice);
}

// Update Total price and seat count
function updateSeatCount() {
    const SELECTED_SEATS = document.querySelectorAll('.row .seat.selected');
    const SELECTED_SEATS_COUNT = SELECTED_SEATS.length;
    const SEAT_INDEX = [...SELECTED_SEATS].map((seat) =>
        [...SEATS].indexOf(seat)
    );

    localStorage.setItem('selectedSeats', JSON.stringify(SEAT_INDEX));
    COUNT.textContent = SELECTED_SEATS_COUNT;
    TOTAl.textContent = SELECTED_SEATS_COUNT * ticketPrice;
}

// Movie Select Event
MOVIE_SELECT.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSeatCount();
});

// Select seat event
CONTAINER.addEventListener('click', (e) => {
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');
        updateSeatCount();
    }
});
