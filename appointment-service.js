// This file simulates backend API calls to get available dates and time slots

/**
 * Get available dates for appointments
 * In a real application, this would call your backend API
 */
async function getAvailableDates() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Generate available dates (next 14 days, excluding some random dates to simulate fully booked days)
  const availableDates = []
  const today = new Date()

  for (let i = 1; i <= 14; i++) {
    const date = new Date()
    date.setDate(today.getDate() + i)
    

    // Randomly exclude some dates (simulating fully booked days)
    // In a real app, this would come from your backend
 

  return availableDates
}}

/**
 * Get available time slots for a specific date
 * In a real application, this would call your backend API
 */
async function getAvailableTimeSlots(date) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  // All possible time slots
  const allTimeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
  ]

  // Simulate some time slots being already booked
  // In a real app, this would come from your backend
  const selectedDate = new Date(date)
  const dayOfWeek = selectedDate.getDay()
  const dayOfMonth = selectedDate.getDate()

  // Use the date to deterministically generate "booked" slots
  // This is just for demo purposes
  const bookedIndices = []

  // Use day of week and day of month to generate different patterns of booked slots
  bookedIndices.push(dayOfWeek)
  bookedIndices.push(dayOfWeek + 4)
  bookedIndices.push(dayOfMonth % allTimeSlots.length)
  bookedIndices.push((dayOfMonth * 2) % allTimeSlots.length)

  // Filter out the booked time slots
  const availableTimeSlots = allTimeSlots.filter((_, index) => !bookedIndices.includes(index))

  return availableTimeSlots
}

/**
 * Book an appointment
 * In a real application, this would call your backend API
 */
async function bookAppointment(appointmentData) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simulate successful booking (95% success rate)
  const isSuccessful = Math.random() > 0.05

  if (!isSuccessful) {
    throw new Error("Failed to book appointment. Please try again.")
  }

  return {
    success: true,
    message: "Appointment booked successfully!",
    appointmentId: "appt_" + Math.random().toString(36).substr(2, 9),
  }
}
