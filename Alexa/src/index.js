// Based on Brown Bear Alexa sample skill
// see https://amzn.com/0805047905

var AWS = require('aws-sdk');

exports.handler = function( event, context ) {
    var say = "";
    var endsession = false;
    var sessionAttributes = {};
    var mySickness = "asthma";
    var myDescriptor = "terrible";

    if (event.session.attributes) {
        sessionAttributes = event.session.attributes;
    }

    if (event.request.type === "LaunchRequest") {
        say = "Welcome! How is your health today, human? ";

    } else {
        var IntentName = event.request.intent.name;

        if (IntentName === "ISeeIntent") {

            if(event.request.intent.slots.Sickness.value && event.request.intent.slots.Descriptor.value) {

               mySickness  = event.request.intent.slots.Sickness.value;
               myDescriptor = event.request.intent.slots.Descriptor.value;

               if (!sessionAttributes.myList)  {sessionAttributes.myList = []; }

               sessionAttributes.myList.push(myDescriptor + " " + mySickness);




               say = "I am sorry about your " + myDescriptor + " " + mySickness + ". Do you require medical assistance, or do "
                + "you have another health issue to report?";

            } else {
                say = "you can say things like, I am having issues with my breathing.";
            }

        } else if (IntentName === "EndIntent") {
            say = "I wish you good health in future.";
            endsession = true;

        } else if (IntentName === "AmbulanceIntent") {
            say = "An ambulance is en route."
        }
    }

    var response = {
        outputSpeech: {
            type: "PlainText",
            text: say
        },
        shouldEndSession: endsession
    };

    // may uncomment to add AWS SQS sendMessage.  Be sure to adjust the QueueUrl with your own AWS Account Number.

    // var sqs_params = {
    //    QueueUrl: "https://sqs.us-east-1.amazonaws.com/333304289633/AlexaQueue",
    //    MessageBody: "https://www.google.com/search?tbm=isch&q=" + myColor + "%20" + myAnimal  // Image Search URL
    // }
    //
    // var sqs = new AWS.SQS({region : 'us-east-1'}).sendMessage(sqs_params);
    //
    // sqs.on('success', function() {

            // this line terminates the Lambda function.
            // It should be moved to within the deepest level of any nested asynchronous callbacks you add.
            context.succeed( {sessionAttributes: sessionAttributes, response: response } );

    // may uncomment to complete callback to SQS
    // });
    // sqs.send();



};
