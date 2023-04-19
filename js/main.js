const button = document.querySelector('#translateBtn');
const userInput = document.querySelector('#userInput');
const resultInput = document.querySelector('#result');
const loadingDiv = document.querySelector('#loading');


button.onclick = function () {
    loadingDiv.style.display = 'block';
    button.setAttribute('disabled', 'disabled');

    const inputText = userInput.value;
    resultInput.value = inputText;

    const url = 'https://api.mymemory.translated.net/get?q=' + inputText + '&langpair=cs|en';

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson);
            resultInput.value = myJson.responseData.translatedText;

            const searchItem = {
                text: inputText,
                translation: myJson.responseData.translatedText
            };

            const history = getSearchHistory();
            history.push(searchItem);
            saveSearchHistory(history);
            dumpSearchHistory();

            loadingDiv.style.display = 'none';
            button.removeAttribute('disabled');
        });
}


function getSearchHistory() {
    let history = localStorage.getItem('searchHistory');
    if (!history) {
        history = [];
    } else {
        history = JSON.parse(history);
    }
    return history;
}

function saveSearchHistory(history) {
    localStorage.setItem('searchHistory', JSON.stringify(history));
}

function dumpSearchHistory() {
    const history = getSearchHistory();
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    for (let i = history.length - 1; i >= 0; i--) {
        const item = history[i];
        const li = document.createElement('li');
        li.textContent = `${item.text} -> ${item.translation}`;
        historyList.appendChild(li);
    }
}

window.onload = function() {
    dumpSearchHistory();
};
