console.log("clientSideScript kører")

function editLine(idName, number) {//changePTagToInput
	//if (!(userIsEditingAnElement))  // if betingelsen er for at brugeren kun kan redigere en ting ad gangen
	{
		let HTMLTekst = "";


		HTMLTekst += "<input id=\"input\" size=\"15\" type=\"text\" value=\"" + idName.children[0].innerHTML + "\">"; // value skulle være indholdet fra p tagget

		HTMLTekst += "<button onclick=\"saveChanges()\">Save(under development)</button>";


		console.log("idName.innerHTML: " + idName.innerHTML);
		console.log("idName.outerHTML: " + idName.outerHTML);
		console.log("idName.id: " + idName.id);
		console.log("idName p taggets indhold: " + idName.children[0].innerHTML);
		console.log("number: " + number);

		// Hvorfor er idName: [object HTMLDivElement]??? Det burde da bare være en string
		// Det er som om at den i clientSide funktionen her har sat idName = document.getElementById(idName), men hvorfor??
		// funktionen kaldes i hvert fald med hele div objektet

		//document.getElementById(idName).innerHTML = "TEST"; //HTMLTekst;
		idName.innerHTML = HTMLTekst;

		//document.getElementById("inputTd").click(); // cursor i starten af teksten
		//	document.getElementById("inputTd").focus();
		//	document.getElementById("inputTd").select();



	}
	//		userIsEditingAnElement = true;

}



function saveChanges() {
	let data = document.getElementById("input").value;
	console.log("data: " + data);
	window.location.assign("./?data=" + data); // ikke optimalt, jeg skal bruge noget der sender mig til post i app.js

	// værdien skal sendes til backend og tages i mod med en post
	// værdien skal sættes ind i allTopicsValueList eller endnu bedre sættes ind i allTopics
	// evt lav en ny allTopics ud fra allTopicsValueList og id'erne i i denne, som skal bruges som keys
	// der skal laves et nyt json object 
	// json objekt skal udskrives til json filen i public mappen(som overskrives)(brugerne kan på denne måde både rette, men også slette det hele)
}

