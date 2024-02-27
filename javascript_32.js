document.addEventListener("DOMContentLoaded", function () {
    var gameField2 = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    var spans = document.querySelectorAll("span");
    var resultEl = document.getElementById("result");

    var indexsGame = [[0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2]];
    var freeIndexs = [1, 3, 0, 4, 6, 7, 8, 2, 5];

    var wonOrNot = false;

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    function check(OOO) {
        for (var i = 0; i < 3; i++) {
            if ((gameField2[i][0] === OOO && gameField2[i][1] === OOO && gameField2[i][2] === OOO) ||
                (gameField2[0][i] === OOO && gameField2[1][i] === OOO && gameField2[2][i] === OOO)) {
                return true;
            }
        }
        return false;
    }

    function check2(xoMarks) {
        if ((gameField2[0][0] === xoMarks && gameField2[1][1] === xoMarks && gameField2[2][2] === xoMarks) ||
            (gameField2[0][2] === xoMarks && gameField2[1][1] === xoMarks && gameField2[2][0] === xoMarks)) {
            return true;
        }
        return false;
    }

    spans.forEach(function (span) {
        span.addEventListener("click", function () {
            if (!wonOrNot) { 
                var cellIndex = indexsGame[this.dataset.index];
                if (gameField2[cellIndex[0]][cellIndex[1]] === 0) {
                    var ind = freeIndexs.indexOf(Number(this.dataset.index));
                    freeIndexs.splice(ind, 1);
                    gameField2[cellIndex[0]][cellIndex[1]] = "X";
                    this.textContent = "X";
                    if (check("X") || check2("X")) {
                        resultEl.textContent = "X виграв";
                        console.log("X won");
                        wonOrNot = true;
                        return;
                    }
                    if (freeIndexs.length > 0) {
                        var randomIndex = getRandomInt(0, freeIndexs.length);
                        var freeCell = freeIndexs[randomIndex];
                        cellIndex = indexsGame[freeCell];
                        gameField2[cellIndex[0]][cellIndex[1]] = "O";
                        freeIndexs.splice(randomIndex, 1);
                        var spanO = document.querySelector('span[data-index="' + freeCell + '"]');
                        spanO.textContent = "O";
                        console.log(freeIndexs);
                        console.log(gameField2);
                    } else {
                        resultEl.textContent = "нічия";
                        console.log("standoff");
                    }
                    if (check("O") || check2("O")) {
                        resultEl.textContent = "О виграв";
                        console.log("O won");
                        wonOrNot = true;
                    }
                }
            }
        });
    });
});


