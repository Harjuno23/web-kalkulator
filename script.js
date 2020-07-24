const getHistory = () => document.getElementById("history-digit").innerText;

const printHistory = (num) =>
  (document.getElementById("history-digit").innerText = num);

const getOutput = () => document.getElementById("output-digit").innerText;

const printOutput = (num) => {
  if (num == "") {
    document.getElementById("output-digit").innerText = num;
  } else {
    document.getElementById("output-digit").innerText = getNumber(num);
  }
};

const getNumber = (num) => {
  if (num == "-") {
    return "";
  }
  let n = Number(num);
  let value = n.toLocaleString("en");
  return value;
};

const reverseNumber = (num) => Number(num.replace(/,/g, ""));

const operator = document.getElementsByClassName("operator");
for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function () {
    if (this.id == "clear") {
      printHistory("");
      printOutput(0);
    } else if (this.id == "delete") {
      let output = reverseNumber(getOutput()).toString();
      if (output) {
        //if output has a value
        output = output.substr(0, output.length - 1);
        if (output.length === 0) {
          printOutput(0);
        } else {
          printOutput(output);
        }
      }
    } else {
      let output = getOutput();
      let history = getHistory();
      if (output == "" && history != "") {
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }
      if (output != "" || history != "") {
        output = output == "" ? output : reverseNumber(output);
        history = history + output;
        if (this.id == "=") {
          let result = eval(history);
          printOutput(result);
          printHistory("");
        } else {
          history += this.id;
          printHistory(history);
          printOutput("");
        }
      }
    }
  });
}

const number = document.getElementsByClassName("number");
for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function () {
    let output = reverseNumber(getOutput());
    if (output != NaN) {
      //jika output adalah integer
      output += this.id;
      printOutput(output);
    }
  });
}

const percentage = document.getElementById("percent");
percentage.addEventListener("click", () => {
  let output = getOutput();
  printOutput(output / 100);
});

const negatives = document.getElementById("negative");
negatives.addEventListener("click", () => {
  let output = getOutput();
  printOutput(output * -1);
});
