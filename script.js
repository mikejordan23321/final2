let score = 0; // 初始化积分

document.getElementById("start-game").addEventListener("click", startGame);

function startGame() {
    document.getElementById("start-game").style.display = 'none';
    document.getElementById("choices").style.display = 'block';
    document.getElementById("background-music").play();
    showMessage("请选择一条探险路径：森林、沙滩或山峰");
}

document.querySelectorAll(".choice-btn").forEach(btn => {
    btn.addEventListener("click", (event) => {
        const choice = event.target.getAttribute("data-choice");
        handleChoice(choice);
    });
});

function handleChoice(choice) {
    let message;
    switch (choice) {
        case "forest":
            message = "你进入了神秘的森林，前方似乎有一种光芒……";
            break;
        case "beach":
            message = "你来到了阳光明媚的沙滩，海浪声和脚下的沙粒带来一种祥和的感觉。";
            break;
        case "mountain":
            message = "你正攀登高峰，俯瞰整个岛屿，似乎有个隐秘的角落藏着宝藏。";
            break;
    }
    showMessageWithAnimation(message);
    score += 10; // 每次探索获得10分
    updateScore();

    setTimeout(() => animateTreasure(choice), 3000);
}

function showMessageWithAnimation(text) {
    const message = document.getElementById("message");
    message.innerHTML = "";
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            message.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100); // 每100ms显示一个字符
        }
    }
    typeWriter();
}

function updateScore() {
    document.getElementById("score").textContent = score;
}

function animateTreasure(choice) {
    const map = document.getElementById("map");
    const treasure = document.createElement("div");
    treasure.classList.add("treasure");
    map.appendChild(treasure);

    let resultMessage;
    if (Math.random() > 0.5) {
        resultMessage = "恭喜！你找到了宝藏！🎉";
        score += 50; // 找到宝藏获得额外积分
    } else {
        resultMessage = "糟糕！宝藏被藏在了另一个角落……";
        score -= 20; // 没找到宝藏扣除积分
    }
    updateScore();
    showMessageWithAnimation(resultMessage);
}
