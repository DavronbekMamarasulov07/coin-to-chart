import axios from "./axios.js";

const ctx = document.querySelector("#myChart");
const $form = document.querySelector("#form");
const $year = document.querySelector("#year");
const $fromMonth = document.querySelector("#from-month");
const $toMonth = document.querySelector("#to-month");
const $infoBtn = document.querySelector("#info-click")
const $cryptoBox =  document.querySelector(".cryto-box")
const $info = document.querySelector(".info")


let chart; 

const renderData = async (e) => {
    try {
        e.preventDefault();

        let year = +($year.value);
        let fromMonth = +($fromMonth.value);
        let toMonth = +($toMonth.value);

        if (year < 2023 || year > new Date().getFullYear()  || (fromMonth >= 12 || fromMonth === 0) || (toMonth >= 12 || toMonth === 0)){
            alert("Hozirda ma'lumotlar  ba'zasida faqatginda 2023.06.01 dan to shu kungacha bulgan ma'lumotlar mavjud va oy kiritish kerak bo'lgan joyga 11-oygacha kirita olasiz! 0 ham mumkin emas" );
            return;
        }

        const response = await axios.get("/bitcoin/history?interval=d1");
        const data = response.data.data.filter(i => {
            const date = new Date(i.date);
            return date.getFullYear() === year && (date.getMonth() == fromMonth || date.getMonth() == toMonth);
        });

        const labels = data.map(i => new Date(i.date).toLocaleDateString());
        const prices = data.map(i => parseFloat(i.priceUsd));

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Bitcoin Price (USD)',
                    data: prices,
                    backgroundColor: 'yellow',
                    borderColor: 'dodgerblue',
                    borderWidth: 3,
                    pointRadius: 1,
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Year || Month || Day'
                            
                        }
                    },
                    y: {}
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
$form.addEventListener("submit", renderData);

$infoBtn.addEventListener("click",() => {
    $cryptoBox.classList.toggle("show")
    $info.classList.toggle("show2")
})  
