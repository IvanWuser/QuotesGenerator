const quoteElement = document.querySelector('.quote');
const generateBtn = document.querySelector('.Generate-btn');
const counterElement = document.querySelector('.counter');
const secretCounterElement = document.querySelector('.secret-counter');
const MainElement = document.querySelector('.main');

// Масив рандомних цитат. Щоб порахувати рядки треба 8-останній рядок+1
const quotes = [
    "Мене не хвилює, що люди думають про мене. Я люблю пряники",
    "Де ви не були, там і були.",
    "Завдання - це не те, що ти не можеш зробити, це те, що ти не хочеш робити.",
    "Не варто хвилюватися. У світі немає нічого страшнішого за нас самих.",
    "Пси - вони гавкають. Коти - вони мяукають",
    "На дворі rain, А на душі pain...",
    "А чи можуть червячки слізаріо...",
    "Садік, школа, універ, туда сюда міліонер",
    "Бригу.",
    "Чем гуше лес - скібіді дап дап дап ес ес",
    "Чем богаче дача - джими джими ача ача",
    "Життя не воробей - вака вака ей ей",
    "Шукав золото, а найшов мідь.",
    "Шафа не тумба, Тімон не Пумба..",
    "Якщо спочатку у вас не виходить, спробуйте ще раз",
    "Два найважливіших дні у вашому житті — це день, коли ви народилися, і день, коли ви дізналися, чому. (Марк Твен)",
    "Мої найкращі думки приходять мені під час тестів, коли я не можу їх записати.",
    "Чому програмісти завжди голосують за NULL? Бо для них NULL - це завжди True.",
    "Якщо я замовлю піццу і вона прийде вже розрізаною, це рахується як заборгованість?",
    "Найкращий спосіб подолати лінивість - це... ммм... забув.",
    "Якщо ви зустрінете людину, яка вважає, що гроші не принесуть їй щастя, порадьте їй подарувати вам свої гроші.",
    "Зробіть світ кращим місцем: поділіть свій Wi-Fi пароль із сусідами.",
    "Щоб стати справжнім героєм, потрібно тільки зробити щось, на що інші відкладають до останнього моменту", 
    "Поділіться цитатою з розробником сайту.. Він буде дууже радий <3",
    "Боже чел.. Я крінжанув",
    "Чувак.. Ця вечірка просто відстій, я блін ненавиджу цих людей",
    "Сьогодні кент, а завтра мент.. (СаняБравлстрас228)",
    "Never lose your eshkere.",
    "Якщо не грав 'Симулятор відкривання кейсів в стендоф 2', то життя не видав",
    "Якщо ви читаєте це, ви витратили частину свого життя на читання цього.",
    "Я не лінивий, я просто входжу в економію енергії..",
    "Якщо ви втомилися від тисячі разів пробувати, спробуйте ще тисячу разів.",
    "Життя подібне до велосипеда - або ти рухаєшся вперед, або падаєш",
    "Хто знав що я такий філософ..",
    "Якщо ти не зможеш подолати свій страх, принаймні, зроби його смішним.",
    "Пам'ятай, що кожен день - це нова можливість зробити щось неймовірне. Або хоча б трошки менше неймовірне.",
    "🤫🧏‍♂️",
    "Думаю, час задуматися, що насправді означає цей задній фон на сайті..",
    "На якій мові думають глухо-німі?..",
    ".. - / .-- .- ... / ... ..- .--. .--. --- ... . -.. / - --- / -... . / .- / ... . -.-. .-. . -",
    "Шанс получити секретну цитату замість простої становить 2%",
    "Неймовірно, але в Німеччині знаходиться найбільша кількість німців в світі..",
    "Хороші дороги, на асвальті не валяються"
];

const secretQuotes = [
    "[S #1] Кожна хмара має сріблисту оболонку..",
    "[S #2] Ввійшовши в таємницю, будьте готові відповісти на питання, на які навіть не думали відповідати.",
    "[S #3] ?**Цитата викрадена**?"
];


let totalQuotes = 0;
let uniqueQuotes = new Set(); // Set для зберігання унікальних індексів звичайних цитат
let secretUniqueQuotes = new Set(); // Set для зберігання унікальних індексів секретних цитат
let lastQuoteWasUnique = true; // Для відстеження унікальності останньої цитати

// Функція для генерації рандомної цитати
function generateQuote() {
    const isSecret = Math.random() < 0.02;


    //Списки цитат
    let randomIndex;
    let currentQuotes;

    if (isSecret) {
        currentQuotes = secretQuotes;
        randomIndex = Math.floor(Math.random() * currentQuotes.length);
    } else {
        currentQuotes = quotes;
        randomIndex = Math.floor(Math.random() * currentQuotes.length);
    }

    let uniqueSet = isSecret ? secretUniqueQuotes : uniqueQuotes;

    if (!uniqueSet.has(randomIndex)) {
        uniqueSet.add(randomIndex);
        lastQuoteWasUnique = true; // Остання цитата є унікальною
    } else {
        lastQuoteWasUnique = false; // Остання цитата не є унікальною
    }

    const randomQuote = currentQuotes[randomIndex];
    quoteElement.textContent = randomQuote;

    if (!isSecret) {
        totalQuotes++; // Збільшення загальної кількості цитат
    }

    // Оновлення лічильників тільки відповідно до типу цитати
    if (isSecret) {
        updateSecretCounter();
    } else {
        updateCounter();
    }
}

// Функція для оновлення лічильника звичайних цитат
function updateCounter() {
    counterElement.textContent = `Цитат знайдено: ${uniqueQuotes.size}/${quotes.length}`;

    if (uniqueQuotes.size === quotes.length) {
        // Якщо всі звичайні цитати зібрані, фон на жовтий
        counterElement.style.backgroundColor = 'rgba(255, 242, 0, 0.596)';
    } else {
        if (lastQuoteWasUnique) {
            // Якщо цитата була унікальною, анімація для фону
            counterElement.style.backgroundColor = 'rgba(26, 255, 0, 0.25)';

            // Через пів секунди знову міняємо на початковий колір
            setTimeout(() => {
                counterElement.style.backgroundColor = 'rgba(0, 0, 0, 0.175)';
            }, 500);
        }
    }
}

let firstRun = true; // Додайте глобальну змінну, що вказує на перший запуск





// Функція для оновлення лічильника секретних цитат
function updateSecretCounter() {
    secretCounterElement.textContent = `Секретних Цитат знайдено: ${secretUniqueQuotes.size}/${secretQuotes.length}`;

    // Якщо всі секретні цитати знайдено
    if (secretUniqueQuotes.size === secretQuotes.length) {
        secretCounterElement.style.backgroundColor = '#ff009d';
        MainElement.style.backgroundColor = 'rgba(177, 18, 145, 0.394)';
        setTimeout(() => {
            MainElement.style.backgroundColor = 'rgba(89, 89, 89, 0.347)';
        }, 500);
    } else if (!firstRun) { // Перевірка чи це перший запуск
        // Якщо ще є незнайдені секретні цитати і це не перший запуск, викликаємо функцію оновлення стилів
        updateBackgroundColorAndButtonState();
    }

    firstRun = false; // Встановлюємо firstRun в false після першого запуску
}

function updateBackgroundColorAndButtonState() {
    secretCounterElement.style.backgroundColor = '#bf0490';
    MainElement.style.backgroundColor = 'rgba(177, 18, 145, 0.394)';
    generateBtn.disabled = true;

    setTimeout(() => {
        secretCounterElement.style.backgroundColor = 'rgba(71, 0, 64, 0.429)';
        MainElement.style.backgroundColor = 'rgba(89, 89, 89, 0.347)';
        setTimeout(() => {
            generateBtn.disabled = false;
        }, 700);
    }, 500);
}





// Ініціалізація лічильників при завантаженні сторінки
updateCounter();
updateSecretCounter();