var UPLOAD_URL = 'https://script.google.com/macros/s/AKfycbxOyIt-uhgPdI1TiaPY3HVMkE9B8OTm1pquMG-EdVwcKDdD2OuQ9zPr6Ng9h-ylUy_guQ/exec';


var isSuccessful = true;

const form = document.getElementById("uploadForm");
const status = document.getElementById("status");
let name = "";
let email = "";
let productType = "";
let themeType = '';
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  name = form.name.value.trim();
  email = form.email.value.trim();
  productType = form.productType.value;
  themeType = form.themeType.value;
  const fileInput = form.file;

  if (!fileInput.files.length) {
    alert("Please choose a file.");
    isSuccessful=false
    return;
  }
  
  const file = fileInput.files[0];
  
  // 100 MB limit
  const MAX_SIZE = 100 * 1024 * 1024;
  
  if (file.size > MAX_SIZE) {
    alert("Your current file size is too large. Max allowed size is 100 MB.");
    isSuccessful=false
    return;
  }

  const reader = new FileReader();
  reader.onload = async () => {
    const base64 = reader.result.split(',')[1];

    const payload = new URLSearchParams();
    payload.append("name", name);
    payload.append("email", email);
    payload.append("chatType", productType);
    payload.append("fileContent", base64);
    payload.append("mimeType", file.type);
    payload.append("originalFileName", file.name);

    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbwXlbdtL5UTmjzw39fgJPljAHvY-8ugtpjXf2gZdqQyto1VN4ypZjdBFg6JXH5fYDOJHA/exec", {
        method: "POST",
        body: payload
      });

      const result = await res.json();
      if (result.success) {
        // status.textContent = "✅ File uploaded: " + result.fileUrl;
      } else {
        // status.textContent = "❌ Error: " + result.error;
      }
    } catch (err) {
      status.textContent = "❌ Fetch failed: " + err.toString();
    }
  };

  reader.readAsDataURL(file);
});




document.addEventListener('DOMContentLoaded', function () {
  const uploadForm = document.getElementById('uploadForm');
  const fileInput = document.querySelector('input[type="file"]');
  const statusElement = document.getElementById('status');

  // Update file name display when file is selected
  fileInput.addEventListener('change', function () {
    const fileName = this.files[0] ? this.files[0].name : 'No file selected';
    const fileNameElement = document.querySelector('.file-name');
    if (fileNameElement) {
      fileNameElement.textContent = fileName;
    }
  });

  // Form submission handler
  uploadForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Display loading state
    statusElement.innerHTML = '<div class="loading-spinner"></div> Uploading your chat...';
    
    // Simulate form submission (replace with actual form submission)
    if (isSuccessful){
    setTimeout(function () {
      // Hide the form
      uploadForm.style.display = 'none';
      document.querySelector('.upload-container h2').style.display = 'none';
      document.querySelector('.upload-container > p').style.display = 'none';


      const message = `📥 New File Uploaded!\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Product Type: ${productType} in ${themeType} theme`;
      sendDeatilsToTelegram(message);
      
      // Show thank you message
      statusElement.innerHTML = `
                  <div class="thank-you-message active">
                      <div class="icon">
                          <i class="fas fa-heart"></i>
                      </div>
                      <h3>Thank You!</h3>
                      <p>Your chat data has been submitted successfully. Leave the rest to us - we'll create a beautiful love chart that captures your special moments.</p>
                      <p>We'll send you an update via email once your design is ready.</p>
                      <a href="index.html" class="home-button">Back to Home</a>
                  </div>
              `;
            }, 2000);
          }
  });
});




function sendDeatilsToTelegram(message) {
  // Function to send a Telegram message
  sendTelegramMessage(message)
  async function sendTelegramMessage(message) {
      const url = `https://api.telegram.org/bot8113534372:AAF2DahT2CQYToSvG7Z_VMZ_-0BmweybX5I/sendMessage`;
      try {
          // Send the message to the Telegram bot
          await fetch(url, {
              method: "POST",
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
              },
              body: `chat_id=1293804795&text=${encodeURIComponent(message)}`,
          });
      } catch (error) {
        alert("Error sending your message, please try again later")
          console.error("Error sending message", error);
      }
  }
}












function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
      window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth'
      });
  }
}


function specialGoTo(id) {
  sessionStorage.setItem('scrollToSection', id);
  window.location.href = '../index.html';  // or wherever the target file is
}