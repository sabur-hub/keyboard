    const keys = document.querySelectorAll('.key');
    const words = [
        "apple", "banana", "orange", "grape", "watermelon", "strawberry", "pineapple", "apricot", "peach", "blueberry",
        "kiwi", "mango", "papaya", "lemon", "lime", "cherry", "plum", "pear", "nectarine", "fig",
        "avocado", "blackberry", "raspberry", "coconut", "date", "elderberry", "grapefruit", "guava", "honeydew", "kumquat",
        "lychee", "melon", "persimmon", "pomegranate", "quince", "tangerine", "ugli fruit", "starfruit", "boysenberry", "cranberry",
        "tamarind", "passionfruit", "rhubarb", "cantaloupe", "dragonfruit", "mulberry", "ackee", "breadfruit", "cherimoya", "durian",
        "feijoa", "jackfruit", "kiwano", "salak", "sapodilla", "soursop", "longan", "custard apple", "rambutan", "carambola"
    ];

    // Выбор случайного слова из массива
    function getRandomWord() {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }

    // Генерация случайного текста заданной длины
    function generateRandomText(minLength, maxLength) {
        const targetTextLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
        let randomText = "";

        for (let i = 0; i < targetTextLength; i++) {
            randomText += getRandomWord() + " ";
        }

        return randomText.trim();
    }

    const targetText = generateRandomText(35, 45); // Случайная длина текста от 35 до 45 слов

    const targetTextElement = document.getElementById('targetText');
    targetTextElement.innerHTML = `Цель: ${targetText}`;
    let isTyping = false; // Флаг, показывающий начало ввода
    let userInput = "";
    let correctCount = 0;
    let incorrectCount = 0;

    // Функция для обновления отображаемого текста
    function updateText() {
        const userInputElement = document.getElementById('userInput');
        const resultElement = document.getElementById('result');

        correctCount = 0;
        incorrectCount = 0;

        let feedback = '';

        for (let i = 0; i < targetText.length; i++) {
            if (userInput[i]) {
                if (userInput[i] === targetText[i]) {
                    feedback += `<span style="color: green">${userInput[i]}</span>`;
                    correctCount++;
                } else {
                    feedback += `<span style="color: red">${targetText[i]}</span>`;
                    incorrectCount++;
                }
            } else {
                feedback += `<span style="color: #d4af37">${targetText[i]}</span>`;
                incorrectCount++;
            }
            if (!isTyping) {
                targetTextElement.innerHTML = ''; 
                isTyping = true; 
            }
        }

        userInputElement.innerHTML = `Ваш Ввод: ${feedback}`;
        resultElement.innerHTML = `Правильно введено: ${correctCount}, Осталось: ${incorrectCount}`;
    }

    // Обработка нажатия клавиши на клавиатуре
    document.addEventListener('keydown', function(event) {
        const keyPressed = event.key.toLowerCase();

        keys.forEach(key => {
            if (key.textContent.toLowerCase() === keyPressed) {
                key.style.backgroundColor = 'darkslategrey';
                userInput += keyPressed; 
                updateText(); 
            }
        });
    });

    // Обработка отпускания клавиши на клавиатуре
    document.addEventListener('keyup', function(event) {
        const keyPressed = event.key.toLowerCase();

        keys.forEach(key => {
            if (key.textContent.toLowerCase() === keyPressed) {
                key.style.backgroundColor = 'transparent';
            }
        });
    });

    // Находим кнопку "пробел"
    const spaceKey = document.querySelector('.space-key');

    // Обработка нажатия клавиши "пробел"
    document.addEventListener('keydown', function(event) {
        const keyPressed = event.key.toLowerCase(); 

        if (keyPressed === ' ') {
            spaceKey.style.backgroundColor = 'darkslategrey'; // Изменяем цвет фона при нажатии клавиши "пробел"
            userInput += ' '; // Добавляем пробел к пользовательскому вводу
            updateText(); // Обновляем отображаемый текст
        }
    });

    document.addEventListener('keyup', function(event) {
        if (event.code === 'Space') {
            spaceKey.style.backgroundColor = 'transparent';
        }
    });

    // Функция для удаления последнего символа из пользовательского ввода
    function deleteLastCharacter() {
        userInput = userInput.slice(0, -1);
        updateText(); 
    }

    // Обработка нажатия клавиши Backspace или Delete
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            deleteLastCharacter();
        }
    });
