let loading = false;

const chatbotPopup = document.getElementsByClassName('chatbot-popup')[0];
const closeBtn = document.getElementById('closeBtn');
const sendButton = document.getElementById('sendButton');
const chatbotIcon = document.getElementById('chatbot-icon');
const userInput = document.getElementById('userInput');

// Show chatbot when icon is clicked
chatbotIcon.addEventListener('click', function () {
    chatbotPopup.style.display = 'block';
    document.addEventListener('click', outsideClickListener);
});

// Close chatbot
closeBtn.addEventListener('click', function () {
    chatbotPopup.style.display = 'none';
    document.removeEventListener('click', outsideClickListener);
});

// Close if clicked outside chatbot
function outsideClickListener(e) {
    if (!chatbotPopup.contains(e.target) && e.target !== chatbotIcon) {
        chatbotPopup.style.display = 'none';
        document.removeEventListener('click', outsideClickListener);
    }
}

// Send message on button click or enter key
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
        e.preventDefault();
    }
});

// Send Message Handler
async function sendMessage() {
    if (loading) return; // Prevent multiple simultaneous sends

    const input = userInput.value.trim();
    if (input === '') return;

    displayMessage(input, 'user');
    userInput.value = '';
    showLoadingAnimation();

    const response = await getBotResponse(input);
    removeLoadingAnimation();
    displayMessage(response, 'bot');
}

// Get response from Gemini backend
async function getBotResponse(input) {
    loading = true;
    try {
        const res = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input }),
        });

        const data = await res.json();
        return data.response || "Sorry, I couldn't process that.";
    } catch (err) {
        return "Oops! Something went wrong with NovaGuide.";
    } finally {
        loading = false;
    }
}

// Display message in chat
function displayMessage(message, sender) {
    const chatBox = document.querySelector('.messages');
    const messageElement = document.createElement('p');
    messageElement.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;

    
    // Scroll to bottom using anchor
    const scrollAnchor = document.getElementById('chat-end');
    scrollAnchor.scrollIntoView({ behavior: "smooth" });

}

// Show loading animation
function showLoadingAnimation() {
    const chatBox = document.querySelector('.messages');
    const loadingElem = document.createElement('div');
    loadingElem.classList.add('loading-animation');
    loadingElem.setAttribute('id', 'loading');

    loadingElem.innerHTML = `
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    `;

    chatBox.appendChild(loadingElem);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Remove loading animation
function removeLoadingAnimation() {
    const loadingElem = document.getElementById('loading');
    if (loadingElem) loadingElem.remove();
}
