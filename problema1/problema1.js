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