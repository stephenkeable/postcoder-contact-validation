"use strict";

var assert = require('assert');

describe('AlliesContactVaidation', function() {
   
    describe('.init()',function() {
        
        it("Should default to the test key, when no key passed", function() {
       
            var contact_validation = require("../");
            contact_validation.init();
            
            assert.equal("PCW45-12345-12345-1234X", contact_validation.config.api_key);
            
        });
        
        it("Should default to the test key, when non string passed", function() {
       
            var contact_validation = require("../");
            contact_validation.init(3);
            
            assert.equal(contact_validation.config.api_key, "PCW45-12345-12345-1234X");
            
        });
        
        it("Should use the key passed when is string", function() {
       
            var contact_validation = require("../");
            contact_validation.init("ABC45-56789-12345-1234X");
            
            assert.equal(contact_validation.config.api_key, "ABC45-56789-12345-1234X");
            
        });
        
        it("Should console.log info about api_key being used when passing true in third parameter");
        
    });
    
    describe('.checkStatus()',function() {
       
        it("Should return result object and false for error.", function(done) {
       
            var contact_validation = require("../");
            
            contact_validation.init();
            
            contact_validation.checkStatus( function(result, error) {
            
                assert.equal(typeof result, "object");
                assert.equal(error, false);
                
                done();
                
            });
            
        });
       
        it("Should fail when can't reach API, needs way of simulating broken connection");
        
        it("Should inform you when using test key", function(done) {
       
            var contact_validation = require("../");
            
            contact_validation.init();
            
            contact_validation.checkStatus( function(result, error) {
            
                assert.equal(result.state, "Test Key");
                assert.equal(result.correctsearchkey, true);
                
                done();
                
            });
            
        });
       
        it("Should inform you when using incorrect key", function(done) {
       
            var contact_validation = require("../");
            
            contact_validation.init("rsetghtdejgkfk");
            
            contact_validation.checkStatus( function(result, error) {
            
                assert.equal(result.state, "Incorrect Search Key");
                assert.equal(result.correctsearchkey, false);
                
                done();
                
            });
            
        });
        
    });
    
    describe('.validateEmail()',function() {
       
        it("Should return result object with valid=true when using the test API key", function(done) {
       
            var contact_validation = require("../");
            
            contact_validation.init();
            
            contact_validation.validateEmail("sales@alliescomputing.com", function(result, error) {
            
                assert.equal(typeof result, "object");
                assert.equal(result.valid, true);
                
                done();
                
            });
            
        });
       
        it("Should return error.http_code=404 for blank email address", function(done) {
       
            var contact_validation = require("../");
            
            contact_validation.init();
            
            contact_validation.validateEmail("", function(result, error) {
                
                assert.equal(error.http_status, 404);
                
                done();
                
            });
            
        });
        
    });
    
    describe('.validateMobile()',function() {
       
        it("Should return result object with valid=true when using the test API key", function(done) {
       
            var contact_validation = require("../");
            
            contact_validation.init();
            
            contact_validation.validateMobile("+447700900535", function(result, error) {
            
                assert.equal(typeof result, "object");
                assert.equal(result.valid, true);
                
                done();
                
            });
            
        });
       
        it("Should return error.http_code=404 for blank mobile number", function(done) {
       
            var contact_validation = require("../");
            
            contact_validation.init();
            
            contact_validation.validateMobile("", function(result, error) {
                
                assert.equal(error.http_status, 404);
                
                done();
                
            });
            
        });
        
    });
    
});