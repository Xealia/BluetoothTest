function startCharging() {
    let options = {
        filters: [{ name: "mPower" }, { services: [0xf00d] }],
        optionalService: ["battery_service", 0xF00D000000001212efde1523785fef13d123]
    };
    var output = document.getElementById("output");
    /*navigator.bluetooth
      .requestDevice(options)
      .then(function(device) {
        output.innerHTML = "name: " + device.name;
      })
      .catch(function(error) {
        output.innerHTML = "Error: " + error;
      });*/

    output.innerHTML = "Requesting Bluetooth Device...";
    navigator.bluetooth
        .requestDevice(options)
        .then(device => {
            output.innerHTML += "<br /> Connecting to GATT Server...";
            if (!device.gatt.connected) {
                return device.gatt.connect();
            } else {
                // Already connected.
                return Promise.resolve();
            }
        })
        /*.then(server => {
            output.innerHTML += "<br />Getting Battery Service...";
            return server.getPrimaryService('0000f00d-1212-efde-1523-785fef13d123');
            //return server.getPrimaryService(0xF00D000000001212efde1523785fef13d123);
        })
        .then(service => {
            //console.log(services);
            //const service = services[0];
            output.innerHTML += "<br />Getting Battery Level Characteristic...";
            return service.getCharacteristic(0xBEEF);
        })
        .then(characteristic => {
            output.innerHTML += "<br />Reading Battery Level...";
            return characteristic.readValue();
        })
        .then(value => {
            let batteryLevel = value.getUint8(0);
            output.innerHTML += "<br /> Battery Level is " + batteryLevel + "%";
        })*/
        .catch(error => {
            output.innerHTML += "<br />Argh! " + error;
        });
}