let streak = 0;
const targetStreak = 10;
const streakDisplay = document.getElementById('streak');
const messageDisplay = document.getElementById('message');
const choice1Button = document.getElementById('choice1'); // 表ボタン
const choice2Button = document.getElementById('choice2'); // 裏ボタン
const superLuckButton = document.getElementById('superLuckButton'); // 新しいボタンの取得
const resetButton = document.getElementById('resetButton');

// 初期状態の更新
function updateDisplay() {
    streakDisplay.textContent = `現在の連勝: ${streak}`;
    messageDisplay.textContent = 'どちらかを選んでね！';
    choice1Button.disabled = false;
    choice2Button.disabled = false;
    superLuckButton.disabled = false; // 新しいボタンも初期状態で有効化
    resetButton.style.display = 'none';
}

function playerGuess(playerChoice) {
    // プレイヤーの選択を無効化（連打防止）
    choice1Button.disabled = true;
    choice2Button.disabled = true;
    superLuckButton.disabled = true; // こちらのボタンも無効化

    const outcomes = ["表", "裏"]; // 表と裏の選択肢
    const actualOutcome = outcomes[Math.floor(Math.random() * outcomes.length)]; // 0か1をランダムに選択

    // ドラムロール音の再生 (もし設定していれば)
    // const drumrollSound = new Audio('path/to/drumroll.mp3');
    // drumrollSound.play();

    // 少し遅延させて結果発表 (ドラムロールの後、またはすぐに)
    setTimeout(() => { // ドラムロールがあればdrumrollSound.duration*1000+100の計算を入れる
        if (playerChoice === actualOutcome) {
            streak++;
            messageDisplay.textContent = `正解！🎉 ${actualOutcome} でした。`;
            // 正解音や光る演出があればここに追加
            // document.body.classList.add('flash-green');
            // setTimeout(() => document.body.classList.remove('flash-green'), 200);

            if (streak === targetStreak) {
                messageDisplay.textContent = `おめでとうございます！🎉 10連勝達成！`;
                // 勝利演出（ファンファーレ、紙吹雪など）
                // const winEffect = document.getElementById('winEffect');
                // winEffect.classList.remove('hidden');
                // const winSound = new Audio('path/to/fanfare.mp3');
                // winSound.play();
                // setTimeout(() => winEffect.classList.add('hidden'), 3000);

                resetButton.style.display = 'block';
            } else {
                // 正解したがまだ目標に達していない場合、少し待って次のプレイへ
                setTimeout(() => {
                    messageDisplay.textContent = `現在の連勝: ${streak}。次も頑張って！`;
                    choice1Button.disabled = false;
                    choice2Button.disabled = false;
                    superLuckButton.disabled = false; // 再び有効化
                }, 1000); // 1秒後にボタンを有効化
            }
        } else {
            messageDisplay.textContent = `残念！😭 ${actualOutcome} でした。連勝がリセットされました。`;
            // 不正解音や赤く光る演出があればここに追加
            // document.body.classList.add('flash-red');
            // setTimeout(() => document.body.classList.remove('flash-red'), 200);

            streak = 0;
            resetButton.style.display = 'block';
        }
        streakDisplay.textContent = `現在の連勝: ${streak}`;
    }, 500); // 結果表示までの遅延（必要であれば調整）
}

// 新しいボタンのロジック
function playSuperLuck() {
    // プレイヤーの選択を無効化（連打防止）
    choice1Button.disabled = true;
    choice2Button.disabled = true;
    superLuckButton.disabled = true;

    // 1/1024の確率を生成
    // Math.random()は0以上1未満の乱数を生成
    // 1024で割って、それが0.001未満なら当たり、とする
    const winChance = 1 / 1024;
    const randomNumber = Math.random(); // 0以上1未満の乱数

    // ドラムロール音などがあればここに追加
    // const drumrollSound = new Audio('path/to/drumroll_long.mp3');
    // drumrollSound.play();

    // 少し待って結果発表
    setTimeout(() => { // ドラムロールがあればdrumrollSound.duration*1000+100の計算を入れる
        if (randomNumber < winChance) { // 当たり！
            messageDisplay.textContent = `🎉🎉 大当たり！🎉🎉 1/1024の奇跡！`;
            // パチンコ風のド派手な大当たり演出をここで発動！
            // (例: 紙吹雪、特別なファンファーレ、画面フラッシュなど)
            // 既存の勝利演出を呼び出すか、新しい特別な演出を作成する
            // const winEffect = document.getElementById('winEffect');
            // winEffect.classList.remove('hidden');
            // const superWinSound = new Audio('path/to/super_fanfare.mp3');
            // superWinSound.play();
            // setTimeout(() => winEffect.classList.add('hidden'), 5000); // 演出を長めにする

            streak = 0; // 大当たりしたら連勝はリセットする（ゲーム性による）
            // または、連勝数を大きく加算するなどのボーナスにする
            // streak += 10; // 例：10連勝分加算
            // streakDisplay.textContent = `現在の連勝: ${streak} (ボーナス!)`;

            resetButton.style.display = 'block'; // リセットボタンを表示
        } else { // 残念、ハズレ
            messageDisplay.textContent = `残念！今回はハズレでした。また挑戦してね！`;
            // ハズレ音などがあればここに追加
            // const loseSound = new Audio('path/to/super_lose.mp3');
            // loseSound.play();

            streak = 0; // ハズレたら連勝はリセット
            resetButton.style.display = 'block'; // リセットボタンを表示
        }
        streakDisplay.textContent = `現在の連勝: ${streak}`; // 連勝数が変わる可能性があるので更新
    }, 1500); // 結果が出るまでの遅延（1/1024なので少し長めにして期待感を煽る）
}


// イベントリスナーの設定
choice1Button.addEventListener('click', () => playerGuess('表'));
choice2Button.addEventListener('click', () => playerGuess('裏'));
superLuckButton.addEventListener('click', playSuperLuck); // 新しいボタンにイベントリスナーを設定
resetButton.addEventListener('click', () => {
    streak = 0;
    updateDisplay(); // 表示をリセット
});

// ゲーム開始時の初期表示
updateDisplay();
