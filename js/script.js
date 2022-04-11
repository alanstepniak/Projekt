document.getElementsByClassName('mobileHamburger')[0].addEventListener('click', function () {
    document.getElementsByClassName('openMenuHolder')[0].classList.toggle('open');
})

document.getElementsByClassName('mobileClose')[0].addEventListener('click', function () {
    document.getElementsByClassName('openMenuHolder')[0].classList.toggle('open');
});

const createAppointment = (appointment) => {
    const appointmentMessage = document.querySelector('.appointmentMessage');
    fetch('https://akademia108.pl/api/ajax/post-appointment.php', {
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(appointment)
    }).then(res => res.json())
        .then(resJSON => {
            console.log(resJSON);
            appointmentMessage.classList.add('send');
            appointmentMessage.innerText = `Dziękujemy ${resJSON.appointment.name}. Zostałeś zapisany!`
        })
}

document.getElementById('appointmentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const appointmentMessage = document.querySelector('.appointmentMessage');
    let formFields = document.getElementsByClassName('formField');
    let allFields = false;
    let appointment = {
        name: document.getElementById('appointmentName').value,
        email: document.getElementById('appointmentEmail').value,
        service: document.getElementById('appointmentService').value,
        phone: document.getElementById('appointmentPhone').value,
        date: document.getElementById('appointmentDate').value,
        time: document.getElementById('appointmentTime').value,
        message: document.getElementById('appointmentMessage').value
    }

    for (let i = 0; i < formFields.length; i++) {
        if (formFields[i].value === '') {
            allFields = false;
            formFields[i].classList.add('error');
        } else {
            allFields = true;
            formFields[i].classList.remove('error');
        }
    }

    if (allFields) {
        createAppointment(appointment);
    } else {
        appointmentMessage.classList.add('error');
        appointmentMessage.innerText = 'Wypełnij wymagane pola';
    }

})