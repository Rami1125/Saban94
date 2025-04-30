const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// הגדרת Google Sheets API
const sheets = google.sheets('v4');
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_CREDENTIALS, // קובץ JSON מהדאשבורד של Google Cloud
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

// נתיב לשליפת נתונים מהגיליון
app.get('/api/products', async (req, res) => {
  try {
    const authClient = await auth.getClient();
    const spreadsheetId = process.env.SPREADSHEET_ID;'13fP3cH_npVSYz-cHZWL27-cGwHldBP3VdnBdFZq4wN0' // ה-ID של הגיליון
    const range = 'Sheet1!A1:D1000'; // הטווח הרצוי

    const response = await sheets.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId,
      range,
    });

    res.json(response.data.values);
  } catch (error) {
    console.error('שגיאה בשליפת מוצרים:', error);
    res.status(403).json({ error: 'אין הרשאה לגשת לגיליון' });
  }
});

// נתיב בסיסי לבדיקת פעילות השרת
app.get('/', (req, res) => {
  res.send('השרת פעיל!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`השרת רץ על פורט ${PORT}`);
});


const nameData = {
  'ורד': {
    traits: 'זורחת כמו פרח, מלאת חיים ואנרגיה!',
    ramiThought: 'ורד היא כמו בלוק מושלם – יפה, חזקה, ותמיד מוסיפה צבע! 🌹',
    quip: 'ורד, עם שם כזה, את בטח שוברת לבבות במחסן! 😜'
  },
  'תמיר': {
    traits: 'מעודד, תמיד עם חיוך, מחסנאי מספר אחת!',
    ramiThought: 'תמיר הוא החבר שתמיד שם כשהמשמרת נהיית קשה! 💪',
    quip: 'תמיר, אתה מעודד את כולם, אבל מי מעודד אותך כשאשר שוב מדפיס את השבוע? 😅'
  },
  'אורן': {
    traits: 'חביב, תותח על המלגזה, קצת גמד אבל ענק בלב!',
    ramiThought: 'אורן דופק עבודה כשצריך, אבל לפעמים צריך לדחוף אותו קצת! 🚜',
    quip: 'אורן, גמדגמד, אבל כשאתה על המלגזה, אתה מלך המחסן! 😎'
  },
  'עלא': {
    traits: 'חברותי, תמיד עם סיפור טוב, מרים את המורל!',
    ramiThought: 'עלא מביא את האנרגיה, כמו משאית מלאה בלוקים! 🚚',
    quip: 'עלא, עם הסיפורים שלך, אתה צריך פודקאסט במחסן! 🎙️'
  },
  'עלי': {
    traits: 'נאמן, עובד קשה, תמיד נותן 100%!',
    ramiThought: 'עלי הוא כמו מלט – מחזיק הכל ביחד! 🧱',
    quip: 'עלי, אתה עובד כל כך קשה, אפילו המלגזה מבקשת הפסקה! 😜'
  },
  'יואב': {
    traits: 'חכם, יצירתי, תמיד עם פתרון לכל בעיה!',
    ramiThought: 'יואב הוא הראש החושב של המחסן, כמו מהנדס בלוקים! 🧠',
    quip: 'יואב, עם הראש שלך, אתה תמציא בלוק שמרכיב את עצמו! 😅'
  },
  'נתנאל': {
    traits: 'רגוע, אמין, תמיד שומר על קור רוח!',
    ramiThought: 'נתנאל הוא כמו מים ביום חם – מרגיע את כולם! 💧',
    quip: 'נתנאל, אתה כל כך רגוע, אפילו אשר לא מצליח להוציא אותך מהקצב! 😎'
  },
  'דורון': {
    traits: 'נדיב, תמיד עוזר, לב זהב!',
    ramiThought: 'דורון הוא כמו משאית שמביאה את כל הטוב למחסן! 🚛',
    quip: 'דורון, עם הלב שלך, אתה יכול למכור בלוקים בחינם ועדיין להרוויח! 😜'
  },
  'לינה': {
    traits: 'אהובת לבו של ראמי, מקסימה ומלאת קסם!',
    ramiThought: 'לינה היא הלב של המחסן, כל יום איתה הוא כמו חג! 💖',
    quip: 'לינה, ראמי אומר שאת הבלוק הכי יפה במחסן! 😍'
  },
  'שרון': {
    traits: 'צרפתיה מרעננה, תמיד עם סטייל וחיוך!',
    ramiThought: 'שרון מביאה קלאסה למחסן, כמו צבע פרימיום! 🎨',
    quip: 'שרון, עם הסטייל שלך, את יכולה למכור בלוקים בתצוגת אופנה! 😅'
  },
  'אשר': {
    traits: 'משגע את כולם עם הדפסות השבוע, אבל תמיד מצחיק!',
    ramiThought: 'אשר הוא כמו משאית שלא קוראת את המסלול, אבל בסוף מגיע! 📄',
    quip: 'אשר, תפסיק להדפיס את השבוע, ראמי כבר לא יכול לראות נייר! 😜'
  }
};

// טעינת תמונות עם גיבוי
function preloadImages() {
  const images = [
    { src: 'https://i.postimg.cc/t4Q91FDQ/Screenshot-20250427-160448-Whats-App-Business.jpg', fallback: 'https://via.placeholder.com/380x760?text=WhatsApp+Background' },
    { src: 'https://i.postimg.cc/3J9Y4b0Z/blocks.jpg', fallback: 'https://via.placeholder.com/24?text=Stylus' },
    { src: 'https://i.postimg.cc/5y3t8QzT/paint.jpg', fallback: 'https://via.placeholder.com/220?text=Paint' },
    { src: 'https://i.postimg.cc/4yqP2R9Z/tools.jpg', fallback: 'https://via.placeholder.com/220?text=Tools' }
  ];
  images.forEach(image => {
    const img = new Image();
    img.src = image.src;
    img.onerror = () => { img.src = image.fallback; };
  });
}
function getProducts() {
  return getSheetData({
    id: '1T14O3eVJzJqBXe6pr5flLckvpM4TGRycTYp5Elq2KSY',
    sheetName: 'מוצרים',
    columns: ['id', 'name', 'category', 'price', 'stock']
  });
}

// שליפת שאלות ותשובות
async function fetchResponses() {
  try {
    const sheetId = '13fP3cH_npVSYz-cHZWL27-cGwHldBP3VdnBdFZq4wN0';
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:D1000?key=${AIzaSyCNn7GZMsQPCdRSfgz_o08M1YV63CkA3Ow}`);
    const data = await response.json();
    if (!data.values || data.values.length < 2) throw new Error('No responses found');
    responses = data.values.slice(1).map(row => ({
      question: row[0] || '',
      answer: row[1] || '',
      keywords: row[2] ? row[2].split(',').map(k => k.trim()) : [],
      synonyms: row[3] ? row[3].split(',').map(s => s.trim()) : []
    }));
    keywords = responses.map(r => ({ label: r.question, question: r.question }));
    updateKeywords();
  } catch (err) {
    console.error('Error fetching responses:', err);
    displayBotMessage('אופס, לא הצלחתי לטעון את התשובות... 😅 ודא שחיבור האינטרנט תקין ונסה שוב.');
  }
}

// שליפת מוצרים
async function fetchProducts() {
  try {
    const sheetId = '1T14O3eVJzJqBXe6pr5flLckvpM4TGRycTYp5Elq2KSY';
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:E1000?key=${AIzaSyCNn7GZMsQPCdRSfgz_o08M1YV63CkA3Ow}`);
    const data = await response.json();
    if (!data.values || data.values.length < 2) throw new Error('No products found');
    products = data.values.slice(1).map(row => ({
      name: row[0] || '',
      category: row[1] || '',
      price: parseFloat(row[2]) || 0,
      stock: parseInt(row[3]) || 0,
      description: row[4] || ''
    }));
    updateProductSelects();
  } catch (err) {
    console.error('Error fetching products:', err);
    displayBotMessage('אופס, לא הצלחתי לטעון את המוצרים... 😅 ודא שחיבור האינטרנט תקין ונסה שוב.');
  }
}

// עדכון תיבות בחירת מוצרים
function updateProductSelects() {
  try {
    const selects = document.querySelectorAll('.item-name');
    selects.forEach(select => {
      select.innerHTML = '<option value="">בחר מוצר</option>' + products.map(product => 
        `<option value="${product.name}" data-price="${product.price}" data-stock="${product.stock}">${product.name} (${product.stock} במלאי)</option>`
      ).join('');
    });
  } catch (err) {
    console.error('Error updating product selects:', err);
  }
}

// עדכון מחיר פריט
function updateItemPrice(select) {
  try {
    const row = select.closest('.item-row');
    const priceInput = row.querySelector('.item-price');
    const selectedOption = select.options[select.selectedIndex];
    const price = selectedOption ? selectedOption.getAttribute('data-price') : '';
    priceInput.value = price ? `${price} ש"ח` : '';
  } catch (err) {
    console.error('Error updating item price:', err);
  }
}

// שמירת משתמש
async function saveUser(name, phone) {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'saveUser', data: { name, phone } })
    });
    const result = await response.json();
    if (result.status !== 'הצלחה') throw new Error(result.message);
  } catch (err) {
    console.error('Error saving user:', err);
    displayBotMessage('אופס, לא הצלחתי לשמור את המשתמש... 😅 נסה שוב מאוחר יותר.');
  }
}

// שמירת שיחת צ'אט
async function saveChat(userName, question, answer) {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'saveChat', data: { userName, question, answer } })
    });
    const result = await response.json();
    if (result.status !== 'הצלחה') throw new Error(result.message);
  } catch (err) {
    console.error('Error saving chat:', err);
  }
}

// עדכון סטטיסטיקות
async function updateStats(messageCount, orderCount) {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'updateStats', data: { messageCount, orderCount } })
    });
    const result = await response.json();
    if (result.status !== 'הצלחה') throw new Error(result.message);
  } catch (err) {
    console.error('Error updating stats:', err);
  }
}

// הוספת תוכן למאגר שאלות ותשובות
async function addToResponses(question, answer, keywords = [], synonyms = []) {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'addResponse',
        data: { question, answer, keywords: keywords.join(','), synonyms: synonyms.join(',') }
      })
    });
    const result = await response.json();
    if (result.status !== 'הצלחה') throw new Error(result.message);
    responses.push({ question, answer, keywords, synonyms });
    keywords.push({ label: question, question });
    updateKeywords();
  } catch (err) {
    console.error('Error adding to responses:', err);
  }
}

// שליחת הודעה
async function sendMessage(inputText = null) {
  try {
    const userInput = document.getElementById('userInput');
    const message = inputText || userInput.value.trim();
    if (!message) return;

    displayUserMessage(message);
    userInput.value = '';
    moveStylus();

    if (!userName) {
      userName = message;
      await saveUser(userName, userPhone);
      displayBotMessage(`נעים להכיר, ${userName}! 😎 אני ראמי, הבוט של ח.סבן חומרי בניין!`);
      if (nameData[userName]) {
        const nameInfo = nameData[userName];
        displayBotMessage(`<span class="name-prompt">תרצה שאגלה לך מה אומר השם שלך עד שראמי יענה? 😎</span>`);
        namePrompted = true;
      } else {
        displayBotMessage('איך אפשר לעזור לך היום? 🏗️');
        updateKeywords();
      }
      return;
    }

    if (namePrompted && (message.toLowerCase().includes('כן') || message.toLowerCase().includes('בטח'))) {
      namePrompted = false;
      await handleNamePrediction(userName);
      return;
    }

    showTypingIndicator();
    const response = findResponse(message);
    setTimeout(async () => {
      hideTypingIndicator();
      displayBotMessage(response);
      await saveChat(userName, message, response);
      await updateStats(conversation.length, document.querySelectorAll('.item-row').length);
      if (nameData[userName] && Math.random() < 0.3) {
        displayBotMessage(nameData[userName].quip);
      }
    }, 1000);

  } catch (err) {
    console.error('Error sending message:', err);
    displayBotMessage('אופס, משהו השתבש... 😅 ודא שחיבור האינטרנט תקין ונסה שוב.');
  }
}

// טיפול בחיזוי שם
async function handleNamePrediction(name) {
  try {
    if (name === 'ורד') {
      const motivation = [
        'ורד, את כמו פרח שפורח בכל מצב! 🌹',
        'השם שלך מביא אור לכל מחסן, תמשיכי לזרוח!',
        'ורד, הכוח שלך הוא כמו בלוק – אי אפשר לשבור אותו!',
        'את מלאת אנרגיה, ורד, כמו משאית שדוהרת!',
        'ורד, את השראה לכל מי שפוגש אותך!',
        'החיוך שלך, ורד, שווה יותר מכל הבלוקים במחסן!',
        'ורד, את כמו צבע פרימיום – תמיד מוסיפה סטייל!',
        'השם שלך הוא סמל לחוזק ויופי, תמשיכי כך!',
        'ורד, את תמיד מצליחה להפוך יום קשה לזריחה!',
        'את כמו מלט, ורד – מחברת את כולם!',
        'ורד, יש לך את הכוח לשנות כל סיטואציה!',
        'הלב שלך, ורד, גדול כמו משאית של ח.סבן!',
        'ורד, את תמיד מביאה את האנרגיה הכי טובה!',
        'השם שלך הוא כמו שמש שמאירה את המחסן!',
        'ורד, את כמו כלי עבודה איכותי – תמיד עושה את העבודה!',
        'את מלאת חיים, ורד, כמו גינה פורחת!',
        'ורד, את תמיד יודעת איך להרים את המורל!',
        'הכוח שלך, ורד, הוא כמו מנוף 50 טון!',
        'ורד, את כמו בלוק מושלם – חזקה ויפה!',
        'השם שלך, ורד, הוא סמל להצלחה בכל משימה!'
      ];
      const encouragement = [
        'ורד, בעבודה את תמיד תזרחי כמו כוכב! 🌟',
        'הילדים שלך בטח גאים בך, ורד, את אמא מדהימה!',
        'ורד, תמשיכי לנהל את הכל כמו בוסית במחסן!',
        'את תמיד תמצאי דרך, ורד, גם ביום הכי עמוס!',
        'ורד, הילדים שלך ילמדו ממך איך להיות חזקים!',
        'בעבודה, ורד, את כמו מלגזה – תמיד דוחפת קדימה!',
        'ורד, את מנהלת את הבית כמו שראמי מנהל את המחסן!',
        'תמשיכי להיות מדהימה, ורד, בעבודה ובבית!',
        'ורד, את כמו צבע שמחזיק שנים – תמיד מושלמת!',
        'הילדים שלך, ורד, בטח יודעים שיש להם אמא תותחית!'
      ];
      const prediction = `ורד, השם שלך זורח כמו פרח! 🌹 תרצי לדעת מה צפוי לך? וואו, יש כל כך הרבה להרחיב! אני חוזה שתמשיכי להפיץ אור בכל מקום, וראמי בטוח יסכים! 😎`;
      displayBotMessage(prediction);
      for (const msg of [...motivation, ...encouragement]) {
        await addToResponses(`מוטיבציה לורד`, msg, ['ורד', 'מוטיבציה'], ['חיזוי', 'עידוד']);
      }
    } else if (nameData[name]) {
      const { traits, ramiThought, quip } = nameData[name];
      displayBotMessage(`וואו, ${name}! השם שלך אומר: ${traits} 😎 ראמי חושב: "${ramiThought}"`);
      displayBotMessage(quip);
      await addToResponses(`חיזוי ל-${name}`, `${traits} | ${ramiThought} | ${quip}`, [name, 'חיזוי'], ['שם', 'ראמי']);
    } else {
      displayBotMessage(`השם ${name} ממש מגניב! 😎 אני חוזה שתהיה כוכב במחסן, וראמי בטח מסכים!`);
      await addToResponses(`חיזוי ל-${name}`, `כוכב במחסן!`, [name, 'חיזוי'], ['שם', 'ראמי']);
    }
  } catch (err) {
    console.error('Error handling name prediction:', err);
    displayBotMessage('אופס, החיזוי התבלבל קצת... 😅 נסה שוב!');
  }
}

// מציאת תשובה
function findResponse(message) {
  try {
    const messageLower = message.toLowerCase();
    for (const response of responses) {
      const keywords = response.keywords.map(k => k.toLowerCase());
      const synonyms = response.synonyms.map(s => s.toLowerCase());
      if (keywords.some(k => messageLower.includes(k)) || 
          synonyms.some(s => messageLower.includes(s)) ||
          messageLower.includes(response.question.toLowerCase())) {
        return response.answer;
      }
    }
    return 'לא הבנתי את השאלה... 🤔 נסה מילות מפתח כמו "בלוקים", "צבעים", או "הזמנה"!';
  } catch (err) {
    console.error('Error finding response:', err);
    return 'אופס, משהו השתבש... 😅 נסה שוב!';
  }
}

// הצגת הודעת משתמש
function displayUserMessage(message) {
  try {
    const chatBody = document.getElementById('chatBody');
    if (!chatBody) throw new Error('Chat body not found');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `${message}<span class="message-time">${getCurrentTime()}</span>`;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    conversation.push({ type: 'user', text: message });
  } catch (err) {
    console.error('Error displaying user message:', err);
  }
}

// הצגת הודעת בוט
function displayBotMessage(message) {
  try {
    const chatBody = document.getElementById('chatBody');
    if (!chatBody) throw new Error('Chat body not found');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message bot-message ${message.includes('תרצה שאגלה') ? 'name-prompt' : ''}`;
    messageDiv.innerHTML = `${message}<span class="message-time">${getCurrentTime()}</span>`;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    conversation.push({ type: 'bot', text: message });
  } catch (err) {
    console.error('Error displaying bot message:', err);
  }
}

// הצגת מחוון הקלדה
function showTypingIndicator() {
  try {
    const chatBody = document.getElementById('chatBody');
    if (!chatBody) throw new Error('Chat body not found');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  } catch (err) {
    console.error('Error showing typing indicator:', err);
  }
}

// הסתרת מחוון הקלדה
function hideTypingIndicator() {
  try {
    const typingDiv = document.querySelector('.typing');
    if (typingDiv) typingDiv.remove();
  } catch (err) {
    console.error('Error hiding typing indicator:', err);
  }
}

// זמן נוכחי
function getCurrentTime() {
  return new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
}

// עדכון כפתורי מילות מפתח
function updateKeywords() {
  try {
    const keywordsContainer = document.getElementById('keywordsContainer');
    if (!keywordsContainer) throw new Error('Keywords container not found');
    keywordsContainer.innerHTML = '';
    const currentKeywords = userName ? keywords : [{ label: 'התחל שיחה', question: 'היי' }];
    currentKeywords.forEach((keyword, index) => {
      const btn = document.createElement('button');
      btn.className = 'keyword-btn';
      btn.style.transform = `rotate(${index * (360 / currentKeywords.length)}deg) translateX(200px) rotate(-${index * (360 / currentKeywords.length)}deg)`;
      btn.style.animationDelay = `${index * 0.2}s`;
      btn.textContent = keyword.label;
      btn.onclick = () => {
        sendMessage(keyword.question);
        btn.style.animation = 'throwEffect 0.5s ease forwards';
        setTimeout(() => updateKeywords(), 500);
        displayBotMessage('וואו, הכפתור זרח כמו הבלוקים של ראמי! ✨');
      };
      keywordsContainer.appendChild(btn);
    });
  } catch (err) {
    console.error('Error updating keywords:', err);
  }
}

// החלפת מסך מלא
function toggleFullscreen() {
  try {
    const phoneFrame = document.getElementById('phoneFrame');
    phoneFrame.classList.toggle('fullscreen');
    document.querySelector('.fullscreen-btn').textContent = phoneFrame.classList.contains('fullscreen') ? '🔳' : '🔲';
  } catch (err) {
    console.error('Error toggling fullscreen:', err);
  }
}

// תפריט קבצים מצורפים
function toggleAttachMenu() {
  try {
    const menu = document.getElementById('attachMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  } catch (err) {
    console.error('Error toggling attach menu:', err);
  }
}

// הצגת מקלדת וירטואלית
function showKeyboard() {
  try {
    const keyboard = document.getElementById('virtualKeyboard');
    keyboard.style.display = 'flex';
  } catch (err) {
    console.error('Error showing keyboard:', err);
  }
}

// סגירת מקלדת וירטואלית
function closeKeyboard() {
  try {
    const keyboard = document.getElementById('virtualKeyboard');
    keyboard.style.display = 'none';
  } catch (err) {
    console.error('Error closing keyboard:', err);
  }
}

// הקלדת תו
function typeKey(char) {
  try {
    const userInput = document.getElementById('userInput');
    userInput.value += char;
    moveStylus();
  } catch (err) {
    console.error('Error typing key:', err);
  }
}

// תנועת עט
function moveStylus() {
  try {
    const stylus = document.getElementById('stylus');
    const userInput = document.getElementById('userInput');
    if (userInput.value.trim()) {
      stylus.classList.add('typing');
    } else {
      stylus.classList.remove('typing');
    }
  } catch (err) {
    console.error('Error moving stylus:', err);
  }
}

// העלאת קובץ
function uploadFile() {
  try {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      displayBotMessage(`קובץ "${file.name}" נשלח! 📄`);
    };
    reader.readAsDataURL(file);
  } catch (err) {
    console.error('Error uploading file:', err);
    displayBotMessage('אופס, לא הצלחתי לעלות את הקובץ... 😅');
  }
}

// שיתוף מיקום
function shareLocation() {
  try {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        displayBotMessage(`מיקום משותף: ${latitude}, ${longitude} 📍`);
      }, () => {
        displayBotMessage('לא הצלחתי לקבל את המיקום... 😔 ודא שהרשאות המיקום מופעלות.');
      });
    } else {
      displayBotMessage('שיתוף מיקום לא נתמך בדפדפן זה... 😔');
    }
  } catch (err) {
    console.error('Error sharing location:', err);
  }
}

// יצירת אירוע בלוח שנה
function addToCalendar() {
  try {
    displayBotMessage('אירוע נוסף ללוח השנה שלך! 📅');
  } catch (err) {
    console.error('Error adding to calendar:', err);
  }
}

// פתיחת טופס הזמנה
function openOrderPopup() {
  try {
    document.getElementById('orderPopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
  } catch (err) {
    console.error('Error opening order popup:', err);
  }
}

// סגירת טופס הזמנה
function closeOrderPopup() {
  try {
    document.getElementById('orderPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  } catch (err) {
    console.error('Error closing order popup:', err);
  }
}

// הוספת שורת פריט
function addItemRow() {
  try {
    const tableBody = document.getElementById('itemsTableBody');
    const row = document.createElement('tr');
    row.className = 'item-row';
    row.innerHTML = `
      <td><select class="item-name" onchange="updateItemPrice(this)"></select></td>
      <td><input type="number" class="item-quantity" min="1" placeholder="כמות"></td>
      <td><input type="text" class="item-price" readonly></td>
      <td><button class="remove-item" onclick="removeItemRow(this)">×</button></td>
    `;
    tableBody.appendChild(row);
    updateProductSelects();
  } catch (err) {
    console.error('Error adding item row:', err);
  }
}

// הסרת שורת פריט
function removeItemRow(button) {
  try {
    button.closest('.item-row').remove();
  } catch (err) {
    console.error('Error removing item row:', err);
  }
}

// שליחת הזמנה
async function submitOrder() {
  try {
    const customer = document.getElementById('orderCustomer').value;
    const contact = document.getElementById('orderContact').value;
    const phone = document.getElementById('orderPhone').value;
    const crane = document.getElementById('orderCrane').value;
    const street = document.getElementById('orderStreet').value;
    const city = document.getElementById('orderCity').value;
    const container = document.getElementById('orderContainer').value;

    const items = Array.from(document.querySelectorAll('.item-row')).map(row => ({
      name: row.querySelector('.item-name').value,
      quantity: parseInt(row.querySelector('.item-quantity').value) || 1
    }));

    if (!customer || !contact || !phone || !items.every(item => item.name && item.quantity)) {
      displayBotMessage('אנא מלא את כל השדות בטופס ההזמנה! 📋');
      return;
    }

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'saveOrder', data: { customer, contact, phone, crane, street, city, container, items } })
    });
    const result = await response.json();
    if (result.status !== 'הצלחה') throw new Error(result.message);

    displayBotMessage(`ההזמנה נשלחה בהצלחה, ${customer}! 🚛 תודה שקנית אצל ראמי!`);
    closeOrderPopup();
    await updateStats(conversation.length, document.querySelectorAll('.item-row').length);
  } catch (err) {
    console.error('Error submitting order:', err);
    displayBotMessage('אופס, לא הצלחתי לשלוח את ההזמנה... 😅 ודא שחיבור האינטרנט תקין ונסה שוב.');
  }
}

// הצגת עלות מכולה
function showContainerCost() {
  try {
    const container = document.getElementById('orderContainer').value;
    const costNote = document.getElementById('containerCost');
    costNote.style.display = container !== 'ללא' ? 'block' : 'none';
  } catch (err) {
    console.error('Error showing container cost:', err);
  }
}

// פתיחת חלונית "איך אני עובד"
function openHowToPopup() {
  try {
    document.getElementById('howToPopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
  } catch (err) {
    console.error('Error opening how-to popup:', err);
  }
}

// סגירת חלונית "איך אני עובד"
function closeHowToPopup() {
  try {
    document.getElementById('howToPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  } catch (err) {
    console.error('Error closing how-to popup:', err);
  }
}

// טעינת הדף
window.onload = () => {
  try {
    preloadImages();
    fetchResponses();
    fetchProducts();
    updateKeywords();
    displayBotMessage('<span class="welcome-message">ברוך הבא לח.סבן חומרי בניין, התלמיד 6, הוד השרון! 🏗️ איך קוראים לך? 😎</span>');
    setTimeout(() => {
      const input = document.getElementById('userInput');
      if (input) {
        input.classList.add('guide');
        setTimeout(() => input.classList.remove('guide'), 6000);
      }
    }, 2000);
  } catch (err) {
    console.error('Error on load:', err);
    displayBotMessage('אופס, משהו השתבש בטעינת הדף... 😅 ודא שחיבור האינטרנט תקין ונסה שוב.');
  }
};
