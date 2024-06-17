document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'pl',
    dateClick: function(info) {
      document.getElementById('selectedDate').value = info.dateStr;
      document.getElementById('passengerListDate').textContent = info.dateStr;
      document.getElementById('formSection').style.display = 'block';
      document.getElementById('passengerListSection').style.display = 'block';
      loadPassengers(info.dateStr);
    }
  });
  calendar.render();

  document.getElementById('passengerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addPassenger();
  });

  function addPassenger() {
    var date = document.getElementById('selectedDate').value;
    var route = document.getElementById('route').value;
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var departure = document.getElementById('departure').value;
    var destination = document.getElementById('destination').value;
    var price = document.getElementById('price').value;
    var notes = document.getElementById('notes').value;

    var passenger = {
      firstName,
      lastName,
      phoneNumber,
      departure,
      destination,
      price,
      notes
    };

    var passengers = JSON.parse(localStorage.getItem(date)) || { 'Polska-Niemcy': [], 'Niemcy-Polska': [] };
    passengers[route].push(passenger);
    localStorage.setItem(date, JSON.stringify(passengers));
    loadPassengers(date);
    document.getElementById('passengerForm').reset();
  }

  function loadPassengers(date) {
    var passengers = JSON.parse(localStorage.getItem(date)) || { 'Polska-Niemcy': [], 'Niemcy-Polska': [] };
    var plDeList = document.getElementById('pl-de-list');
    var dePlList = document.getElementById('de-pl-list');

    plDeList.innerHTML = '';
    dePlList.innerHTML = '';

    passengers['Polska-Niemcy'].forEach((passenger, index) => {
      var li = document.createElement('li');
      li.innerHTML = `<strong>${passenger.firstName} ${passenger.lastName}</strong><br>
                      Telefon: ${passenger.phoneNumber}<br>
                      Wyjazd: ${passenger.departure}<br>
                      Dojazd: ${passenger.destination}<br>
                      Cena: ${passenger.price}<br>
                      Uwagi: ${passenger.notes}
                      <button onclick="removePassenger('${date}', 'Polska-Niemcy', ${index})">Usuń</button>`;
      plDeList.appendChild(li);
    });

    passengers['Niemcy-Polska'].forEach((passenger, index) => {
      var li = document.createElement('li');
      li.innerHTML = `<strong>${passenger.firstName} ${passenger.lastName}</strong><br>
                      Telefon: ${passenger.phoneNumber}<br>
                      Wyjazd: ${passenger.departure}<br>
                      Dojazd: ${passenger.destination}<br>
                      Cena: ${passenger.price}<br>
                      Uwagi: ${passenger.notes}
                      <button onclick="removePassenger('${date}', 'Niemcy-Polska', ${index})">Usuń</button>`;
      dePlList.appendChild(li);
    });
  }

  window.removePassenger = function(date, route, index) {
    var passengers = JSON.parse(localStorage.getItem(date));
    passengers[route].splice(index, 1);
    localStorage.setItem(date, JSON.stringify(passengers));
    loadPassengers(date);
  }
});
