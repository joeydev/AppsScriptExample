function createChangeSisIdCsv() { //use error file from Canvas SIS import to create change_sis_id.csv
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var newSheet = ss.insertSheet(); //create a new sheet for our CSV

  let sisIdErrors = ss.getSheets()[0] //on the sheet with the import errors, find matches only for the error we're correcting
   .createTextFinder("An existing Canvas user with the SIS ID")
   .findAll();

  sisIdErrors.forEach(function (record) { //copy each record containing the error we're correcting to a new sheet, and add the value 'user' to column 3 while we're at it
    newSheet.getRange(newSheet.getLastRow()+1,3).setValue("user");
    record.copyTo(newSheet.getRange(newSheet.getLastRow(),1));
  });

  let replaceText1 = newSheet //removing the error text except for our old and new SIS ID values
   .createTextFinder("An existing Canvas user with the SIS ID ")
   .replaceAllWith("")
  let replaceText2 = newSheet
  .createTextFinder(" has already claimed")
   .replaceAllWith("")
  let repaceText3 = newSheet
  .createTextFinder("'s user_id requested login information, skipping")
   .replaceAllWith("")

  newSheet.getRange("A:A").splitTextToColumns(' '); //splitting the old and new SIS ID values to their respective columns

  newSheet.insertRowBefore(1); //set Canvas CSV import headers for change_sis_id.csv
  newSheet.getRange(1,1).setValue("old_id");
  newSheet.getRange(1,2).setValue("new_id");
  newSheet.getRange(1,3).setValue("type");
}