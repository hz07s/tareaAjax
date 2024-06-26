var regions_sel = [];
var regions_list = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('../src/data.json')
    .then(response => response.json())
    .then(data => {
        regions_list = data.map(region => region.region);
        const regionDropdown = document.getElementById('regions');
        
        regionDropdown.innerHTML = '';

        regions_list.forEach(region => {
            const option = document.createElement('option');
            option.text = region;
            regionDropdown.add(option);
        });
    })
    .catch(error => console.error('Error loading data:', error));
});

function agregarRegion() {
    var select = document.getElementById("regions");
    var reg_sel = select.value;
    var containers = document.querySelectorAll('.regions_s');
    var container;

    containers.forEach(function(div) {
        if (div.querySelectorAll('.div-region').length < 4) {
            container = div;
        }
    });

    if (!container && regions_sel.length % 4 === 0) {
        new_div = document.createElement('div');
        new_div.className = 'regions_s';
        var divs_reg = document.getElementById('divs_reg');
        divs_reg.appendChild(new_div);
        container = new_div;
    }

    if (!regions_sel.includes(reg_sel)) {
        regions_sel.push(reg_sel);
        console.log('Agregado: ', reg_sel);
        console.log(regions_sel);

        var label = document.createElement('label');
        label.textContent = reg_sel;
        label.className = 'lab_reg';

        var button = document.createElement('button');
        button.textContent = 'Eliminar';
        button.className = 'del_button';

        button.addEventListener('click', function() {
            var index = regions_sel.indexOf(reg_sel);
            if (index !== -1) {
                regions_sel.splice(index, 1);
            }
            div.remove();
            generarGrafica(regions_sel);
        });

        var div = document.createElement('div');
        div.className = 'div-region';
        div.appendChild(label);
        div.appendChild(button);

        container.appendChild(div);
        generarGrafica(regions_sel);
    }
}

function generarGrafica(regions_selx) {
    subgrupo = 'confirmed';

    fetch('../src/data.json')
    .then(response => response.json())
    .then(data => {
        let datasets = [];

        regions_selx.forEach(region => {
            let regionData = data.find(entry => entry.region === region);
            if (!regionData) {
                console.error(`No hay datos disponibles para la región ${region}.`);
                return;
            }

            let regionValues = regionData[subgrupo].map(entry => parseInt(entry.value));
            datasets.push({
                label: region,
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