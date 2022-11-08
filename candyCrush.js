var grid = document.querySelector('.grid');
var result = document.querySelector('.score');
var score = 0;
var width = 10;
var invalidToMoveRight = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
var candys = [
    {
        name: 'red',
        src: "url(./images/red-candy.png)"
    },
    {
        name: 'green',
        src: 'url(./images/green-candy.png)'
    },
    {
        name: 'blue',
        src: 'url(./images/blue-candy.png)'
    },
    {
        name: 'purple',
        src: 'url(./images/purple-candy.png)'
    },
    {
        name: 'yellow',
        src: 'url(./images/yellow-candy.png)'
    },
    {
        name: 'orange',
        src: 'url(./images/orange-candy.png)'
    }
];
var divs = [];
for (var i = 0; i < 100; i++) {
    var box = document.createElement('div');
    box.classList.add('box');
    box.setAttribute('data-id', i.toString());
    box.draggable = true;
    divs.push(box);
    grid === null || grid === void 0 ? void 0 : grid.appendChild(box);
    spawn(i);
}
divs.forEach(function (a) {
    a.addEventListener('dragstart', dragStart);
    a.addEventListener('dragend', dragEnd);
    a.addEventListener('dragover', dragOver);
    a.addEventListener('dragover', function (e) { return e.preventDefault(); });
});
var selected;
var dragedTo;
var first;
var second;
function dragStart() {
    selected = this;
}
function swap() {
    dragedTo.style.backgroundImage = "" + first;
    selected.style.backgroundImage = "" + second;
    if (checkForFourInArow() || checkForThreeInArow() || checkForFourInColumn() || checkForThreeInColumn()) {
    }
    else {
        dragedTo.style.backgroundImage = "" + second;
        selected.style.backgroundImage = "" + first;
    }
}
function dragEnd() {
    var selectedId = +selected.getAttribute('data-id');
    var dragedToId = +dragedTo.getAttribute('data-id');
    first = selected.style.backgroundImage.valueOf();
    second = dragedTo.style.backgroundImage.valueOf();
    if (invalidToMoveRight.some(function (a) { return a == selectedId; })) {
        if (dragedToId == selectedId - 1 || dragedToId == selectedId - width || dragedToId == selectedId + width) {
            swap();
        }
    }
    else if (selectedId % 10 == 0) {
        if (dragedToId == selectedId + 1 || dragedToId == selectedId - width || dragedToId == selectedId + width) {
            swap();
        }
    }
    else {
        if (dragedToId == selectedId - 1 || dragedToId == selectedId + 1 || dragedToId == selectedId - width || dragedToId == selectedId + width) {
            swap();
        }
    }
}
function dragOver() {
    dragedTo = this;
}
function spawn(a) {
    var generator = document.querySelector("[data-id='" + a + "']");
    if (generator.style.backgroundImage == '') {
        var randomaizer = Math.floor(Math.random() * candys.length);
        generator.style.backgroundImage = "" + candys[randomaizer].src;
    }
}
function checkForThreeInArow() {
    var _loop_1 = function (i) {
        var first_1 = divs[i].style.backgroundImage.valueOf();
        var second_1 = divs[i + 1].style.backgroundImage.valueOf();
        var third = divs[i + 2].style.backgroundImage.valueOf();
        var forbedden = [8, 9, 18, 19, 28, 29, 38, 39, 48, 49, 58, 59, 68, 69, 78, 79, 88, 89];
        if (divs[i].style.backgroundImage != '') {
            if (first_1 == second_1 && first_1 == third && !forbedden.some(function (a) { return a == i; })) {
                divs[i].style.backgroundImage = '';
                divs[i + 1].style.backgroundImage = '';
                divs[i + 2].style.backgroundImage = '';
                score += 3;
                return { value: true };
            }
        }
    };
    for (var i = 0; i < divs.length - 2; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
function checkForFourInArow() {
    var _loop_2 = function (i) {
        var first_2 = divs[i].style.backgroundImage.valueOf();
        var second_2 = divs[i + 1].style.backgroundImage.valueOf();
        var third = divs[i + 2].style.backgroundImage.valueOf();
        var four = divs[i + 3].style.backgroundImage.valueOf();
        var forbedden = [7, 8, 9, 17, 18, 19, 27, 28, 29, 37, 38, 39, 47, 48, 49, 5758, 59, 67, 68, 69, 77, 78, 79, 87, 88, 89];
        if (first_2 == second_2 && first_2 == third && first_2 == four && !forbedden.some(function (a) { return a == i; })) {
            divs[i].style.backgroundImage = '';
            divs[i + 1].style.backgroundImage = '';
            divs[i + 2].style.backgroundImage = '';
            divs[i + 3].style.backgroundImage = '';
            score += 4;
            return { value: true };
        }
    };
    for (var i = 0; i < divs.length - 3; i++) {
        var state_2 = _loop_2(i);
        if (typeof state_2 === "object")
            return state_2.value;
    }
}
function checkForThreeInColumn() {
    for (var i = 0; i < 80; i++) {
        var first_3 = divs[i].style.backgroundImage.valueOf();
        var second_3 = divs[i + width].style.backgroundImage.valueOf();
        var third = divs[i + width * 2].style.backgroundImage.valueOf();
        //    const forbedden = [8,9,18,19,28,29,38,39,48,49,58,59,68,69,78,79,88,89]
        if (divs[i].style.backgroundImage != '') {
            if (first_3 == second_3 && first_3 == third) {
                divs[i].style.backgroundImage = '';
                divs[i + width].style.backgroundImage = '';
                divs[i + width * 2].style.backgroundImage = '';
                score += 3;
                return true;
            }
        }
    }
}
function checkForFourInColumn() {
    for (var i = 0; i < 70; i++) {
        var first_4 = divs[i].style.backgroundImage.valueOf();
        var second_4 = divs[i + width].style.backgroundImage.valueOf();
        var third = divs[i + width * 2].style.backgroundImage.valueOf();
        var four = divs[i + width * 3].style.backgroundImage.valueOf();
        if (divs[i].style.backgroundImage != '') {
            if (first_4 == second_4 && first_4 == third && first_4 == four) {
                divs[i].style.backgroundImage = '';
                divs[i + width].style.backgroundImage = '';
                divs[i + width * 2].style.backgroundImage = '';
                divs[i + width * 3].style.backgroundImage = '';
                score += 4;
                return true;
            }
        }
    }
}
function respawn() {
    for (var i = 0; i < 10; i++) {
        if (divs[i].style.backgroundImage == '') {
            spawn(i);
        }
    }
}
function fullDown() {
    for (var i = 0; i < divs.length; i++) {
        if (divs[i].style.backgroundImage == '' && i - width >= 0) {
            divs[i].style.backgroundImage = divs[i - width].style.backgroundImage.valueOf();
            divs[i - width].style.backgroundImage = '';
        }
    }
}
window.setInterval(function () {
    checkForFourInArow();
    checkForThreeInArow();
    checkForFourInColumn();
    checkForThreeInColumn();
    fullDown();
    respawn();
    if (result != null) {
        result.innerHTML = "Score : " + score;
    }
}, 200);
export { };
//# sourceMappingURL=candyCrush.js.map