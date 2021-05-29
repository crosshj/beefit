/*
https://stackoverflow.com/questions/42256877/how-to-create-chat-bubbles-like-facebook-messenger
https://stackoverflow.com/questions/12297600/how-to-remove-default-chrome-style-for-select-input
https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
https://stackoverflow.com/questions/16670931/hide-scroll-bar-but-while-still-being-able-to-scroll
https://www.w3schools.com/jsref/met_win_cleartimeout.asp
https://stackoverflow.com/questions/7687597/using-last-child-with-class-selector
https://www.codegrepper.com/code-examples/javascript/javascript+scroll+to+bottom+of+div
https://goquotes.docs.apiary.io/#reference/list-all-datas/apiv1allquotes
https://dmitripavlutin.com/javascript-fetch-async-await/
*/

const wakeupBotMessage="Good Morning, Sunshine!"
const sleepBotMessage="Okay! Have a good night! Hope you sleep well! ZzzZzz...";
const waterBotMessage = (count) => {
	if(count<4)
		return 'Oh nooo. Please drink more to stay healthy!';
	if(count<8)
		return "That's better! You're almost there!"
	return `That's great! ${count} glasses! Congratulations!!! You have consumed 8 glasses of water today! Please come back again tomorrow!`
}
console.log(`THE CHAT MODE IS: ${window.chatMode||'default'}`)

const chatHistory = document.querySelector(".chat-history");
function addToChatHistory(msg, sender){
	const lastChat = chatHistory.querySelector('li:last-child');
	if(sender === 'bot' && lastChat.classList.contains('me')){
		lastChat.classList.add('curved');
	}
	const newChat = document.createElement('li');
	newChat.className = sender;
	newChat.textContent = msg;
	chatHistory.append(newChat);
	chatHistory.scrollTop = chatHistory.scrollHeight;
}

async function quote(){
	const quotesUrl = 'https://goquotes-api.herokuapp.com/api/v1/random?count=1';
	const { quotes } = await (await fetch(quotesUrl)).json();
	return `${quotes[0].text}\n\n-- ${quotes[0].author}`;
}

function handleSleep(question){
	if(question==="sleep:wakeup"){
		addToChatHistory("I just woke up!", 'me');
		//TODO: Send wake time to server
		setTimeout(() => { 
			addToChatHistory(wakeupBotMessage, 'bot');
		}, 1000);
	}
	if(question==="sleep:sleep"){
		addToChatHistory("I'm going to sleep!", 'me');
		//TODO: Send sleep time to server
		setTimeout(() => { 
			addToChatHistory(sleepBotMessage, 'bot');
		}, 1000);
	}
}

function handleWater(question){
	const [,glasses]=question.split(':')
	addToChatHistory("I drink "+glasses, 'me');
	setTimeout(() => { 
		addToChatHistory(waterBotMessage(glasses), 'bot');
	}, 1000);
}

let timer;
async function askBot(question){
	if(question.includes('sleep:'))return handleSleep(question)
	if(question.includes('water:'))return handleWater(question)
	const botMsg = `I don't know the answer...`;
	const motivational = question.toLowerCase().includes('quote') && await quote();
	if(timer) clearTimeout(timer);
	timer = setTimeout(() => {
		addToChatHistory(motivational || botMsg, 'bot');
	}, 2000);
}

const input = document.querySelector(".input-box");
input && input.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		addToChatHistory(input.value, 'me');
		askBot(input.value);
		input.value = '';
	}
});

//input.focus();
