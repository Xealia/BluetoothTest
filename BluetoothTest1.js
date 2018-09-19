function onButtonClick() {

    var log = document.getElementById('output').innerHTML;

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
            log = '> Name:             ' + device.name;
            log += '> Id:               ' + device.id;
            log += '> Connected:        ' + device.gatt.connected;
        })
        .catch(error => {
            log = 'Argh! ' + error;
        });
}