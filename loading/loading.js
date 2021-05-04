 const progressBar = document.querySelector('.progress')
		function changeProgress(percent){
				progressBar.style.width = `${percent}%`;
		}

		setTimeout(() => {
				changeProgress(50);
		}, 1000);
		setTimeout(() => {
				changeProgress(100);
		}, 2000)
		setTimeout(() => {
				document.location = '../chat/chat.html/::preview::/';
		}, 2500)