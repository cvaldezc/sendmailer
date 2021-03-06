var nodemailer = require("nodemailer");

exports.sendmail = function (request:any, response:any) {

    // {
    //     "to": "cvaldezchavez@gmail.com",
    //     "subject": "test for send mail",
    //     "cc": "cvaldezch@outlook.com",
    //     "cco": "foxtime03@gmail.com",
    //     "body": "<strong>Hi! this is body test from node.</strong>",
    //     "status": true
    // }
    // console.log(request.query);
    var kwargs: any;
    if (request.query.hasOwnProperty('mail')){
        kwargs = JSON.parse(request.query["mail"]);
        if (typeof kwargs == "string"){
            kwargs = JSON.parse(kwargs);
            console.info('typo de object' + typeof kwargs );
        }
    }else{
        // empty
        kwargs = {}
    }
    // prepare data for send mail
    var auth: object = {};
    var property: string = "";
    // set property header mail
    property = "ICR PERU noreply <noreply@icrperusa.com>";
    // set credential from default mail
    auth['user'] = 'info@icrperusa.com';
    auth['pass'] = 'AHuachipa120';

    // init service smtp
    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: auth
    });

    var options: object = {};
    options['from'] = property;
    // valid param to mail
    if (kwargs.hasOwnProperty('to')){
        options['to'] = kwargs['to'];
    }else{
        kwargs['raise'] = 'not found destinary mail';
    }
    // valid param to subject
    if (kwargs.hasOwnProperty('subject')){
        options['subject'] = kwargs['subject'];
    }else{
        kwargs['raise'] = 'not define an subject';
    }
    // valid fields cc
    if (kwargs.hasOwnProperty('cc')){
        options['cc'] = kwargs['cc'];
    }
    // valid fields cco
    if (kwargs.hasOwnProperty('cco')){
        options['cco'] = kwargs['cco'];
    }
    // valid files attach
    if (kwargs.hasOwnProperty('attach')){
        // correct its line no work
        options['attach'] = kwargs['attach'];
    }
    // add body in html
    if (kwargs.hasOwnProperty('body')){
        options['html'] = kwargs['body'];
    }
    // console.info('Type of parameter ' + typeof(request.param));
    // console.info('Type of parameter ' + typeof(request.params));

    response.setHeader('Content-Type', 'text/plain');
    response.type('text/plain');
    console.warn(options);
    if (!kwargs.hasOwnProperty('raise')){
        smtpTransport.sendMail(options, function (error, result) {
            console.error(error);
            if (error){
                kwargs['status'] = false;
                kwargs['raise'] = error;
                console.error("Error message send: " + result);
            }else{
                kwargs['status'] = true;
            }
            response.jsonp(kwargs);
        });
    }else{
        response.jsonp(kwargs);
    }
}
