/** Класс Coffee для десериализации JSON файла */
class Coffee {
    /**
     * Переменные класса
     * title - название кофе.
     * description - описание кофе.
     * ingredients- рецепт кофе.
     * image - картинка кофе.
     * id - номер кофе.
     */
    title = ""
    description = ""
    ingredients = []
    image = ""
    id = ""
}

/**
 * Сравнение массивов
 * @param {Array} a - массив a.
 * @param {Array} b - массив b.
 */
const compArr = (a, b) => {
    a.sort();
    b.sort();
    return a.toString() === b.toString();
};

/** Функция для получения выбранных checkbox и нахождение подходящего рецепта кофе */
/* istanbul ignore file */
function my() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    let output = [];
    checkboxes.forEach((checkbox) => {
        output.push(checkbox.value);
    });
    // console.log(output);

    check(output);
}

/**
 * Поиск подходящего рецепта кофе
 * @param {Array} output - рецепт пользователя.
 */
function check(output) {
    fetch('coffee.json')
        .then((response) => response.json())
        .then((json) => {
            for (const item of json) {
                let coffee = Object.assign(new Coffee(), item);
                console.log(coffee.ingredients);
                if (compArr(coffee.ingredients, output)) {
                    console.log(coffee);
                    console.log(coffee.title);
                    document.getElementById("look").src = coffee.image;
                    document.getElementById("header").textContent = coffee.title;
                    document.getElementById("text").textContent = coffee.description;
                    break;
                } else {
                    document.getElementById("look").src = "img/no.png";
                    document.getElementById("header").textContent = "Такого кофе нет";
                    document.getElementById("text").textContent = "И описания его нет";
                }
            }
        });
}
exports.check = check;
exports.comp = compArr;

my();
