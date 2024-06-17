document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'pl',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [
      // Tutaj możesz dodać zdarzenia kalendarza, jeśli potrzebujesz
    ],
    dateClick: function(info) {
      var selectedDate = moment(info.date).format('YYYY-MM-DD');
      document.getElementById('selectedDate').value = selectedDate;
      document.getElementById('passengerListDate').innerText = selectedDate;
      document.getElementById('calendarSection').style.display = 'none';
      document.getElementById('formSection').style.display = 'block';
    }
  });

  calendar.render();

  // Obsługa formularza dodawania pasażera
  var form = document.getElementById('passengerForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    var route = form.route.value;
    var firstName = form.firstName.value;
    var lastName = form.lastName.value;
    var phoneNumber = form.phoneNumber.value;
    var departure = form.departure.value;
    var destination = form.destination.value;
    var price = form.price.value;
    var notes = form.notes.value;

    // Tutaj dodaj logikę dodawania pasażera do odpowiedniej listy (pl-de-list lub de-pl-list)

    // Przykładowa operacja dodawania do listy
    var passengerInfo = `${firstName} ${lastName} - Tel: ${phoneNumber}, Trasa: ${route}, Cena: ${price}`;
    var passengerItem = document.createElement('li');
    passengerItem.textContent = passengerInfo;

    if (route === 'Polska-Niemcy') {
      document.getElementById('pl-de-list').appendChild(passengerItem);
    } else if (route === 'Niemcy-Polska') {
      document.getElementById('de-pl-list').appendChild(passengerItem);
    }

    // Czyść formularz
    form.reset();
    document.getElementById('calendarSection').style.display = 'block';
    document.getElementById('formSection').style.display = 'none';
  });
});


