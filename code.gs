function doGet() {

const obj = sheetData();
    Logger.log(obj)
    const output = JSON.stringify(obj)
    return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON)


}

function sheetData () {
    const id = '1teeaPDL61fx5ZsgBuNdfIvso61REODYGhZyt_hEy4T0';
    const ss = SpreadsheetApp.openById(id);
    const sheet = ss.getSheetByName("availabilities");
    const data = sheet.getDataRange().getValues();
    const headings = data[0];
    const rows = data.slice(1)
return(makeObj(rows , headings));
}


function makeObj(rows, headings){
return rows.map(function(row){
    const tempObj = {};
    headings.forEach((heading , index) => {
        heading = heading.toLowerCase();

        tempObj[heading] = row[index];
    });
    return tempObj;
})
  
}