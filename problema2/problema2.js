function generarGrafica() {
    const subgrupo = 'confirmed';

    fetch('../src/data.json')
    .then(response => response.json())
    .then(data => {
        let datasets = [];
        const regionsToInclude = data.filter(entry => entry.region !== 'Lima' && entry.region !== 'Callao');

        regionsToInclude.forEach(regionData => {
            let regionValues = regionData[subgrupo].map(entry => parseInt(entry.value));
            datasets.push({
                label: regionData.region,
                data: regionValues,
                borderColor: getRandomColor(),
                backgroundColor: getRandomColor(0.1),
                borderWidth: 1
            });
        });

        let dates = data[0][subgrupo].map(entry => entry.date);

        let ctx = document.getElementById(subgrupo).getContext('2d');
        if (window.myChart) {
            window.myChart.destroy();
        }
        window.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: datasets
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: `Gráfico de ${subgrupo}`
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error loading data:', error));
}

function getRandomColor(alpha = 1) {
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${alpha})`;
}