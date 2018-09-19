var log = document.getElementById('output');
    log.innerHTML = 'Hei!';

function onButtonClick() {
    log ='Requesting Bluetooth Device...';
    navigator.bluetooth.requestDevice(
            { filters: [{ services: ['battery_service'] }] })
        .then(device => {
            log += '<br /> Connecting to GATT Server...';
            return device.gatt.connect();
        })
        .then(server => {
            log += '<br />Getting Battery Service...';
            return server.getPrimaryService('battery_service');
        })
        .then(service => {
            log += '<br />Getting Battery Level Characteristic...';
            return service.getCharacteristic('battery_level');
        })
        .then(characteristic => {
            log += '<br />Reading Battery Level...';
            return characteristic.readValue();
        })
        .then(value => {
            let batteryLevel = value.getUint8(0);
            log += '<br /> Battery Level is ' + batteryLevel + '%';
        })
        .catch(error => {
            log += '<br />Argh! ' + error;
        });
}
//function onButtonClick() {

//    let filters = [];

//    let filterService = document.querySelector('#service').value;
//    if (filterService.startsWith('0x')) {
//        filterService = parseInt(filterService);
//    }
//    if (filterService) {
//        filters.push({ services: [filterService] });
//    }

//    let filterName = document.querySelector('#name').value;
//    if (filterName) {
//        filters.push({ name: filterName });
//    }

//    let filterNamePrefix = document.querySelector('#namePrefix').value;
//    if (filterNamePrefix) {
//        filters.push({ namePrefix: filterNamePrefix });
//    }

//    let options = {};
//    if (document.querySelector('#allDevices').checked) {
//        options.acceptAllDevices = true;
//    } else {
//        options.filters = filters;
//    }

//    log.innerHTML('Requesting Bluetooth Device...');
//    log.innerHTML('with ' + JSON.stringify(options));
//    navigator.bluetooth.requestDevice(options)
//        .then(device => {
//            log.innerHTML = '> Name:             ' + device.name;
//            log.innerHTML += '> Id:               ' + device.id;
//            log.innerHTML += '> Connected:        ' + device.gatt.connected;
//        })
//        .catch(error => {
//            log.innerHTML = 'Argh! ' + error;
//        });
//}