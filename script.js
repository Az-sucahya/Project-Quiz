const questions = [
    {
        question: "Buku Filosofi Teras karya Henry Manampiring adalah sebuah buku yang menghadirkan pandangan tentang?",
        option: ["Seseorang harus menghadapi emosi dengan ketergesa-gesaan", "Mengatasi emosi negatif dan menjaga ketahanan mental", "Membuat seseorang memandang kehidupan dengan cara yang negatif", "Mental dan emosi tidak harus diubah presepsi negatifnya"],
        answer: 1,
        score: 10
    },
    {
        question: "Filosofi Teras termasuk kedalam buku apa?",
        option: ["Self Love", "Drama", "Self Improvement", "Watpaad"],
        answer: 2,
        score: 10
    },
    {
        question: "Stoikisme mengajarkan kita untuk?",
        option: ["Menanam dendam kepada seseorang", "Mengajak kita untuk fokus pada apa yang bisa kita kendalikan", "Kita tidak memiliki kendali sedikitpun tentang sikap", "Kita tidak dapat mengendalikan pikiran dan tindakan kita"],
        answer: 1,
        score: 10
    },
    {
        question: "Filosofi teras membahas tentang apa?",
        option: ["Hidup dengan ketertekanan", "Hidup tanpa mengetahui kemana arah selanjutnya", "Pemikiran yang sempit", "Hidup dalam ketenangan dan terbebas dari emosi negatif"],
        answer: 3,
        score: 10
    },
    {
        question: "Manfaat apa yang dapat kita petik dari membaca buku filsafat?",
        option: ["Mengajarkan berpikir sempit", "Mengajarkan cara berpikir dengan bijak", "Mengajarkan resep makanan", "Memberitahukan tempat wisata yang menarik"],
        answer: 1,
        score: 10
    },
    {
        question: "Apa saja jenis-jenis buku self-improvement?",
        option: ["Kesehatan, keuangan, parenting", "Bisnis, teknologi, sejarah", "Motivasi, pengembangan diri, kesuksesan", "Semua tepat"],
        answer: 2,
        score: 10
    },
    {
        question: "Buku self-improvement yang membahas tentang manajemen waktu adalah?",
        option: ["The 7 Habits of Highly Effective People", "Master Your Time Master Your Life", "The Power of Thinking out the Box", "The Subtle Art of Not Giving A F"],
        answer: 1,
        score: 10
    },
    {
        question: "How to Win Friends & Influence People buku tentang?",
        option: ["Jangan mudah terpengaruh oleh lingkungan", "Menyajikan tentang cara membangun hubungan interpersonal yang efektif", "Pentingnya kesadaran diri", "Teman adalah racun yang manis"],
        answer: 1,
        score: 10
    },
    {
        question: "Manfaat lain dari membaca buku self-improvement adalah?",
        option: ["Memperluas wawasan", "Menemukan pilihan hati", "Menjadi lebih sukses", "Membantu skill memasak"],
        answer: 0,
        score: 10
    },
    {
        question: "Siapa penulis buku Atomic Habits?",
        option: ["Henry Manampiring", "James Clear", "Morgan Housel", "Dale Carnegie"],
        answer: 1,
        score: 10
    }
];

let current = 0;
let score = 0;
let timerInterval;
let userName = "";
let userClass = "";

function startQuiz() {
    const nameInput = document.getElementById('nameInput').value.trim();
    const classInput = document.getElementById('classInput').value.trim();

    if (nameInput === '' || classInput === '') {
        alert('Nama dan Kelas harus diisi!');
        return;
    }

    userName = nameInput;
    userClass = classInput;

    document.getElementById('intro').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    if (current >= questions.length) {
        clearInterval(timerInterval);
        document.getElementById("question").textContent = "Quiz selesai!";
        document.getElementById("options").innerHTML = "";
        document.getElementById("scoreDisplay").textContent = `Skor kamu: ${score}`;
        document.getElementById("scoreDisplay").classList.remove("hidden");
        document.getElementById("timer").classList.add("hidden");
        document.getElementById("finalMessage").textContent = `Selamat ${userName}, kamu sudah menyelesaikan quiz!`;
        document.getElementById("finalMessage").classList.remove("hidden");

        document.getElementById("restartContainer").classList.remove("hidden");

        saveScore();
        return;
    }

    const q = questions[current];
    document.getElementById("question").textContent = q.question;
    document.getElementById("options").innerHTML = q.option.map((opt, idx) =>
        `<button class="option" onclick="choose(${idx})">${opt}</button>`
    ).join("");
    resetTimer();
}

function choose(index) {
    if (index === questions[current].answer) {
        score += questions[current].score;
    }
    current++;
    showQuestion();
}

function resetTimer() {
    clearInterval(timerInterval);
    let timeLeft = 20;
    document.getElementById("timer").textContent = `Waktu: ${timeLeft} detik`;
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Waktu: ${timeLeft} detik`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            current++;
            showQuestion();
        }
    }, 1000);
}

function saveScore() {
    const playerData = {
        name: userName,
        kelas: userClass,
        score: score,
        total: questions.length
    };
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push(playerData);
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function restartQuiz() {
    current = 0;
    score = 0;

    document.getElementById("scoreDisplay").classList.add("hidden");
    document.getElementById("finalMessage").classList.add("hidden");
    document.getElementById("restartContainer").classList.add("hidden");

    document.getElementById("intro").classList.remove("hidden");
    document.getElementById("quiz").classList.add("hidden");
	
	document.getElementById('nameInput').value = '';
    document.getElementById('classInput').value = '';

    resetQuiz();

    document.querySelector("nav").classList.remove("disabled");
}

function resetQuiz() {
    document.getElementById("timer").textContent = "20 detik";
    document.getElementById("question").textContent = "Pertanyaan disini";
    document.getElementById("options").innerHTML = "";
}
