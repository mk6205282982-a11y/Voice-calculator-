let display = document.getElementById("display");


let voiceText = document.getElementById("voiceText");


let statusText = document.getElementById("status");


let language = document.getElementById("language");


let recognition;




/* =========================
   NORMAL CALCULATOR
========================= */


function addValue(value) {


    display.value += value;


}




function clearDisplay() {


    display.value = "";


    voiceText.innerText = "Say something...";


}




function deleteLast() {


    display.value =
        display.value.slice(0, -1);


}




function percentage() {


    if (display.value !== "") {


        try {


            display.value =
                eval(display.value) / 100;


        } catch {


            display.value = "Error";


        }


    }


}




function calculate() {


    try {


        let expression = display.value;


        if (!expression) return;


        let result = eval(expression);


        display.value = result;


        speak(
            "The answer is " + result
        );


    } catch {


        display.value = "Error";


        speak("Invalid calculation");


    }


}




/* =========================
   SCIENTIFIC FUNCTIONS
========================= */


function getNumber() {


    return Number(display.value);


}




function square() {


    let number = getNumber();


    if (!isNaN(number)) {


        display.value =
            number * number;


    }


}




function squareRoot() {


    let number = getNumber();


    if (!isNaN(number)) {


        display.value =
            Math.sqrt(number);


    }


}




function sin() {


    let number = getNumber();


    display.value =
        Math.sin(number * Math.PI / 180);


}




function cos() {


    let number = getNumber();


    display.value =
        Math.cos(number * Math.PI / 180);


}




function tan() {


    let number = getNumber();


    display.value =
        Math.tan(number * Math.PI / 180);


}




/* =========================
   VOICE RECOGNITION
========================= */


function startVoice() {


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {


        alert(
            "Speech Recognition is not supported. Please use Google Chrome."
        );


        return;
    }


    recognition =
        new SpeechRecognition();


    recognition.lang =
        language.value;


    recognition.continuous = false;


    recognition.interimResults = false;


    recognition.maxAlternatives = 1;




    statusText.innerText =
        "🎙️ Listening...";


    voiceText.innerText =
        "Speak now...";




    recognition.start();




    recognition.onresult =
        function(event) {


            let text =
                event.results[0][0].transcript;


            voiceText.innerText =
                "You said: " + text;


            statusText.innerText =
                "Voice received";


            processVoiceCommand(text);


        };




    recognition.onerror =
        function(event) {


            console.log(event.error);


            statusText.innerText =
                "Microphone error: " +
                event.error;


            speak(
                "Microphone error"
            );


        };




    recognition.onend =
        function() {


            if (
                statusText.innerText ===
                "🎙️ Listening..."
            ) {


                statusText.innerText =
                    "Ready";


            }


        };


}




/* =========================
   VOICE COMMAND PROCESSING
========================= */


function processVoiceCommand(text) {


    let command =
        text.toLowerCase().trim();




    /*
       Hindi numbers/operators
    */


    command = command
        .replaceAll("जोड़", "+")
        .replaceAll("जोड़ो", "+")
        .replaceAll("प्लस", "+")
        .replaceAll("घटा", "-")
        .replaceAll("घटाओ", "-")
        .replaceAll("माइनस", "-")
        .replaceAll("गुणा", "*")
        .replaceAll("गुणा करो", "*")
        .replaceAll("मल्टीप्लाई", "*")
        .replaceAll("भाग", "/")
        .replaceAll("भाग करो", "/")
        .replaceAll("डिवाइड", "/")
        .replaceAll("बराबर", "")
        .replaceAll("का उत्तर", "");




    /*
       English
    */


    command = command
        .replaceAll("plus", "+")
        .replaceAll("add", "+")
        .replaceAll("minus", "-")
        .replaceAll("subtract", "-")
        .replaceAll("multiply", "*")
        .replaceAll("multiplied by", "*")
        .replaceAll("times", "*")
        .replaceAll("divide", "/")
        .replaceAll("divided by", "/")
        .replaceAll("equals", "")
        .replaceAll("calculate", "")
        .replaceAll("what is", "");




    /*
       Hindi number words
    */


    const hindiNumbers = {


        "शून्य": "0",
        "एक": "1",
        "दो": "2",
        "तीन": "3",
        "चार": "4",
        "पाँच": "5",
        "पांच": "5",
        "छह": "6",
        "छः": "6",
        "सात": "7",
        "आठ": "8",
        "नौ": "9",
        "दस": "10",


        "ग्यारह": "11",
        "बारह": "12",
        "तेरह": "13",
        "चौदह": "14",
        "पंद्रह": "15",
        "सोलह": "16",
        "सत्रह": "17",
        "अठारह": "18",
        "उन्नीस": "19",
        "बीस": "20"


    };




    for (
        let word in hindiNumbers
    ) {


        command =
            command.replaceAll(
                word,
                hindiNumbers[word]
            );


    }




    /*
       English number words
    */


    const englishNumbers = {


        "zero": "0",
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9",
        "ten": "10",


        "eleven": "11",
        "twelve": "12",
        "thirteen": "13",
        "fourteen": "14",
        "fifteen": "15",
        "sixteen": "16",
        "seventeen": "17",
        "eighteen": "18",
        "nineteen": "19",
        "twenty": "20"


    };




    for (
        let word in englishNumbers
    ) {


        command =
            command.replaceAll(
                word,
                englishNumbers[word]
            );


    }




    /*
       Remove unnecessary words
    */


    command = command
        .replaceAll("what", "")
        .replaceAll("is", "")
        .replaceAll("the", "")
        .replaceAll("answer", "")
        .replaceAll("कितना", "")
        .replaceAll("है", "")
        .replaceAll("बताओ", "");




    /*
       Keep only calculator characters
    */


    let expression =
        command.replace(
            /[^0-9+\-*/().]/g,
            ""
        );




    if (expression.length === 0) {


        statusText.innerText =
            "Could not understand";


        speak(
            "I could not understand the calculation"
        );


        return;
    }




    display.value =
        expression;




    /*
       Automatically calculate
    */


    try {


        let result =
            eval(expression);


        display.value =
            result;


        statusText.innerText =
            "Calculation completed";


        speak(
            "The answer is " +
            result
        );


    } catch {


        statusText.innerText =
            "Invalid expression";


        speak(
            "I could not calculate that"
        );


    }


}




/* =========================
   TEXT TO SPEECH
========================= */


function speak(text) {


    if (!("speechSynthesis" in window)) {


        return;


    }




    window.speechSynthesis.cancel();




    let speech =
        new SpeechSynthesisUtterance(text);




    speech.lang =
        language.value;




    speech.rate = 0.9;


    speech.pitch = 1;




    window.speechSynthesis.speak(
        speech
    );


}




/* =========================
   SPEAK RESULT
========================= */


function speakResult() {


    if (!display.value) {


        speak(
            language.value === "hi-IN"
                ? "कृपया पहले गणना करें"
                : "Please calculate first"
        );


        return;


    }




    if (language.value === "hi-IN") {


        speak(
            "उत्तर है " +
            display.value
        );


    } else {


        speak(
            "The answer is " +
            display.value
        );


    }


}




/* =========================
   KEYBOARD SUPPORT
========================= */


document.addEventListener(
    "keydown",
    function(event) {


        let key =
            event.key;




        if (
            /[0-9+\-*/.]/.test(key)
        ) {


            addValue(key);


        }




        if (key === "Enter") {


            calculate();


        }




        if (key === "Backspace") {


            deleteLast();


        }




        if (key === "Escape") {


            clearDisplay();


        }


    }
);