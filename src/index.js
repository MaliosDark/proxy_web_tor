/*
############################
# Proxy Web with Tor
# 
# Developer: Andryu Schittone
# Version: 1.0.0
# Description: Proxy web based on Node.js utilizing Tor for country switching.
# 
# License:
# 
# This project is licensed under the MIT License. See the LICENSE file for details.
# 
# Terms and Conditions:
# 
# 1. The use of this software is permitted for educational and non-commercial purposes.
# 
# 2. It is strictly prohibited to use this software for any illegal activities or malicious purposes.
# 
# 3. The user agrees to use this software responsibly and in compliance with all applicable laws and regulations.
# 
# 4. The owner of this software, Andryu Schittone, is not liable for any damages or legal issues arising from the use of this software.
# 
# 5. By using this software, the user automatically agrees to these terms and conditions.
# 
# Note: This software is provided as is, without any warranty or guarantee of its performance or reliability.
# 
##################################################################
*/


const express = require('express');
const torRequest = require('tor-request');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configuración de Tor
torRequest.setTorAddress('127.0.0.1', 9050); // Configura la dirección y el puerto de Tor

// Página principal para ingresar la URL
app.get('/', (req, res) => {
  res.render('index', { error: null });
});

// Ruta para procesar la solicitud de navegación
app.get('/proxy/browse', (req, res) => {
  const url = req.query.url;
  if (!url || !isValidUrl(url)) {
    res.render('index', { error: 'URL inválida' });
  } else {
    res.render('redirect', { url });
  }
});

// Ruta para redirigir y renderizar el contenido del proxy
app.get('/proxy/render', (req, res) => {
    const url = req.query.url;
    if (!url || !isValidUrl(url)) {
      res.render('index', { error: 'URL inválida' });
    } else {
      // Realizar la solicitud a través de Tor utilizando la URL proporcionada
      torRequest.request(url, (error, response, body) => {
        if (error) {
          console.error('Error al navegar a través de Tor:', error);
          res.status(500).send('Error interno del servidor');
        } else {
          // Realizar una solicitud a una API que devuelva información sobre la IP de conexión
          torRequest.request('https://api.ipify.org/?format=json', (error, _response, ipBody) => {
            if (error) {
              console.error('Error al obtener información de la IP:', error);
              res.status(500).send('Error interno del servidor');
            } else {
              // Analizar la respuesta JSON de la IP
              const ipInfo = JSON.parse(ipBody);
              // Renderizar la página de resultado con el contenido recibido del proxy y la información de la IP
              res.render('proxyResult', { body, ipInfo });
            }
          });
        }
      });
    }
  });
  
// Ruta para reiniciar la IP
app.get('/restartTor', (req, res) => {
  // Enviar una solicitud para reiniciar la conexión Tor
  torRequest.renewTorSession((error) => {
    if (error) {
      console.error('Error al reiniciar la conexión Tor:', error);
      res.status(500).send('Error interno del servidor al reiniciar Tor');
    } else {
      console.log('Conexión Tor reiniciada correctamente');
      res.send('Conexión Tor reiniciada correctamente');
    }
  });
});

// Función para validar la URL
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

// Ruta para obtener información sobre la IP de conexión y su estado
app.get('/ipinfo', (req, res) => {
    // Realizar una solicitud a una API que devuelva información sobre la IP de conexión
    torRequest.request('https://api.ipify.org/?format=json', (error, _response, body) => {
      if (error) {
        console.error('Error al obtener información de la IP:', error);
        res.status(500).send('Error interno del servidor');
      } else {
        // Analizar la respuesta JSON
        const ipInfo = JSON.parse(body);
        // Renderizar la página con la información de la IP
        res.render('proxyResult', { ipInfo });
      }
    });
  });


  

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor proxy web escuchando en el puerto ${PORT}`);
});
