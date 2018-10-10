async function startCharging() {
    let options = {
        filters: [{ name: "mPower" }, { services: ['0000f00d-1212-efde-1523-785fef13d123'] }],
        optionalService: ['0000f00d-1212-efde-1523-785fef13d123']
        //optionalService: ["battery_service", 0xF00D000000001212efde1523785fef13d123]
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
    //var serviceUuid = "0000f00d-1212-efde-1523-785fef13d123";
    //var characteristicUuid = "0000beef-1212-efde-1523-785fef13d123"

    let serviceUuid = "0000f00d-1212-efde-1523-785fef13d123";
    if (serviceUuid.startsWith('0x')) {
        serviceUuid = parseInt(serviceUuid);
    }

    let characteristicUuid = "0000beef-1212-efde-1523-785fef13d123";
    if (characteristicUuid.startsWith('0x')) {
        characteristicUuid = parseInt(characteristicUuid);
    }
    output.innerHTML = ('Requesting Bluetooth Device...');
    
    var device = await navigator.bluetooth.requestDevice(options);
    output.innerHTML += ('<br /> Connecting to GATT Server...');
    var server = await device.gatt.connect();
    output.innerHTML += ('<br /> Getting Service...');
    var service = await server.getPrimaryService(serviceUuid);
    output.innerHTML += ('<br /> Getting Characteristics...');
    var characteristic = await service.getCharacteristic(characteristicUuid);
    var value = await characteristic.readValue();
    console.log(value);
    characteristic = await service.getCharacteristic(characteristicUuid);
    var data = new Uint8Array([0x01, 0x03]);
    await characteristic.writeValue(data);
    

    /*
    navigator.bluetooth
        .requestDevice(options)
        .then(device => {
            output.innerHTML += ('<br /> Connecting to GATT Server...');
            return device.gatt.connect();
        })
        .then(server => {
            output.innerHTML += ('<br /> Getting Service...');
            return server.getPrimaryService(serviceUuid);
        })
        .then(service => {
            output.innerHTML += ('<br /> Getting Characteristics...');
            //if (characteristicUuid) {
            // Get all characteristics that match this UUID.
            return service.getCharacteristic(characteristicUuid);
            //}
            // Get all characteristics.
            //return service.getCharacteristics();
        })
        .then(characteristic => {
            //return characteristic.getDescriptor('00002902-0000-1000-8000-00805f9b34fb');
            var data = new Uint8Array([0x01, 0x03]);
            //var data = new Uint8Array([0x12, 0x34, 0x56, 0x78]);
            //return characteristic.readValue();
            return characteristic.writeValue(data);
            //output.innerHTML += ('<br /> Characteristics: ' +
            //    characteristics.map(c => c.uuid).join('\n' + ' '.repeat(19)));
        })
        //.then(descriptor => {
        //    //return descriptor.readValue();
        //    //let encoder = new TextEncoder('utf-8');
        //    var data = new Uint8Array([0xbb, 0x25, 0x05, 0x44]);
        //    return characteristic.writeValue(data);
        //    //var data = new Uint8Array([0x01, 0x03]);
        //    //return descriptor.writeValue(encoder.encode(0x0103));
        //    //return descriptor.writeValue(encoder.encode(0x0103));
        //    //return characteristic.StartNotifications();
        //})
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            output.innerHTML += ('<br /> Argh! ' + error);
        });
        */
}/*
    output.innerHTML = "Requesting Bluetooth Device...";
    navigator.bluetooth
        .requestDevice(options)
        .then(device => {
            output.innerHTML += "<br /> ready...";

            if (!device.gatt.connected) {
                output.innerHTML += "<br /> Connecting to GATT Server...";

                return device.gatt.connect();
            } else {
                output.innerHTML += "<br /> Already connected.";
                // Already connected.
                return Promise.resolve();
            }
        })
        .then(server => {
            output.innerHTML += "<br />Getting Battery Service...";
            //return server.getPrimaryServices();
            return server.getPrimaryService('0000f00d-1212-efde-1523-785fef13d123');
            //return server.getPrimaryService(0xF00D000000001212efde1523785fef13d123);
        })
        .then(service => {
            //console.log(services);
            //const service = services[0];
            output.innerHTML += "<br />Getting Battery Level Characteristic...";
            return service.getCharacteristic('0000beef-1212-efde-1523-785fef13d123');
        })
        .then(characteristic => {
            output.innerHTML += "<br />Reading Battery Level...";
            return characteristic.readValue();
        })
        .then(value => {
            let batteryLevel = value.getUint8(0);
            output.innerHTML += "<br /> Battery Level is " + batteryLevel + "%";
        })
        .catch(error => {
            output.innerHTML += "<br />Argh! " + error;
        });
}*/