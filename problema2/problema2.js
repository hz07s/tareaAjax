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

        
}