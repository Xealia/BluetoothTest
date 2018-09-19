var log = document.getElementById('output');

function onButtonClick() {
    log.innerHTML = 'Hei!';

    //let filters = [];

    //let filterService = document.querySelector('#service').value;
    //if (filterService.startsWith('0x')) {
    //    filterService = parseInt(filterService);
    //}
    //if (filterService) {
    //    filters.push({ services: [filterService] });
    //}

    //let filterName = document.querySelector('#name').value;
    //if (filterName) {
    //    filters.push({ name: filterName });
    //}

    //let filterNamePrefix = document.querySelector('#namePrefix').value;
    //if (filterNamePrefix) {
    //    filters.push({ namePrefix: filterNamePrefix });
    //}

    //let options = {};
    //if (document.querySelector('#allDevices').checked) {
    //    options.acceptAllDevices = true;
    //} else {
    //    options.filters = filters;
    //}

    //console.log('Requesting Bluetooth Device...');
    //console.log('with ' + JSON.stringify(options));
    navigator.bluetooth.requestDevice({ filters: [{ service: "heart_rate" }] })
        .then(device => {
            log.innerHTML = '> Name:             ' + device.name;
            log.innerHTML += '> Id:               ' + device.id;
            log.innerHTML += '> Connected:        ' + device.gatt.connected;
        })
        .catch(error => {
            log.innerHTML = 'Argh! ' + error;
        });
}