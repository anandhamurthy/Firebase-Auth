var firebaseConfig = {
	apiKey: "AIzaSyCSS2JWgbpYcxuGdU6CshGR2tID0KmrK-w",
	authDomain: "amstatbot-40341.firebaseapp.com",
	databaseURL: "https://amstatbot-40341.firebaseio.com",
	projectId: "amstatbot-40341",
	storageBucket: "amstatbot-40341.appspot.com",
	messagingSenderId: "454296005924",
	appId: "1:454296005924:web:c2436c65ff45efd760d7b1",
	measurementId: "G-HKN4L0EWV4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let chatDatabaseReference = firebase.database().ref();

let listgrp = document.getElementById("lstgrp");
let message_box = document.getElementById("message");

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		let userId = user.uid;

		var fb_ref = firebase.database().ref().child("chats").child(userId);
		fb_ref.on("child_added", (snap) => {
			if (snap.exists()) {
				console.log(snap.val());
				element = snap.val();
				if (element.id == 1) {
					listgrp.innerHTML += `<div class="chat-item-right">
					<p class="message">${element.message}</p>
					<p class="time">${element.time}</p>
				</div>`;
				} else {
					if (element.type == "stock") {
						let close = element.close;
						let percent = element.percent;
						let high = element.high;
						let low = element.low;
						let open = element.open;
						let volume = element.volume;

						listgrp.innerHTML += `<div class="chat-item-stock-right">
				<div class="stock-head">
					<div class="stock-name-sym">
						<p class="stock-name">${element.name}</p>
						<p class="stock-sym">(${element.symbol})</p>
					</div>
				</div>
				<hr />
				<div class="stock-body-one">
					<div class="stock-item">
						<img src="img/close.png" alt="" width="30" />
						<p>Close</p>
						<p>${close.toFixed(2)}</p>
					</div>

					<div class="stock-item">
						<img src="img/percent_negative.png" alt="" width="30" />
						<p>Percentage</p>
						<p>${percent.toFixed(2)}</p>
					</div>

					<div class="stock-item">
						<img src="img/high.png" alt="" width="30" />
						<p>High</p>
						<p>${high.toFixed(2)}</p>
					</div>
				</div>
				<div class="stock-body-two">
					<div class="stock-item">
						<img src="img/low.png" alt="" width="30" />
						<p>Low</p>
						<p>${low.toFixed(2)}</p>
					</div>

					<div class="stock-item">
						<img src="img/open.png" alt="" width="30" />
						<p>Open</p>
						<p>${open.toFixed(2)}</p>
					</div>

					<div class="stock-item">
						<img src="img/volume.png" alt="" width="30" />
						<p>Volume</p>
						<p>${volume.toFixed(2)}</p>
					</div>
				</div>
				<hr />
				<div class="stock-tail">
					<p class="time">${element.time}</p>
				</div>
			</div>`;
					} else if (element.type == "loading") {
						listgrp.innerHTML += `<div class="chat-loading">
				<div class="dot-typing"></div>
			</div>`;
					} else {
						listgrp.innerHTML += `<div class="chat-item-left">
					<p class="message">${element.message}</p>
					<p class="time">${element.time}</p>
				</div>`;
					}
				}
			} else {
				console.log("No data available");
			}
		});
	} else {
		window.location = "login.html";
		console.log("no user");
	}
});

function logout() {
	firebase
		.auth()
		.signOut()
		.then(() => {
			console.log("logged out");
			window.location = "login.html";
		})
		.catch((error) => {
			// An error happened.
		});
}

function getMessage() {
	let mes = message_box.value;
	if (mes != "") {
		const Http = new XMLHttpRequest();
		let url = "https://amstatbot.herokuapp.com/predict/" + mes;
		console.log(url);
		console.log(mes);
		Http.open("GET", url);
		Http.send();

		Http.onreadystatechange = (e) => {
			console.log(Http.responseText);
		};
	} else {
		alert("Ask Bot Something!");
	}
}
