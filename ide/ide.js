import {setResult, setSubmitted, setCorrect} from "../gamescreen/process.js"

ace.require("ace/ext/language_tools");
let editor = ace.edit("editor");
editor.setTheme("ace/theme/cobalt");
editor.session.setMode("ace/mode/javascript");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
});


let defaultCode = 
`// Write a function to split the passcodes into 4 equal parts,
// and return an array of splitted strings.
// e.g. passcodes = "4qj9fi0xwir3";
// splitedPasscodes = ["4qj", "9fi", "0xw", "ir3"];

// It is guaranteed that the length of 
// variable "passcodes" is 12.
// The passcodes won't contain spaces.

function splitPasscodes(passcodes) {
    let passcodeArr = [];
    let passcodeChunk = "";
    for (let i = 0; i < passcodes.length; i++) {
        passcodeChunk += passcodes[i];
        if (i % 3 == 2) {
            passcodeArr.push(passcodeChunk);
            passcodeChunk = "";
        }
    }

    return passcodeArr;
}
`

editor.session.setValue(defaultCode);

let submitButton = document.getElementById("submit");
let resetButton = document.getElementById("reset")

let skeletonAfter = 
`
let passcodesBefore = "dQw4w9WgXcQ0";
let passcodesAfter = splitPasscodes(passcodesBefore);
passcodesAfter;
`

function testSame(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

submitButton.addEventListener('click', function() {
    let code = editor.getValue();
    try {
        let arrResult = eval(code + skeletonAfter);
        if (!Array.isArray(arrResult)) {
            throw new Error("Function did not return an array.");
        }
        let correctResult = ["dQw","4w9","WgX","cQ0"];
        setResult(arrResult);
        setSubmitted(true);
        setCorrect(testSame(arrResult, correctResult));
        document.getElementById("alertSuccess").style.display = "none";
        document.getElementById("alertFail").style.display = "none";
        document.getElementById("alertProblem").style.display = "none";
    } catch (err) {
        console.error(err);
        document.getElementById("alertSuccess").style.display = "none";
        document.getElementById("alertFail").style.display = "none";
        document.getElementById("alertProblem").style.display = "block";
    }
}, false);

resetButton.addEventListener('click', function() {
    try {
        editor.session.setValue(defaultCode);
    } catch (error) {
        console.log(error);
    }
}, false);