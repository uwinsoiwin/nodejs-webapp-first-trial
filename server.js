
var oracledb = require('oracledb');
var fs = require('fs');
var myDate = "";
var http = require('http');
var server = http.createServer(function (req, res) {
    var myPath = req.url;
    var body = [];
    if (req.method.toLowerCase() === 'get') {
        req.on('error', function (err) {
            console.error(err);
        }).on('data', function (chunk) {
            body.push(chunk);
        }).on('end', function () {
            var sf = (myPath.toString()).replace('/', '');
            var stream = fs.createReadStream(sf);
            stream.pipe(res);
        });
    } else if (req.method.toLowerCase() === 'post') {
        var pkvalue = (myPath.toString()).split("=");
        body = pkvalue[1].split(":");
        var mysql = "SELECT COUNT(*) FROM DUAL WHERE EXISTS (SELECT USERID FROM SECURITY.USERS_MAS WHERE USERID='" + body[0] + "' AND PWD='" + body[1] + "')";
        var connection = oracledb.getConnection(
                {
                    user: "BULKUID",
                    password: "PSCBULK",
                    connectString: "192.168.3.2:1521/pavan"
                }, function (err, connection) {
            if (err) {
                console.error('pavan:', err);
                return;
            }
                    connection.execute(mysql,
                            function (err, result) {
                                if (err) {
                                    connection.close(function (err) {
                                        if (err) {
                                            console.error('pavan:', err);
                                        }
                                    });
                                    console.error('pavan:', err);
                                    return;
                                }
                                else {var sf = (result.rows).toString();res.write(sf);res.end();}
                            });
        });

    }
});
server.listen(8080);
