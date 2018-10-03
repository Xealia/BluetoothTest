var output = document.getElementById('output');
output.innerHTML = 'Hei!';

function onButtonClick() {
    output.innerHTML = 'Requesting Bluetooth Device...';
    navigator.bluetooth.requestDevice(
        {
            filters: [
                { name: 'mPower' }
            ]
        })
        .then(device => {
            output.innerHTML += '<br /> Connecting to GATT Server...';
            return device.gatt.connect();
        })
        .then(server => {
            output.innerHTML += '<br />Getting Battery Service...';
            return server.getPrimaryService('battery_service');
        })
        .then(service => {
            output.innerHTML += '<br />Getting Battery Level Characteristic...';
            return service.getCharacteristic('battery_level');
        })
        .then(characteristic => {
            output.innerHTML += '<br />Reading Battery Level...';
            return characteristic.readValue();
        })
        .then(value => {
            let batteryLevel = value.getUint8(0);
            output.innerHTML += '<br /> Battery Level is ' + batteryLevel + '%';
        })
        .catch(error => {
            output.innerHTML += '<br />Argh! ' + error;
        });
}
//function onButtonClick() {


//    output.innerHTML='Requesting Bluetooth Device...';
//    navigator.bluetooth.requestDevice({
//        acceptAllDevices: true,
//        optionalServices: ['battery_service']
//    })
//        .then(device => {
//            output.innerHTML += '> Name:             ' + device.name;
//            output.innerHTML += '> Id:               ' + device.id;
//            output.innerHTML += '> Connected:        ' + device.gatt.connected;
//        })
//        .catch(error => {
//            output.innerHTML += 'Argh! ' + error;
//        });
//}