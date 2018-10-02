var log = document.getElementById('output');
log.innerHTML = 'Hei!';

function onButtonClick() {
    log.innerHTML ='Requesting Bluetooth Device...';
    navigator.bluetooth.requestDevice(
            { filters: [{ services: ['battery_service'] }] })
        .then(device => {
            log.innerHTML += '<br /> Connecting to GATT Server...';
            return device.gatt.connect();
        })
        .then(server => {
            log.innerHTML += '<br />Getting Battery Service...';
            return server.getPrimaryService('battery_service');
        })
        .then(service => {
            log.innerHTML += '<br />Getting Battery Level Characteristic...';
            return service.getCharacteristic('battery_level');
        })
        .then(characteristic => {
            log.innerHTML += '<br />Reading Battery Level...';
            return characteristic.readValue();
        })
        .then(value => {
            let batteryLevel = value.getUint8(0);
            log.innerHTML += '<br /> Battery Level is ' + batteryLevel + '%';
        })
        .catch(error => {
            log.innerHTML += '<br />Argh! ' + error;
        });
}
//function onButtonClick() {


//    log.innerHTML='Requesting Bluetooth Device...';
//    navigator.bluetooth.requestDevice({
//        acceptAllDevices: true,
//        optionalServices: ['battery_service']
//    })
//        .then(device => {
//            log.innerHTML += '> Name:             ' + device.name;
//            log.innerHTML += '> Id:               ' + device.id;
//            log.innerHTML += '> Connected:        ' + device.gatt.connected;
//        })
//        .catch(error => {
//            log.innerHTML += 'Argh! ' + error;
//        });
//}