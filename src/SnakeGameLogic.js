import { ROWS, COLS } from './config';
import SnakeGame from './SnakeGame';

// NOTE: ROWS, COLS에는 행의 개수, 열의 개수가 저장되어 있습니다.
// 이 변수를 활용해서 코드를 작성하세요!

function SnakeGameLogic() {
    // 각 마디의 좌표를 저장하는 배열
    this.joints = [
        { x: 2, y: 0 },// index = 0 (head)
        { x: 1, y: 0 },// index = 1
        { x: 0, y: 0 }// index = 2 (tail)
    ];
    // 먹이의 좌표
    this.fruit = { x: 3, y: 5 };
    this.direction = 'right';
}


SnakeGameLogic.prototype.up = function () {
    // 뱀이 위쪽으로 바라보게 만들기
    this.direction = 'up'
}

SnakeGameLogic.prototype.down = function () {
    // 뱀이 아래쪽으로 바라보게 만들기
    this.direction = 'down'
}

SnakeGameLogic.prototype.left = function () {
    // 뱀이 왼쪽으로 바라보게 만들기
    this.direction = 'left'
}

SnakeGameLogic.prototype.right = function () {
    // 뱀이 오른쪽으로 바라보게 만들기
    this.direction = 'right'
}

SnakeGameLogic.prototype.nextState = function () {

    let newHead;
    if (this.direction === 'right') {
        newHead = {
            x: this.joints[0].x + 1,
            y: this.joints[0].y
        }
    } else if (this.direction === 'left') {
        newHead = {
            x: this.joints[0].x - 1,
            y: this.joints[0].y
        }
    } else if (this.direction === 'up') {
        newHead = {
            x: this.joints[0].x,
            y: this.joints[0].y - 1
        }
    } else if (this.direction === 'down') {
        newHead = {
            x: this.joints[0].x,
            y: this.joints[0].y + 1
        }
    }

    // if (newHead.x === this.fruit.x && newHead.y === this.fruit.y) 드모르간 법칙 적용
    if (newHead.x !== this.fruit.x || newHead.y !== this.fruit.y) {
        this.joints.pop()
    } else {
        this.fruit.x = Math.floor(Math.random() * COLS)
        this.fruit.x = Math.floor(Math.random() * ROWS)
    }

    if (newHead.x < 0 || newHead.x >= ROWS || newHead.y < 0 || newHead.y >= COLS) {
        return false
    }

    // 방법(1):
    // for (const j of this.joints) {
    //     if (j.x === newHead.x && j.y === newHead.y) {
    //         return false
    //     }
    // }

    // 방법(2):
    if (this.joints.some(j => j.x === newHead.x && j.y === newHead.y)) {
        return false
    }

    this.joints.unshift(newHead);
    return true;
}

export default SnakeGameLogic;
