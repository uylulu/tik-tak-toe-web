let grid = document.querySelectorAll(".grid-item");

let curr = 0,cnt = 0;

const num = [],choice = ["O","X"];

for(let i = 0;i < 3;i++) {
    const some = []
    for(let j = 0;j < 3;j++) {
        some.push(-1);
    }
    num.push(some);
}

function init() {
    for(let i = 0;i < 3;i++) {
        for(let j = 0;j < 3;j++) {
            num[i][j] = -1;
        }
    }
    cnt = 0;
    document.getElementById("verdict").innerHTML = "MY OWN TIK-TAK-TOE GAME";
    grid.forEach(div => {
        div.removeEventListener("click", clickHandler, {once: true});
        div.innerHTML = "";
    })
    grid.forEach(div => {
        div.addEventListener("click", clickHandler, {once: true});
    })
}

document.getElementById("button").addEventListener("click", init);

function check() {
    for(let i = 0;i < 3;i++) {
        for(let j = 0;j < 3;j++) {
            let cnt = 0;

            if(num[i][j] == -1) continue;

            for(let t = 0;t < 3;t++) {
                if(i + t >= 3 || num[i + t][j] != num[i][j]) break;

                if(t == 2) return num[i][j];
            }   
            for(let t = 0;t < 3;t++) {
                if(j + t >= 3 || num[i][j + t] != num[i][j]) break;

                if(t == 2) return num[i][j];
            }
            for(let t = 0;t < 3;t++) {
                if(i + t >= 3 || j + t >= 3 || num[i + t][j + t] != num[i][j]) break;

                if(t == 2) return num[i][j];
            }

            for(let t = 0;t < 3;t++) {
                if(i - t < 0 || j + t >= 3 || num[i - t][j + t] != num[i][j]) break;

                if(t == 2) return num[i][j];
            }
        }
    }

    if(cnt == 9) {
        return 2;
    }
    return -1;
}



const clickHandler = e => {
    
    let box = e.target;

    if(curr == 0) {
        box.innerHTML = "X";
    } else {
        box.innerHTML = "O";
    }
    curr = 1 - curr;

    let pos = parseInt(box.id);
    let row = Math.floor(pos/3),col = pos % 3;

    num[row][col] = curr;

    let val = check();

    if(val != -1) {
        console.log(num);
        document.getElementById("verdict").innerHTML = choice[val] + " wins";
    } else if(val == 2) {
        document.getElementById("verdict").innerHTML = "It's a draw";
    }
}

init();
