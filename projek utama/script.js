const questions = [
    {
        question: "Buku Filosofi Teras karya Henry Manampiring adalah sebuah buku yang menghadirkn pandangan tentang?",
        option: ["Seseorang harus mmenghadapi emosi dengan ketergesa-gesaan", "Mengatasi emosi negatif dan menjaga ketahanan mental", "Membuat seseorang memandang kehidupan dengan cara yang negatif", "Mental dan emosi tidak harus di ubah presepsi negatifnya"],
        answer: 1
    },
    {
        question: "Filosofi Teras termasuk kedalam buku apa?",
        option: ["Self Love", "Drama", "Self Improvement", "Watpaad"],
        answer: 2
    },
    {
        question: "Stoikisme mengajrkan kita untuk?",
        option: ["Menanam dendam kepada seseorang", "Mengajak kita untuk fokus pada apa yang bisa kita kendalikan", "Kita tidak memiliki kendali sedikitpun tentang sikap", "Kita tidak dapat mengendalikan pikiran dan tindakan kita"],
        answer: 1
    },
    {
        question: "Filosofi teras membahas tentang apa?",
        option: ["Hidup dengan ketertekanan", "Hidup tanpa mengetahui kemana  arah selanjutnya", "Pemikiran yang sempit", "Hidup dalam ketenangan dan terbebas dari emosi negatif"],
        answer: 3
    },
    {
        question: "Manfaat apa yang dapat kita petik dari membaca buku filsafat?",
        option: ["Mengajarkan berfikir sempit", "Mengajrkan cara berfikir dengan bijak", "Menagajar resep makanan", "Memberitahukan tempat wisata yang menarik"],
        answer: 1
    },
    {
        question: "Apa saja jenis - jenis buku self-improvement?",
        option: ["Kesehatan, keuangan, parenting", "Bisnis, teknologi, sejarah", "Motivasi, pengembangan diri, kesuksesan", "semua tepat"],
        answer: 2
    },
    {
        question: "Buku self-improvement yang membahas tentang manajemen waktu adalah?",
        option: ["The 7 Habits of Hingly Effective People", "Master Your Time Master Your Life", "The Power of Thinking out the Box", "The Subtle Art of Not Giving A f"],
        answer: 1
    },
    {
        question: "How to Win Friends & Influence  People buku tentang?",
        option: ["Jangan mudah terpengaruh oleh lingkungan", "Menyajikan tentang cara membangun hubungan  interpersonal yang efektif", "Pentingnya kesadaran diri", "Teman adalah racun yang manis"],
        answer: 1
    },
    {
        question: "Manfaat lain dari membaca buku self-improvement adalah?",
        option: ["Memperluas wawasan", "Menemukan pilihan hati", "Menjadi lebih sukses", "Membantu skil memasak"],
        answer: 0
    },
    {
        question: "Siapa penulis buku Atomic Habits?",
        option: ["Hanry Manampiring", "James Clear", "Morgan Housel", "Dale Carneige"],
        answer: 1
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
        document.getElementById("scoreDisplay").textContent = `Skor kamu: ${score}/${questions.length}`;
        document.getElementById("scoreDisplay").classList.remove("hidden");
        document.getElementById("timer").classList.add("hidden");
        document.getElementById("finalMessage").textContent = `Selamat ${userName}, kamu sudah menyelesaikan quiz!`;
        document.getElementById("finalMessage").classList.remove("hidden");

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
        score++;
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
