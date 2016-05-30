var http = require("http");
var r=require('rethinkdb');
var sendgrid  = require('sendgrid')('unallave');
var config = require('./config.json');
var _=require('underscore');
var bluebird=require('bluebird');
var prettyjson=require('prettyjson');
var fs = require('fs');
var ejs = require('ejs');
var express = require('express');
var request = require('request');
	
r.connect(config.rethinkdb, function(err, conn) {
		if (err) throw err      
		  connection = conn;  
		
		r.db('midb').table('mitabla').changes().run(connection, function(err, cursor) {
			cursor.each(function(error, row) {
				if(error) throw error;
				
				/* old */
				var old_info  = row.old_val;				
				var promocion = row.new_val;
				console.log(promocion);
				if(_.isUndefined(old_info)) {
					
					promocion.nueva = true;
				}

				if(!(_.isUndefined(promocion)) && promocion) {
					if(!promocion.nueva) {
						console.log('Anterior: ');
						console.log(prettyjson.render(old_info));
					}
					console.log('Nuevo: ');
					console.log(prettyjson.render(promocion, {indent: 4}));

						
						var email = new sendgrid.Email();
							email.from = "Mi servidor;
							email.to = correo@gmail.com;
							email.subject="sender";
							email.text= "text";
							email.addFilter('templates', 'enable', 1);
							email.addFilter('templates', 'template_id', '123');
							email.addSubstitution("%algo%", "123");
								
							// SE REALIZA EL ENVIO CON LOS PARAMETROS ANTERIORES
							sendgrid.send(email, function(error, info){
								if(error){
									return console.log(error);
								}
								console.log('Mensaje Enviado !!!: ' + info.response);
								
							});

					}											
				}
			});
		});
});	
	

