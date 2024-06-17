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
    dateClick: function(info) {
      var selectedDate = info.dateStr; // Użycie info.dateStr, aby uzyskać datę w formacie YYYY-MM-DD
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

    // Utworzenie obiektu z danymi pasażera
    var passengerData = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      departure: departure,
      destination: destination,
      price: price,
      notes: notes
    };

    // Przygotowanie HTML dla nowego pasażera
    var passengerInfo = `${firstName} ${lastName} - Tel: ${phoneNumber}, Trasa: ${route}, Cena: ${price} PLN`;
    var passengerItem = document.createElement('li');
    passengerItem.textContent = passengerInfo;

    // Dodanie pasażera do odpowiedniej listy
    if (route === 'Polska-Niemcy') {
      document.getElementById('pl-de-list').appendChild(passengerItem);
    } else if (route === 'Niemcy-Polska') {
      document.getElementById('de-pl-list').appendChild(passengerItem);
    }

    // Czyszczenie formularza
    form.reset();
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('passengerListSection').style.display = 'block';
  });
});


