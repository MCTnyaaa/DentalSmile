document.addEventListener("DOMContentLoaded", function() {
    /*
        Pass the parameters to confirmation page and error/validation handling
    */
   
    function confirmAppointment() {
        let formData = {
            firstName: document.getElementById("first-name").value.trim(),
            lastName: document.getElementById("last-name").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            dob: document.getElementById("date-birth").value.trim(),
            address: document.getElementById("address").value.trim(),

            service: document.getElementById("service").value,
            date: document.getElementById("date").value.trim(),
            time: document.getElementById("time").value.trim(),
            dentist: document.getElementById("dentist").value,
        }

        if (!formData.firstName || !formData.lastName || !formData.email || 
            !formData.phone || !formData.dob || !formData.address || 
            !formData.service || !formData.date || !formData.time || !formData.dentist) { // Every input should be filed with the exception of additional comments
            alert("Please fill out all necessary fields before booking.");
            return;
        }

        // Email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
        if(!emailPattern.test(formData.email)){
            alert("Please input a valid email address.");
           return; 
        }

        // Phone validation
        const phonePattern = /^(\+?[0-9]{1,3})?(\s?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{4})$/;
        if (!phonePattern.test(formData.phone)) {
            alert("Please input a valid phone number.");
            return;
        }

        // Date and Time validation
        const userDate = new Date(formData.date); // Convert user input date to Date object
        const currentDate = new Date(); 
        const userDob = new Date(formData.dob);
        currentDate.setHours(0, 0, 0, 0); // Set the current time to 00:00:00 to only compare the date part
        userDate.setHours(0, 0, 0, 0);

        if (userDob > currentDate) {
            alert("Date of birth cannot be later than the current date.");
            return;
        }
        
        if (userDob > userDate) {
            alert("Date of birth cannot be later than the appointment date.");
            return;
        }        

        if (userDate <= currentDate) {
            alert("Please select a future date for the appointment.");
            return;
        }

        if(userDate.getDay() == 6 ){ // For sundays are closed
            alert("Unfortunately, Sundays are closed. Choose betweeen Monday to Saturday");
            return;
        }
   
        let url = new URLSearchParams(formData).toString();
        window.location.href = `dentalsmile_confirmation.html?${url}` // Direct to confirmation page with the data in url
    };

    document.getElementById("appointment-button").addEventListener("click", function(event) { 
        event.preventDefault(); // Avoid refreshing the page
        confirmAppointment();
    });


})


document.addEventListener("DOMContentLoaded", function() {
    /* 
        Retrieve parameters from url and edit the confirmation page
    */
    const urlParams = new URLSearchParams(window.location.search);

    const firstName = urlParams.get("firstName");
    const lastName = urlParams.get("lastName");
    const service = urlParams.get("service");
    const date = urlParams.get("date");
    const time = urlParams.get("time");
    const dentist = urlParams.get("dentist");

    const confirmationElement = document.getElementById("confirmation-receipt");

    if (confirmationElement) {
        confirmationElement.textContent = `Hi ${firstName} ${lastName}, we appreciate you for booking the ${service} service with Dr. ${dentist}. Your appointment is scheduled for ${date} at ${time}.`; // Use backticks for template literals
    }
});
