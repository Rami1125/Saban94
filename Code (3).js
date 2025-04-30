function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'AIzaSyCNn7GZMsQPCdRSfgz_o08M1YV63CkA3Ow' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var params = JSON.parse(e.postData.contents);
    var action = params.action;
    var spreadsheetId;
    var sheetName = 'Sheet1';
    var data = params.data;

    switch (action) {
      case 'saveUser':
        spreadsheetId = '1rmXT32BBS6eLnFbN5B1bnM5iwavyOaSzpoPdqL1fwEQ';
        return saveToSheet(spreadsheetId, sheetName, [
          new Date().toISOString(),
          data.name || '',
          data.phone || ''
        ]);

      case 'saveChat':
        spreadsheetId = '1riy2IT-SUsTzR5clG-sgyE4eafbEy_FpoisTp53hKNo';
        return saveToSheet(spreadsheetId, sheetName, [
          new Date().toISOString(),
          data.userName || '',
          data.question || '',
          data.answer || ''
        ]);

      case 'saveOrder':
        spreadsheetId = '1IYAX1EQs01XqYbKpKDCtJZFSxxSek_skxU_CY9nam3c';
        return saveToSheet(spreadsheetId, sheetName, [
          new Date().toISOString(),
          data.customer || '',
          data.contact || '',
          data.phone || '',
          data.crane || '',
          data.street || '',
          data.city || '',
          data.container || '',
          JSON.stringify(data.items || [])
        ]);

      case 'updateStats':
        spreadsheetId = '1L9v3GKiIOfr4551kZDuNHdEg1Bu2nczmynGWyHu3QI8';
        return saveToSheet(spreadsheetId, sheetName, [
          new Date().toISOString(),
          data.messageCount || 0,
          data.orderCount || 0
        ]);

      default:
        return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'פעולה לא תקינה' }))
          .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function saveToSheet(spreadsheetId, sheetName, data) {
  try {
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
    }
    sheet.appendRow(data);
    return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'הנתונים נשמרו בהצלחה' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
