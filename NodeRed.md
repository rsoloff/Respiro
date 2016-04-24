Bluemix NodeRED data 

Bluemix node-red: [{"id":"4f7c85b0.6389fc","type":"http in","
z":"d2d9a92b.fc3568","name":"TwilioSMS Web","url":"/twiliosms"
,"method":"post","swaggerDoc":"","x":91.75,"y":269.25,
"wires":[["eeaa25f.10218d8"]]},{"id":"eeaa25f.10218d8",
"type":"function","z":"d2d9a92b.fc3568",
"name":"Process SMS","func":"
// Process SMS request and create response\n// 
If SMS starts with READ (match is case insensitive) then use rest to access\n
// a global context to read a previously stored value from a sensor\n// 
If READ not found then just returns what you sent\nvar responseMsg = \"\";\
nvar smsMsg = msg.payload.Body;\n\n// Create JSON object for payload response\nvar messageObj = 
{ \"Message\": smsMsg.toLowerCase() } ;\n\n// Need to return received msg object, but with new payload\
nmsg.payload = messageObj;\n\nvar split = msg.payload.Message.split(\"/\");\nvar sympton = split[0];\
nvar severity = parseInt(split[1]);\nif (sympton === \"asthma\" || sympton === \"coughing\" || sympton === \"sneezing\" 
|| sympton === \"breathing\" && severity >= 1 && severity <= 5) {\n return msg;\n}",
"outputs":"1","noerr":0,"x":294.75,"y":269.25,"wires":[["ee29da1e.a0bcb8","ee83ada7.196c2","b7e25a2f.5b1cd8"]]},
{"id":"e4f03abb.83afe8","type":"http response",
"z":"d2d9a92b.fc3568","name":"Send TwiML","x":913.75,"y":266.25,"wires":[]},
{"id":"b7e25a2f.5b1cd8","type":"cloudant out","z":"d2d9a92b.fc3568","name":"nosql",
"cloudant":"","database":"nosql","service":"Respiro-cloudantNoSQLDB","payonly":true,"operation"
:"insert","x":678.375,"y":204.25,"wires":[]},{"id":"ee83ada7.196c2","type":"xml","z":"d2d9a92b.fc3568"
,"name":"","attr":"","chr":"","x":700.5,"y":268,"wires":[["e4f03abb.83afe8"]]},{"id":"ee29da1e.a0bcb8","type":"debug"
,"z":"d2d9a92b.fc3568","name":"","active":true,"console":"true","complete":"payload","x":524.5,"y":343,"wires":[]},
{"id":"48c5184d.5faec8","type":"cloudant in","z":"d2d9a92b.fc3568","name":"","cloudant":"","database":"nosql","service"
:"Respiro-cloudantNoSQLDB","search":"all","design":"","index":"","x":341.5,"y":502,"wires":[["c0a34502.2236e8"]]},
{"id":"dc94f28b.eaaef","type":"http in","z":"d2d9a92b.fc3568","name":"","url":"/getdata","method":"get",
"swaggerDoc":"","x":111.5,"y":501,"wires":[["48c5184d.5faec8"]]},{"id":"c0a34502.2236e8","type":"http response"
,"z":"d2d9a92b.fc3568","name":"","x":625.5,"y":503,"wires":[]}]
