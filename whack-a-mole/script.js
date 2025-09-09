document.addEventListener('DOMContentLoaded', () => {

    // --- 遊戲設定檔 ---
    const config = {
        gridCount: 6,                   // 格子總數
        gameDuration: 60,               // 遊戲時間（秒）
        minStayTime: 500,               // 地鼠停留的最短時間（毫秒）
        maxStayTime: 1500,              // 地鼠停留的最長時間（毫秒）
        moleImage: './assets/mole.png', // 地鼠圖片路徑
        holeImage: './assets/hole.png', // 洞口背景圖片路徑
        backgroundImage: './assets/background.jpg', // 遊戲背景圖片路徑
    };

    // --- DOM 元素選擇 ---
    const scoreBoard = document.getElementById('score');
    const timeLeftDisplay = document.getElementById('time-left');
    const gameBoard = document.getElementById('game-board');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const body = document.body;

    // --- 遊戲狀態變數 ---
    let score = 0;
    let timeLeft = config.gameDuration;
    let gameInterval = null; // 控制地鼠出現的計時器
    let timerInterval = null; // 控制遊戲倒數的計時器
    let isGameRunning = false;
    let holes = []; // 存放所有的洞口元素

    // --- 函數區 ---

    /**
     * 初始化遊戲版面
     */
    function createGameBoard() {
        // 設定背景
        body.style.backgroundImage = `url(${config.backgroundImage})`;
        
        // 根據格子數量設定 grid 佈局
        const columns = Math.ceil(Math.sqrt(config.gridCount));
        gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

        // 清空舊的版面
        gameBoard.innerHTML = '';
        holes = []; // 清空洞口陣列

        for (let i = 0; i < config.gridCount; i++) {
            const hole = document.createElement('div');
            hole.classList.add('hole', 'w-32', 'h-32', 'md:w-40', 'md:h-40'); // RWD support
            hole.style.backgroundImage = `url(${config.holeImage})`;

            const mole = document.createElement('img');
            mole.src = config.moleImage;
            mole.classList.add('mole');
            mole.addEventListener('click', whackMole); // 為地鼠添加點擊事件

            hole.appendChild(mole);
            gameBoard.appendChild(hole);
            holes.push(mole); // 將地鼠元素存入陣列中
        }
    }

    /**
     * 隨機讓一隻地鼠出現
     */
    function popMole() {
        // 如果地鼠已經出現，則不再執行
        const activeMoles = holes.filter(mole => mole.classList.contains('up'));
        if (activeMoles.length >= Math.floor(config.gridCount / 2)) {
             return; // 控制同時出現的地鼠數量，避免太多
        }

        const randomIndex = Math.floor(Math.random() * holes.length);
        const randomMole = holes[randomIndex];

        // 避免在同一個洞重複出現
        if (randomMole.classList.contains('up')) {
            return popMole();
        }

        const stayTime = Math.random() * (config.maxStayTime - config.minStayTime) + config.minStayTime;
        
        randomMole.classList.add('up');

        setTimeout(() => {
            randomMole.classList.remove('up');
        }, stayTime);
    }

    /**
     * 敲擊地鼠的事件處理
     * @param {MouseEvent} e
     */
    function whackMole(e) {
        // isTrusted 表示這是真實的用戶點擊，而不是腳本觸發的
        if (!e.isTrusted || !isGameRunning) return;
        
        // 檢查是否點擊到有 'up' class 的地鼠
        if (this.classList.contains('up')) {
            score++;
            scoreBoard.textContent = score;
            this.classList.remove('up'); // 敲到後馬上消失
        }
    }

    /**
     * 開始遊戲
     */
    function startGame() {
        if (isGameRunning) return;
        isGameRunning = true;

        // 重置分數和時間
        score = 0;
        timeLeft = config.gameDuration;
        scoreBoard.textContent = score;
        timeLeftDisplay.textContent = timeLeft;

        // 更新按鈕狀態
        startBtn.classList.add('hidden');
        stopBtn.classList.remove('hidden');

        // 開始倒數計時
        timerInterval = setInterval(() => {
            timeLeft--;
            timeLeftDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                stopGame();
                alert(`時間到！你的分數是: ${score}`);
            }
        }, 1000);

        // 開始隨機出現地鼠
        gameInterval = setInterval(popMole, (config.minStayTime + config.maxStayTime) / 3);
    }

    /**
     * 結束遊戲
     */
    function stopGame() {
        isGameRunning = false;

        // 清除所有計時器
        clearInterval(timerInterval);
        clearInterval(gameInterval);
        timerInterval = null;
        gameInterval = null;

        // 隱藏所有地鼠
        holes.forEach(mole => mole.classList.remove('up'));

        // 更新按鈕狀態
        startBtn.classList.remove('hidden');
        stopBtn.classList.add('hidden');
    }

    // --- 事件監聽 ---
    startBtn.addEventListener('click', startGame);
    stopBtn.addEventListener('click', stopGame);

    // --- 初始設定 ---
    createGameBoard(); // 頁面載入時先建立好遊戲版面
});