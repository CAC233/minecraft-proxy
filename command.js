/**
 * Created by bangbang on 15/01/27.
 */
var fs = require('fs');
var net = require('net');

process.stdin.resume();
process.stdin.on('data', function (data){
    data = data.toString().split(' ');
    switch(data[0].toLowerCase().trim()){
        case 'reload':
            fs.readFile('config.json', 'utf8', function (err, data){
                if (err){
                    console.error(err);
                } else {
                    try{
                        global.Config = JSON.parse(data);
                        console.log('重载配置成功');
                        console.log(global.Config);
                    }catch(e){
                        console.trace(e);
                    }
                }
            });
            break;
        case 'banip':
            var ip = data[1];
            if (net.isIP(ip) === 0){
                console.log('please input a ip');
                break;
            } else {
                global.Config['ban']['ip'].push(ip.trim());
                writeConfig();
            }
            break;
        case 'stop':
            process.exit();
            break;
        case 'limitip':
            ip = data[1].trim();
            var limit = data[2];
            if (net.isIP(ip) === 0){
                console.log('please input a ip');
                break;
            }
            if (!limit || isNaN(limit = parseInt(limit))){
                console.log('please input a limit number');
                break;
            }
            global.Config['ipLimit'][ip] = limit;
            writeConfig();
            break;
        case 'list':
            var connections = global.connections;
            for (var i in connections){
                console.log()
            }
    }
});

function writeConfig(){
    fs.writeFile('config.json', JSON.stringify(global.Config));
}