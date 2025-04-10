let socket;
let username = '';

const startBtn = document.getElementById('startBtn');
const usernameInput = document.getElementById('usernameInput');
const chatSection = document.getElementById('chatSection');
const messagesDiv = document.getElementById('messages');
const input = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

startBtn.onclick = () => {
    const enteredName = usernameInput.value.trim();
    if (enteredName !== '') {
        username = enteredName;
        document.getElementById('usernameContainer').style.display = 'none';
        chatSection.style.display = 'block';
        startSocket();
    }
};

function startSocket() {
    socket = new WebSocket(`ws://${window.location.host}`);

    socket.onmessage = async function (event) {
        const data = await event.data.text();
        const message = document.createElement('div');
        message.textContent = data;
        messagesDiv.appendChild(message);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    };

    sendBtn.onclick = () => {
        const message = input.value.trim();
        if (message !== '') {
            const timestamp = new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

            const messageData = `[${timestamp}] ${username}: ${message}`;
            socket.send(messageData);
            input.value = '';
        }
    };
}
