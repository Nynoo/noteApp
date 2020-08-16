const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

// Initiliazations (inicializaciones)

const app = express();
require('./database');

// Settings (configuraciones, de motor de plantillas, en donde estn las vistas, o cualquier otro asunto con la aplicacion de manera general, con el framework en si)

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));// pordefecto no se tendria que espesificar la posicion de la carpeta views ya que node supone que esta en la carpeta prinsipal noteApp/, pero el codigo esta en la carpera src/, path.join() permite unir directorios, la constante de node "__dirname" entrega la carpeta donde se esta ejecutando el archivo, entonces aqui devuelve src/, y join la concatena con 'views', asi que el comando le dice a node que la carpeta 'views' esta en src/views
//configurar handlebars
app.engine('.hbs'/*el nombre de como se llamaran los archivos de las vistas, en este caso son archivos de handlebar que son .hbs*/, exphbs({
    // objeto de configuracion
    defaultLayout: 'main',// se señana el archivo principal de las vista, es decir, el marco que se repetira constantemente en las vistas, por ejemplo la franja de navegacion, etc; esto sera la platilla principal de la aplicacion.
    layoutsDir: path.join(app.get('views'), 'layouts'),// señala al direccion de la captera layouts para que se ubique el motor express-handlebars
    partialsDir: path.join(app.get('views'), 'partials'),//partials son peuqeñas partes de html que se pueden reutilizar en diferentes vistas, por ejemplo un formulario de contacto que se quiere poner en muchas vistas de html, en partialsDir se señala la direccion de estos archivos
    extname: '.hbs'//se indica que extension tendra los archivos
}));
app.set('view engine', '.hbs');//para configurar el motor de las vistas,y el motor de las vitas que se va a utilizar es .hbs

// Middlewares (todas las funciones que seran ejecutadas antes que llegen al servidor, o cuando llegen al servidor antes de pasarselas las rutas)



// Global Variables (colocar datos que toda la aplicacion pueda acceder)



// Routes (Rutas)

app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// Static Files (Configurar donde estara la carpeta de archivos estaticos)

app.use(express.static(path.join(__dirname, 'public')));

// Server is listenning (iniciar servidor)

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});