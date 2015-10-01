// Global variables
var scene, camera, renderer;
var keyboard = new THREEx.KeyboardState();
var loader = new THREE.OBJMTLLoader();
//var loaderJ = new THREE.JSONLoader();

// Creating a Scene 
scene = new THREE.Scene();

// Camera
camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 30, 60 );
camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
                                                     
// Renderer
renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMapEnabled = true;
document.body.appendChild( renderer.domElement );

// Events
THREEx.WindowResize(renderer, camera);

// Controls 
// controls = new THREE.OrbitControls(camera, renderer.domElement);
    
// Light
var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.85 );
scene.add( hemiLight );
 
var spotLight = new THREE.SpotLight( 0xffffff, 0.4 );
spotLight.position.set( 25, 150, 55 );
spotLight.castShadow = true;
spotLight.shadowDarkness = 1;
spotLight.shadowCameraNear = 100; 
spotLight.shadowCameraFar = 300;
//spotLight.shadowCameraVisible = true;
scene.add( spotLight); 


  
// SKYDOME
//Quelle:  http://danni-three.blogspot.de/2013/09/threejs-skybox.html
var imagePrefix = "skyboxPic/trop-";
var directions  = ["left", "right", "up", "down", "front", "back"];
// var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
var imageSuffix = ".png";
var skyGeometry = new THREE.CubeGeometry( 1000, 1000, 1000 );	
	
var materialArray = [];
for (var i = 0; i < 6; i++)
	materialArray.push( new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
		side: THREE.BackSide
	}));
var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
scene.add( skyBox );



// Audio
var audio = document.createElement('audio');
var source = document.createElement('source');
source.src = 'moon.mp3';
audio.appendChild(source); 



// Hier wird der Raum erstellt und die benötigten Texturen initialisiert
// 
// 
//Texturen 
var flooringI       = THREE.ImageUtils.loadTexture('texture/zertifiziertesTropenholz.jpg');
var flooringII      = THREE.ImageUtils.loadTexture('texture/holzII.jpg');
var flooringIII     = THREE.ImageUtils.loadTexture('texture/holzI.jpg');
var flooringIV      = THREE.ImageUtils.loadTexture('texture/korkIII.jpg');
var flooringV       = THREE.ImageUtils.loadTexture('texture/teppichII.jpg');
var flooringVI      = THREE.ImageUtils.loadTexture('texture/fliesen.jpg');

var wallTextureI    = THREE.ImageUtils.loadTexture('texture/tapete_mainII.jpg');
var wallTextureII   = THREE.ImageUtils.loadTexture('texture/tapeteI.jpg');
var wallTextureIII  = THREE.ImageUtils.loadTexture('texture/tapeteII.jpg');
var wallTextureIV   = THREE.ImageUtils.loadTexture('texture/tapeteIV.jpg');
var wallTextureV    = THREE.ImageUtils.loadTexture('texture/tapeteV.jpg');
var wallTextureVI   = THREE.ImageUtils.loadTexture('texture/tapeteVI.jpg');

var wayTexture      = THREE.ImageUtils.loadTexture('texture/stoneI.jpg');
var grassTexture    = THREE.ImageUtils.loadTexture('texture/grass.jpg');


// Boden
var floor = new THREE.Mesh(new THREE.BoxGeometry(60.03,50,0.5), new THREE.MeshPhongMaterial({map: flooringI}));
floor.rotation.x = -1.57;
floor.receiveShadow = true;
scene.add( floor );

// Terrasse 
var sidewalk = new THREE.Mesh(new THREE.BoxGeometry(70,60,1), new THREE.MeshPhongMaterial({map: wayTexture}));
sidewalk.rotation.x = -1.57;
sidewalk.position.y = -0.5;
sidewalk.receiveShadow = true;
scene.add( sidewalk );

// Wiese
var grass = new THREE.Mesh(new THREE.PlaneGeometry(800,200,0), new THREE.MeshPhongMaterial({map: grassTexture}));
grass.rotation.x = -1.57;
grass.position.y = -0.2;
grass.position.z = -15;
grass.receiveShadow = true;
scene.add( grass );

// Rückwand
var wallBack = new THREE.Mesh(new THREE.BoxGeometry(60,14,1), new THREE.MeshPhongMaterial({map: wallTextureI}));
wallBack.position.z = -25;
wallBack.position.y = 5.99;
wallBack.castShadow = true;
wallBack.receiveShadow = true;
scene.add( wallBack );

// Linke Wand
var wallLeft = new THREE.Mesh(new THREE.BoxGeometry(50,14,1), new THREE.MeshPhongMaterial({map: wallTextureI}));
wallLeft.rotation.y = 1.57;
wallLeft.position.x = -30;
wallLeft.position.y = 5.99;
wallLeft.castShadow = true;
wallLeft.receiveShadow = true;
scene.add( wallLeft ); 

// Rechte Wand
var wallRight = new THREE.Mesh(new THREE.BoxGeometry(50,14,1), new THREE.MeshPhongMaterial({map: wallTextureI}));
wallRight.rotation.y = -1.57;
wallRight.position.x = 30;
wallRight.position.y = 5.99;
wallRight.castShadow = true;
//wallRight.receiveShadow = true;
scene.add( wallRight );



// Steuerung der eingebundenen Möbelstücke
// Maussteuerung zum verschieben
var EventsControls1 = new EventsControls( camera, renderer.domElement );
EventsControls1.map = floor;
EventsControls1.attachEvent( 'mouseOver', function () {

        this.container.style.cursor = 'pointer';

});

EventsControls1.attachEvent( 'mouseOut', function () {

        this.container.style.cursor = 'auto';

});

EventsControls1.attachEvent( 'dragAndDrop', function () {

        this.container.style.cursor = 'move';
        this.focused.position.y = this.previous.y;

});

EventsControls1.attachEvent( 'mouseUp', function () {

        this.container.style.cursor = 'auto';

});



// Drehen der Möbelstücke
function rotate()
{
    var delta = 0.05; // seconds.
    var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second

        if ( keyboard.pressed("A") )
            scene.getObjectByName('captain').rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);

        if ( keyboard.pressed("S") )
            scene.getObjectByName('lit').rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);

        if ( keyboard.pressed("D") )
            scene.getObjectByName('sofaI').rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);

        if ( keyboard.pressed("F") )
            scene.getObjectByName('sofaII').rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);

        if ( keyboard.pressed("G") )
            scene.getObjectByName('tischI').rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);

        if ( keyboard.pressed("J") )
            scene.getObjectByName('tischII').rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
        
        if ( keyboard.pressed("K") )
            scene.getObjectByName('stuhlI').rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
        
        if ( keyboard.pressed("L") )
            scene.getObjectByName('stuhlII').rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
        
        if ( keyboard.pressed("Y") )
            scene.getObjectByName('regalI').rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
        
        if ( keyboard.pressed("X") )
            scene.getObjectByName('regalII').rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
        
        if ( keyboard.pressed("C") )
            scene.getObjectByName('schrank').rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
}



// GUI
// Parameter bestimmen
// Menü/Untermenü erstellen
var gui = new dat.GUI();

var param = {
    bodenbelagI:    function() { floorChangeI();    },
    bodenbelagII:   function() { floorChangeII();   },
    bodenbelagIII:  function() { floorChangeIII();  },
    bodenbelagIV:   function() { floorChangeIV()    },
    bodenbelagV:    function() { floorChangeV()     },
    bodenbelagVI:   function() { floorChangeVI()    },
     
    wandbelagI:     function() { wallChangeI();     },
    wandbelagII:    function() { wallChangeII();    },
    wandbelagIII:   function() { wallChangeIII();   },
    wandbelagIV:    function() { wallChangeIV();    },
    wandbelagV:     function() { wallChangeV();     },
    wandbelagVI:    function() { wallChangeVI();    },
    color:          '#ff0000',
    
    moebelI:        function() { furnitureI();      },
    moebelII:       function() { furnitureII();     },
    moebelIII:      function() { furnitureIII();    },
    moebelIV:       function() { furnitureIV();     },
    moebelV:        function() { furnitureV();      },
    moebelVI:       function() { furnitureVI();     },
    moebelVII:      function() { furnitureVII();    },
    moebelVIII:     function() { furnitureVIII();   },
    moebelIX:       function() { furnitureIX();     },
    moebelX:        function() { furnitureX();      },
    moebelXI:       function() { furnitureXI();     },    
    
    musikI:         function() { musicOn();         },
    musikII:        function() { musicOff();        },
    
    entfernen:      function() { remove();          }    
};

var f1 = gui.addFolder('Boden');
f1.add(param, 'bodenbelagI').name('zert. Tropenholz');
f1.add(param, 'bodenbelagII').name('Laminat');
f1.add(param, 'bodenbelagIII').name('Parkett');
f1.add(param, 'bodenbelagIV').name('Korkboden');
f1.add(param, 'bodenbelagV').name('Teppich');
f1.add(param, 'bodenbelagVI').name('Industrie');

var f2 = gui.addFolder('Wände');
f2.add(param, 'wandbelagI').name('ohne Tapete');
f2.add(param, 'wandbelagII').name('Black Diamond');
f2.add(param, 'wandbelagIII').name('Graffiti');
f2.add(param, 'wandbelagIV').name('Gentle Elegance');
f2.add(param, 'wandbelagV').name('70tes');
f2.add(param, 'wandbelagVI').name('Allure');
var wallColor = f2.addColor( param, 'color' ).name('Wandfarbe').listen();
    wallColor.onChange(function(value) // onFinishChange
    {   wallBack.material.color.setHex( value.replace("#", "0x") );
        wallLeft.material.color.setHex( value.replace("#", "0x") );
        wallRight.material.color.setHex( value.replace("#", "0x") );
    });

var f3 = gui.addFolder('Möbel');
f3.add(param, 'moebelI').name('Captains Bed; (A)');
f3.add(param, 'moebelII').name('Lit Bed; (S)');
f3.add(param, 'moebelIII').name('Sofa 2-Sitzer; (D)');
f3.add(param, 'moebelIV').name('Sofa 3-Sitzer; (F)');
f3.add(param, 'moebelV').name('Schreibtisch; (G)');
f3.add(param, 'moebelVI').name('Couchtisch; (J)');
f3.add(param, 'moebelVII').name('Bürostuhl; (K)');
f3.add(param, 'moebelVIII').name('Stuhl; (L)');
f3.add(param, 'moebelIX').name('Regal; (Y)');
f3.add(param, 'moebelX').name('Kommode; (X)');
f3.add(param, 'moebelXI').name('Kamin; (C)');

var f4 = gui.addFolder('Musik');
f4.add(param, 'musikI').name('An');
f4.add(param, 'musikII').name('Aus');

gui.add( param, 'entfernen' ).name("Möbel entfernen");



// Funktionen GUI
// Ändern der Texturen für Boden und Wand
// Einfügen und Entfernen der Möbelstücke
// Musik ein- bzw ausschalten
function floorChangeI(){
    floor.material = new THREE.MeshPhongMaterial({map: flooringI});
}

function floorChangeII(){
    floor.material = new THREE.MeshPhongMaterial({map: flooringII});
}

function floorChangeIII(){
    floor.material = new THREE.MeshPhongMaterial({map: flooringIII});
}

function floorChangeIV(){
    floor.material = new THREE.MeshPhongMaterial({map: flooringIV});
}

function floorChangeV(){
    floor.material = new THREE.MeshPhongMaterial({map: flooringV});
}

function floorChangeVI(){
    floor.material = new THREE.MeshPhongMaterial({map: flooringVI});
}

function wallChangeI(){
    wallBack.material = new THREE.MeshPhongMaterial({map: wallTextureI});
    wallLeft.material = new THREE.MeshPhongMaterial({map: wallTextureI});
    wallRight.material = new THREE.MeshPhongMaterial({map: wallTextureI});
}

function wallChangeII(){
    wallBack.material = new THREE.MeshPhongMaterial({map: wallTextureII});
    wallLeft.material = new THREE.MeshPhongMaterial({map: wallTextureII});
    wallRight.material = new THREE.MeshPhongMaterial({map: wallTextureII});
}

function wallChangeIII(){
    wallBack.material = new THREE.MeshPhongMaterial({map: wallTextureIII});
    wallLeft.material = new THREE.MeshPhongMaterial({map: wallTextureIII});
    wallRight.material = new THREE.MeshPhongMaterial({map: wallTextureIII});
}

function wallChangeIV(){
    wallBack.material = new THREE.MeshPhongMaterial({map: wallTextureIV});
    wallLeft.material = new THREE.MeshPhongMaterial({map: wallTextureIV});
    wallRight.material = new THREE.MeshPhongMaterial({map: wallTextureIV});
}

function wallChangeV(){
    wallBack.material = new THREE.MeshPhongMaterial({map: wallTextureV});
    wallLeft.material = new THREE.MeshPhongMaterial({map: wallTextureV});
    wallRight.material = new THREE.MeshPhongMaterial({map: wallTextureV});
}

function wallChangeVI(){
    wallBack.material = new THREE.MeshPhongMaterial({map: wallTextureVI});
    wallLeft.material = new THREE.MeshPhongMaterial({map: wallTextureVI});
    wallRight.material = new THREE.MeshPhongMaterial({map: wallTextureVI});
}


function furnitureI(){
    
    loader.load('models/captainsBed.obj', 'models/captainsBed.mtl', function(object) {
        object.position.y = 2;
        object.scale.set(2.5,2.5,3);
        object.name = 'captain';
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );
        scene.add(object);
        EventsControls1.attach( object );
    });      
}

function furnitureII(){
    
    loader.load('models/lit.obj', 'models/lit.mtl', function(object) {
        object.position.y = 1.6;
        object.scale.set(0.05,0.05,0.05);
        object.name = 'lit';
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );
        scene.add(object);
        EventsControls1.attach( object );
    });
}
 
function furnitureIII(){
     
    loader.load('models/sofa4.obj', 'models/sofa4.mtl', function(object) {
        object.position.y = 0.3;
        object.scale.set(0.06,0.06,0.06);
        object.name = 'sofaI';
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );
        scene.add(object);
        EventsControls1.attach( object );
    }); 
}

function furnitureIV(){
     
    loader.load('models/sofa3.obj', 'models/sofa3.mtl', function(object) {
        object.position.y = 0.3;
        object.scale.set(0.05,0.05,0.05);
        object.name = 'sofaII';
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );
        scene.add(object);
        EventsControls1.attach( object );
    }); 
}

function furnitureV(){
     
    loader.load('models/black_table.obj', 'models/black_table.mtl', function(object) {
        object.position.z = 2;
        object.scale.set(0.05,0.05,0.05);
        object.name = 'tischI'
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );
        scene.add(object);
        EventsControls1.attach( object );
    }); 
}

function furnitureVI(){
     
    loader.load('models/table4.obj', 'models/table4.mtl', function(object) {
        //object.position.y = -5.95;
        object.scale.set(0.05, 0.02, 0.05);
        object.name = 'tischII';
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );
        scene.add(object);
        EventsControls1.attach( object );
    }); 
}

function furnitureVII(){
     
    loader.load('models/officeChair2.obj', 'models/officeChair2.mtl', function(object) {
        object.position.y = 0.2;
        object.scale.set(0.05,.05,0.05);
        object.name = 'stuhlI';
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );
        scene.add(object);
        EventsControls1.attach( object );
    });  
}

function furnitureVIII(){
     
    loader.load('models/plastic_chair.obj', 'models/plastic_chair.mtl', function(object) {
         object.position.y = 0;
        object.scale.set(0.05,0.05,0.05);
        object.name = 'stuhlII';
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );
        scene.add(object);
        EventsControls1.attach( object );
    }); 
}

function furnitureIX(){
     
    loader.load('models/pinewoodRackFullHeight.obj', 'models/pinewoodRackFullHeight.mtl', function(object) {
        object.position.y = 0.2;
        object.scale.set(0.08,0.05,0.05);
        object.name = 'regalI';
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );
        scene.add(object);
        EventsControls1.attach( object );
    }); 
}

function furnitureX(){
     
    loader.load('models/hallTable.obj', 'models/hallTable.mtl', function(object) {
        //object.position.y = -5.95;
        object.scale.set(0.05,0.05,0.05);
        object.name = 'regalII';
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );
        scene.add(object);
        EventsControls1.attach( object );
    }); 
}

function furnitureXI(){
     
    loader.load('models/fireplace2.obj', 'models/fireplace2.mtl', function(object) {
        object.position.y = 0.8;
        object.scale.set(1,1,1);
        object.name = 'schrank';
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );
        scene.add(object);
        EventsControls1.attach( object );
    }); 
}

// Musik
function musicOn(){
    audio.play();
    audio.loop = true;
}
function musicOff(){
    audio.pause();
}

// Funktion zum entfernen der eingefügften Möbel
function remove(){
    var selectedObject = scene.getObjectByName('captain');
    scene.remove(selectedObject);
    
    var selectedObjectI = scene.getObjectByName('lit');
    scene.remove(selectedObjectI);
   
    var selectedObjectII = scene.getObjectByName('sofaI');
    scene.remove(selectedObjectII);
    
    var selectedObjectIII = scene.getObjectByName('sofaII');
    scene.remove(selectedObjectIII);
    
    var selectedObjectIV = scene.getObjectByName('tischI');
    scene.remove(selectedObjectIV);
    
    var selectedObjectVI = scene.getObjectByName('tischII');
    scene.remove(selectedObjectVI);
    
    var selectedObjectVII = scene.getObjectByName('stuhlI');
    scene.remove(selectedObjectVII);
    
    var selectedObjectVIII = scene.getObjectByName('stuhlII');
    scene.remove(selectedObjectVIII);
    
    var selectedObjectIX = scene.getObjectByName('regalI');
    scene.remove(selectedObjectIX);
    
    var selectedObjectX = scene.getObjectByName('regalII');
    scene.remove(selectedObjectX);
    
    var selectedObjectXI = scene.getObjectByName('schrank');
    scene.remove(selectedObjectXI);
    
}



// 3D-Modelle in Szene(unbeweglich)
// Briefkasten
loader.load('models/mofx_mailbox.obj', 'models/mofx_mailbox.mtl', function(object) {
        object.position.set(-30, 0, 27);
        object.scale.set(0.06,0.06,0.06);
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );       
        scene.add(object);
});
 
// Laterne
loader.load('models/classic-lamppost.obj', 'models/classic-lamppost.mtl', function(object) {
        object.position.set(30, 0, 28);
        object.scale.set(0.8,0.8,0.8);
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );       
        scene.add(object);
});
 
// Tür
loader.load('models/door1.obj', 'models/door1.mtl', function(object) {
        object.position.set(15, 0, -24.4);
        object.scale.set(0.07,0.05,0.0);
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );       
        scene.add(object);
});
 
 // Bäume
loader.load('models/blackTupelo.obj', 'models/blackTupelo.mtl', function(object) {
        object.position.set(-65,0,-60);
        object.scale.set(1,1,1);
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );       
        scene.add(object);
});
loader.load('models/quakingAspen.obj', 'models/quakingAspen.mtl', function(object) {
        object.position.set(-55,0,-70);
        object.scale.set(1,1,1);
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );       
        scene.add(object);
});
 
// Holz
loader.load('models/wood_logs.obj', 'models/wood_logs.mtl', function(object) {
        object.position.set(-60,1.5,-20);
        object.rotation.y = -1;
        object.scale.set(0.2,0.2,0.2);
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );       
        scene.add(object);
 });
 
 // Hund
loader.load('models/dog.obj', 'models/dog.mtl', function(object) {
        object.position.set(60,0.7,15);
        object.rotation.y = -1;
        object.scale.set(0.06,0.06,0.06);
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );       
        scene.add(object);
});

// Hundehütte
loader.load('models/dog-house.obj', 'models/dog-house.mtl', function(object) {
        object.position.set(55,7,8);
        //object.rotation.y = -1;
        object.scale.set(0.1,0.1,0.1);
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );       
        scene.add(object);
});
//
//// Mensch
loader.load('models/sitMale03.obj', 'models/sitMale03.mtl', function(object) {
        object.position.set(43,0,20);
        object.rotation.y = 1.4;
        object.scale.set(0.06,0.06,0.06);
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );       
        scene.add(object);
});
//
//// Fass
loader.load('models/barrel.obj', 'models/barrel.mtl', function(object) {
        object.position.set(-59,0.1,12);
        object.rotation.z = -0.2;
        object.scale.set(0.06,0.08,0.08);
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );       
        scene.add(object);
});

// Grill
loader.load('models/grillNgauge.obj', 'models/grillNgauge.mtl', function(object) {
        object.position.set(-45,3.5,8);
        object.scale.set(2,2,2);  
        object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );     
        scene.add(object);
});



function render() {
    requestAnimationFrame( render );
    EventsControls1.update();
    rotate();
    renderer.render(scene, camera);
};
 
render();


