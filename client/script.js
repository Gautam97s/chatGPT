import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form'); 
const chatcontainer = document.querySelector('#chat_conatiner');

let loadInterval;

function loader (element){
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.'; 

    if (element.textContent = '....') {
      element.textContent = '';
    }
  }, 300)
}

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if(index < text.length) {
      element.innerHTML += text.chartAt(index);
      index++;
    } else{
      clearInterval(interval);
    }
  }, 20)
}

function generateUniqueId() {
  const timestamp = Date.now();  
  const randomNumber = Math.now();  
  const hexadecimalstring = randomNumber.now();
  
  return  `id-${timestamp}-${hexadecimalstring}`;

}

function chatStripe (isAi, value, uniqueId) {
  return(
    `
      <div class="wrapper ${isAi && 'ai'}">
        <div class="chat">
          <div className="profile">
            <img 
             src="${isAi? bot : user}" 
             alt="${isAi? bot :'user'}"
            />
          </div>  
          <div class="message" id=${uniqueId}>${value}</div>
        </div>
      </div>
    `
  )
}

const handleSubmit = async (e) => {
  e.preventDefault();


const data  = new FormData(form);
// user's chatstripe
chatcontainer.innerHTML += chatStripe(false, data.get('prompt'));

// bot's chatsripe
const uniqueId = generateUniqueId();
chatcontainer.innerHTML += chatStripe(true, " ",uniqueId);

chatcontainer.scrollTop = chatcontainer.scrollHeight;

const messageDiv = document.getElementById(uniqueId);

loader(messageDiv);
}

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13){
    handleSubmit(e);
  }
})

