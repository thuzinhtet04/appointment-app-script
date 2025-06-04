function doGet() {
  let html = HtmlService.createHtmlOutputFromFile("index");
  return html;

}

function insertAppointment(){
  let spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  let appointmentSheet = spreadSheet.getSheetByName("availabilities");
const data = appointmentSheet.getRange("A2:F49").getValues()
  const timezone = SpreadsheetApp.getActive().getSpreadsheetTimeZone();
    const cleanData = data.map(row => {
    const day = row[0];
    const start_time = Utilities.formatDate(row[1], timezone, "HH:mm");
    const end_time = Utilities.formatDate(row[2], timezone, "HH:mm");
    const slots = parseInt(row[3]);
    const filled_slots = parseInt(row[4])
    const remains = parseInt(row[5]);
    
    return {day, start_time, end_time, slots , filled_slots , remains };
  });
  Logger.log(cleanData)

}