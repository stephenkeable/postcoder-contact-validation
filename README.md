# Postcoder contact validation

Simple node wrapper for email and mobile validation endpoints of the PostCoder Web API from Allies.

[Find out more about the email validation API](https://developers.alliescomputing.com/postcoder-web-api/email-validation)  
[Find out more about the mobile validation API](https://developers.alliescomputing.com/postcoder-web-api/mobile-validation)

[Sign up for a trial to get an API key](https://www.alliescomputing.com/postcoder/sign-up)

**Note: This is a paid for API**

[For full developer documentation](https://developers.alliescomputing.com)

## Install

`npm install postcoder-contact-validation`

https://www.npmjs.com/package/postcoder-contact-validation

### Basic email validation usage

```javascript
var contactValidation = require("postcoder-contact-validation");

contactValidation.init("[YOUR API KEY HERE]");

contactValidation.validateEmail("test@domain.com", function(result, error) {

    if (error) {
        console.log(error);
    } else {
        // returns an object with a Boolean property "valid" along with additional information
        console.log(result);
    }

});
```

[Full list of response fields for email validation](https://developers.alliescomputing.com/postcoder-web-api/email-validation)

### Basic mobile validation usage

```javascript
var contactValidation = require("postcoder-contact-validation");

contactValidation.init("[YOUR API KEY HERE]");

contactValidation.validateMobile("+447700900722", function(result, error) {

    if (error) {
        console.log(error);
    } else {
        // returns an object with a Boolean property "valid" along with additional information
        console.log(result);
    }

});
```

[Full list of response fields for mobile validation](https://developers.alliescomputing.com/postcoder-web-api/mobile-validation)

### Check status of your API key

Returns an object with information about number of credits on your account and more

[Full list of fields returned](https://developers.alliescomputing.com/postcoder-web-api/error-handling)

```javascript
var address_lookup = require("postcoder-geocoding");

address_lookup.init("[YOUR API KEY HERE]");

address_lookup.checkStatus(function(result, error) {

    if (error) {
        console.log(error);
    } else {
        // returns an object with information about number of credits on your account and more
        console.log(result);
    }

});
```

### Note about support

This is a community supported package, maintained by [Stephen Keable](https://github.com/stephenkeable)
