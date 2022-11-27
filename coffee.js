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
                if (compArr(coffee.ingredients, output)) {
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
/** Функция для создания кнопок с ингредиентами из JSON */
function SetVariants() {
    fetch('coffee.json')
        .then((response) => response.json())
        .then((json) => {
            const variantsSet = new Set();
            for (const item of json) {
                let coffee = Object.assign(new Coffee(), item);
                for (const ingredient of coffee.ingredients) {
                    variantsSet.add(ingredient);
                }
            }

            for (const [key, value] of variantsSet.entries()) {
                const label = document.createElement("label");
                label.innerHTML = `${value}`;
                const input = document.createElement("input");
                input.setAttribute('type', 'checkbox');
                input.setAttribute('onclick', 'my()');
                input.setAttribute('id', key);
                input.setAttribute('value', value);

                const item = document.createElement("div");
                item.className = 'grid-item';
                item.appendChild(label);
                item.appendChild(input);

                document.getElementById("grid").appendChild(item);
            }
        });
}

SetVariants();
my();

