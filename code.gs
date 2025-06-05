function doGet(req) {


    const sheet = req.parameter.sheet;
    const date = req.parameter.date;
    if (sheet === "availabilities") {
        if (!date) return ContentService.createTextOutput(JSON.stringify({ message: "Please Privide  a Date" })).setMimeType(ContentService.MimeType.JSON)
        const { availabilities, bookings } = sheetData()
        const dataBooks = bookings.getDataRange().getValues();
        const dataSlots = availabilities.getDataRange().getValues();
        const slotHeadings = dataSlots[0];
        const bookingHeadings = dataBooks[0];
        const slots = dataSlots.slice(1);
        const appointments = dataBooks.slice(1)
        const booksObj = makeObj(appointments, bookingHeadings)
        const slotObj = makeObj(slots, slotHeadings);
        const filterbooks = booksObj.filter(books => {
            return new Date(books.date).toDateString() === new Date(date).toDateString()
        });
        const filterSlots = slotObj.filter(slot => {
            return slot.day === new Date(date).getDay()
        });
        const availableSlots = filterSlots.filter(slot => {
            return filterbooks.some(book => new Date(book.start_time).getHours() !== new Date(slot.start_time).getHours())

        });

        // const availabilities
        return ContentService.createTextOutput(JSON.stringify(availableSlots)).setMimeType(ContentService.MimeType.JSON)
    }

    // const { bookings } = sheetData();
    // Logger.log(obj)
    // const output = JSON.stringify(obj)
    // return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON)


}

function sheetData(req) {

    const id = '1teeaPDL61fx5ZsgBuNdfIvso61REODYGhZyt_hEy4T0';
    const ss = SpreadsheetApp.openById(id);
    const availabilitiesSheet = ss.getSheetByName("availabilities");
    const bookingsSheet = ss.getSheetByName("bookings");
    return { availabilities: availabilitiesSheet, bookings: bookingsSheet }
}


function makeObj(rows, headings) {
    return rows.map(function (row) {
        const tempObj = {};
        headings.forEach((heading, index) => {
            heading = heading.toLowerCase();

            tempObj[heading] = row[index];
        });
        return tempObj;
    })

}
function doPost(req) {
    const data = e.postData.contents; // Raw string
    const json = JSON.parse(data);    // Convert to object (if JSON)
    const sheet = req.parameter.sheet;
    const { availabilities, bookings } = sheetData();
 bookings.appendRow([
    
 ]
 )



    return ContentService.createTextOutput(JSON.stringify(availableSlots)).setMimeType(ContentService.MimeType.JSON)

}