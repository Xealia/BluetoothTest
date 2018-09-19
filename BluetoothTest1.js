var log = document.getElementById('output');
log.innerHTML = 'Hei!';

//function onButtonClick() {
//    log ='Requesting Bluetooth Device...';
//    navigator.bluetooth.requestDevice(
//            { filters: [{ services: ['battery_service'] }] })
//        .then(device => {
//            log += '<br /> Connecting to GATT Server...';
//            return device.gatt.connect();
//        })
//        .then(server => {
//            log += '<br />Getting Battery Service...';
//            return server.getPrimaryService('battery_service');
//        })
//        .then(service => {
//            log += '<br />Getting Battery Level Characteristic...';
//            return service.getCharacteristic('battery_level');
//        })
//        .then(characteristic => {
//            log += '<br />Reading Battery Level...';
//            return characteristic.readValue();
//        })
//        .then(value => {
//            let batteryLevel = value.getUint8(0);
//            log += '<br /> Battery Level is ' + batteryLevel + '%';
//        })
//        .catch(error => {
//            log += '<br />Argh! ' + error;
//        });
//}
function onButtonClick() {


    log.innerHTML='Requesting Bluetooth Device...';
    navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        services: ['heart_rate'],
        optionalServices: ['battery_service']
    })
        .then(device => {
            log.innerHTML += '> Name:             ' + device.name;
            log.innerHTML += '> Id:               ' + device.id;
            log.innerHTML += '> Connected:        ' + device.gatt.connected;
        })
        .catch(error => {
            log.innerHTML += 'Argh! ' + error;
        });
}