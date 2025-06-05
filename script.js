document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const form = document.getElementById("appointmentForm");
  const datePicker = document.getElementById("datePicker");
  const timeSlots = document.getElementById("timeSlots");
  const timeMessage = document.getElementById("timeMessage");
  const submitButton = document.getElementById("submitButton");
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");

  // State
  let selectedTime = null;
  let availableDates = [];
  let isLoading = false;

  // Mock functions (replace with actual API calls)
  async function getAvailableDates() {
    // Simulate fetching available dates from a backend

    const today = new Date();
    const futureDates = [];
    for (let i = 0; i < 7; i++) {
      // add more 7 days
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      if (nextDate.getDay() !== 6 && nextDate.getDay() !== 0) {
        // check the day are weekend , if weekend skip
        futureDates.push(nextDate);
      }
    }

    return futureDates;
  }

  async function getAvailableTimeSlots(date) {
    // Simulate fetching available time slots for a given date
    const url =
    "https://script.google.com/macros/s/AKfycbxqH-ArZIe4Cs_5OqYn6soqxqQFneBP2XNzNV2UiYq70lremMnFSl-SPJx-QhiONf0c/exec"
  
   const res =  fetch(`${url}?sheet=availabilities&date=${date}`)
      const data = await (await res).json()
      const times = data.map( time => {
       return new Date(time.start_time).toLocaleTimeString()
      })
    console.log(times);

    return times
  }

  async function bookAppointment(appointmentData) {
    // Simulate booking an appointment
  const url =
    "https://script.google.com/macros/s/AKfycbxqH-ArZIe4Cs_5OqYn6soqxqQFneBP2XNzNV2UiYq70lremMnFSl-SPJx-QhiONf0c/exec"
    const res = fetch(`${url}?`)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success or failure based on some condition
        const success = true; // Change to false to simulate an error
        if (success) {
          resolve({ message: "Appointment booked successfully!" });
        } else {
          reject(new Error("Failed to book appointment."));
        }
      }, 500);
    });
  }

  // Initialize date picker
  initDatePicker();

  // Form submission
  form.addEventListener("submit", handleSubmit);

  // Initialize date picker with available dates
  async function initDatePicker() {
    try {
      // Show loading state
      datePicker.placeholder = "Loading available dates...";
      datePicker.disabled = true;

      // Get available dates from backend
      availableDates = await getAvailableDates();

      // Initialize flatpickr with available dates
      const fp = flatpickr(datePicker, {
        minDate: "today",
        dateFormat: "Y-m-d",
        disable: [
          (date) => {
            // Disable dates that are not in availableDates
            return !availableDates.some(
              (availableDate) =>
                availableDate.getDate() === date.getDate() &&
                availableDate.getMonth() === date.getMonth() &&
                availableDate.getFullYear() === date.getFullYear()
            );
          },
        ],
        onChange: (selectedDates) => {
          console.log(selectedDates, "sdfgsrgf");
          if (selectedDates.length > 0) {
            loadTimeSlots(selectedDates[0]);
          }
        },
      });

      datePicker.placeholder = "Select a date";
      datePicker.disabled = false;
      datePicker.click();
    } catch (error) {
      console.error("Failed to initialize date picker:", error);
      showToast(
        "Failed to load available dates. Please try again later.",
        "error"
      );
      datePicker.placeholder = "Error loading dates";
    }
  }

  // Load time slots for selected date
  async function loadTimeSlots(date) {
    try {
      // Show loading state
      timeMessage.textContent = "Loading available times...";
      timeSlots.innerHTML = "";
      timeSlots.appendChild(timeMessage);
      isLoading = true;

      // Get available time slots from backend
      const availableTimeSlots = await getAvailableTimeSlots(date);

      // Clear loading message
      timeSlots.innerHTML = "";

      if (availableTimeSlots.length === 0) {
        timeMessage.textContent = "No available times for selected date";
        timeSlots.appendChild(timeMessage);
      } else {
        // Create time slot buttons
        availableTimeSlots.forEach((time) => {
          const timeSlot = document.createElement("div");
          timeSlot.className = "time-slot";
          timeSlot.textContent = time;
          timeSlot.addEventListener("click", () =>
            selectTimeSlot(timeSlot, time)
          );
          timeSlots.appendChild(timeSlot);
        });
      }
    } catch (error) {
      console.error("Failed to load time slots:", error);
      timeMessage.textContent =
        "Failed to load available times. Please try again.";
      timeSlots.innerHTML = "";
      timeSlots.appendChild(timeMessage);
    } finally {
      isLoading = false;
    }
  }

  // Handle time slot selection
  function selectTimeSlot(element, time) {
    // Remove selected class from all time slots
    document.querySelectorAll(".time-slot").forEach((slot) => {
      slot.classList.remove("selected");
    });

    // Add selected class to clicked time slot
    element.classList.add("selected");
    selectedTime = time;
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = datePicker.value;

    // Validate form
    if (!name || !phone || !email || !title || !date || !selectedTime) {
      showToast(
        "Please fill in all required fields and select a time slot.",
        "error"
      );
      return;
    }

    // Prepare appointment data
    const appointmentData = {
      name,
      phone,
      email,
      title,
      description,
      date,
      time: selectedTime,
    };
    console.log(appointmentData);
    // Submit appointment
    try {
      // Show loading state
      submitButton.disabled = true;
      submitButton.textContent = "Processing...";

      // Book appointment
      const result = await bookAppointment(appointmentData);

      // Show success message
      showToast(
        `Appointment booked successfully for ${formatDate(
          date
        )} at ${selectedTime}.`,
        "success"
      );

      // Reset form
      form.reset();
      selectedTime = null;
      document.querySelectorAll(".time-slot").forEach((slot) => {
        slot.classList.remove("selected");
      });
      timeMessage.textContent = "Please select a date first";
      timeSlots.innerHTML = "";
      timeSlots.appendChild(timeMessage);
    } catch (error) {
      showToast(
        error.message || "Failed to book appointment. Please try again.",
        "error"
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Book Appointment";
    }
  }

  // Show toast notification
  function showToast(message, type = "success") {
    toastMessage.textContent = message;
    toast.className = `toast ${type} show`;

    // Hide toast after 5 seconds
    setTimeout(() => {
      toast.className = "toast";
    }, 5000);
  }

  // Format date for display
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
});
