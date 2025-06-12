let streak = 0;
const targetStreak = 10;
const streakDisplay = document.getElementById('streak');
const messageDisplay = document.getElementById('message');
const choice1Button = document.getElementById('choice1'); // 表ボタン
const choice2Button = document.getElementById('choice2'); // 裏ボタン
const resetButton = document.getElementById('resetButton');

// 初期状態の更新
function updateDisplay() {
    streakDisplay.textContent = `現在の連勝: ${streak}`;
    messageDisplay.textContent = 'どちらかを選んでね！';
    choice1Button.disabled = false;
    choice2Button.disabled = false;
    resetButton.style.display = 'none';
}

function playerGuess(playerChoice) {
    // プレイヤーの選択を無効化（連打防止）
    choice1Button.disabled = true;
    choice2Button.disabled = true;

    const outcomes = ["表", "裏"]; // 表と裏の選択肢
    const actualOutcome = outcomes[Math.floor(Math.random() * outcomes.length)]; // 0か1をランダムに選択

    if (playerChoice === actualOutcome) {
        streak++;
        messageDisplay.textContent = `正解！🎉 ${actualOutcome} でした。`;
        if (streak === targetStreak) {
            messageDisplay.textContent = `おめでとうございます！🎉 10連勝達成！`;
            // ゲーム終了、リセットボタン表示
            resetButton.style.display = 'block';
        } else {
            // 正解したがまだ目標に達していない場合、少し待って次のプレイへ
            setTimeout(() => {
                messageDisplay.textContent = `現在の連勝: ${streak}。次も頑張って！`;
                choice1Button.disabled = false;
                choice2Button.disabled = false;
            }, 1000); // 1秒後にボタンを有効化
        }
    } else {
        messageDisplay.textContent = `残念！😭 ${actualOutcome} でした。連勝がリセットされました。`;
        streak = 0;
        // ゲーム終了、リセットボタン表示
        resetButton.style.display = 'block';
    }
    streakDisplay.textContent = `現在の連勝: ${streak}`;
}

// イベントリスナーの設定
choice1Button.addEventListener('click', () => playerGuess('表'));
choice2Button.addEventListener('click', () => playerGuess('裏'));
resetButton.addEventListener('click', () => {
    streak = 0;
    updateDisplay(); // 表示をリセット
});

// ゲーム開始時の初期表示
updateDisplay();