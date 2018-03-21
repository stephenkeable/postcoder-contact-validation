"use strict";

var request = require('request');
var qs = require('qs');

/*

Create instance and basic default options

*/

var AlliesContactValidation = function () {
    
    if (!(this instanceof AlliesContactValidation)) {
        
        return new AlliesContactValidation();
    }
    
    var config = {
        url_base: "https://ws.postcoder.com/pcw/"
    };
    
    this.config = config;
    
}

/*

Init function

Sets up API key (required, will default to Test key if not supplied)

Optional

Options object which is turned into query string parameters
Debug use true to check search key against status service and console.log the result

*/

AlliesContactValidation.prototype.init = function (api_key, debug) {
    
    if (typeof api_key === "string") {
        this.config.api_key = api_key;
    } else {
        this.config.api_key = "PCW45-12345-12345-1234X";
    }
    
    this.config.debug = debug || false;
    
    if (this.config.debug === true) {
    
        this.checkStatus(function(response, error) {

            if(error) {
                
                console.log(error);   
                
            } else {
            
                console.log(response);
            }
        });
        
    }
    
};

/*

Status endpoint give information about number of credits available amongst others

*/

AlliesContactValidation.prototype.checkStatus = function (callback) {
  
    var request_url = this.config.url_base + this.config.api_key + "/status";
    
    send_request(request_url, function(result, error) {

        return callback(result, error);
        
    });
    
};

/*

Email validation

*/

AlliesContactValidation.prototype.validateEmail = function (email_address, callback) {
    
    var email_address = email_address || false;
    
    if(trim_check(email_address) !== false) {
    
        var request_url = this.config.url_base + this.config.api_key + "/emailaddress/" + encodeURIComponent(email_address) + "?" + qs.stringify(this.config.options);

        send_request(request_url, function(result, error) {

            return callback(result, error);

        }); 
        
    } else {
        
        var error_response = {
            http_status: 404,
            error_body: "No email address parameter supplied"
        };
        
        return callback(false, error_response);
    }
    
};

/*

Mobile validation

*/

AlliesContactValidation.prototype.validateMobile = function (mobile_number, callback) {
    
    var mobile_number = mobile_number || false;
    
    if(trim_check(mobile_number) !== false) {
    
        var request_url = this.config.url_base + this.config.api_key + "/mobile/" + encodeURIComponent(mobile_number) + "?" + qs.stringify(this.config.options);

        send_request(request_url, function(result, error) {

            return callback(result, error);

        });
        
    } else {
        
        var error_response = {
            http_status: 404,
            error_body: "No mobile number parameter supplied"
        };
        
        return callback(false, error_response);
    }
    
};

/* 

Internal helper functions

*/

function send_request(request_url, callback) {
    
    // Could probably get rid of dependency on the 'request' library to be honest
    
    request(request_url, function (error, response, body) {

        if (!error && response.statusCode == 200) {

            // Convert response into a JSON object
            var status_response = JSON.parse(body);
            
            return callback(status_response, false);
            
        } else {
            if (error) {
            
                return callback(false, error);
                
            } else {
                
                var error_response = {
                    http_status: response.statusCode,
                    error_body: body
                };
            
                return callback(false, error_response);
            }

        }

    });
    
}

function trim_check(text) {
    
    if(text === false) {
        return false;
    } else if (text.trim() == "") {
        return false;
    } else {
        return true
    }
    
}

module.exports = new AlliesContactValidation();