// Creating a Scene 
var scene = new THREE.Scene();

//scene.fog = new THREE.Fog( 0xffffff, 1, 5000 );
//scene.fog.color.setHSL( 0.6, 0, 1 );

// Camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
//    camera.position.z = 50;
//    camera.position.y = 15;
camera.position.set( 25, 75, 75 );
camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
                     
                                
// Renderer
var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0xCCFFCC);
    document.body.appendChild( renderer.domElement );
   
   
 
// Light
var directionalLight = new THREE.DirectionalLight( 0x333333, 1 );

    directionalLight.position.set( 100, 100, -100 );
    scene.add( directionalLight );


var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
    hemiLight.position.y = 500;
    scene.add( hemiLight );
    
// SKYDOME



// Events
THREEx.WindowResize(renderer, camera);	   

// Controls 
// controls = new THREE.OrbitControls(camera, renderer.domElement);

//renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
//renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
//renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );


var mouse = new THREE.Vector3();

var raycaster = new THREE.Raycaster();
var objects = [];
var offset = new THREE.Vector3(),
INTERSECTED, SELECTED

//function onDocumentMouseMove( event ) {
//
//    event.preventDefault();
//
//    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
//    
//    raycaster.setFromCamera(mouse,camera);
//    
//    intersects = raycaster.intersectObjects(objects);
//
//    if(intersects.length> 0){
//        // intersects[0].object.material.color.setRGB(0, 0 ,5);
//        intersects[0].object.position.set(0, 0 ,5);
//    }
//}
//
//function onDocumentMouseDown( event ) {
//
//    event.preventDefault();
//    // floor.position.y = -0.99;
//   
//   
//   
//
//}
//
//function onDocumentMouseUp( event ) {
//
//    event.preventDefault();
//    // floor.position.y = -5.99;
//    
//
//}



    
    


// Hier wird der Raum erstellt
// 
// 
//Texturen 
var flooringI       = THREE.ImageUtils.loadTexture('texture/zertifiziertesTropenholz.jpg');
var flooringII      = THREE.ImageUtils.loadTexture('texture/holz_belagII.jpg');
var flooringIII     = THREE.ImageUtils.loadTexture('texture/holz_belagIII.jpg');
var flooringIV      = THREE.ImageUtils.loadTexture('texture/holzbelagIV.jpg');
var flooringV       = THREE.ImageUtils.loadTexture('texture/teppichII.jpg');
var flooringVI      = THREE.ImageUtils.loadTexture('texture/Fliessen.jpg');

var wallTextureI    = THREE.ImageUtils.loadTexture('texture/tapete_mainII.jpg');
var wallTextureII   = THREE.ImageUtils.loadTexture('texture/tapeteI.jpg');
var wallTextureIII  = THREE.ImageUtils.loadTexture('texture/tapeteII.jpg');
var wallTextureIV   = THREE.ImageUtils.loadTexture('texture/tapeteIV.jpg');
var wallTextureV    = THREE.ImageUtils.loadTexture('texture/tapeteV.jpg');
var wallTextureVI   = THREE.ImageUtils.loadTexture('texture/tapeteVI.jpg');



// Rückwand
var wallBack = new THREE.Mesh(new THREE.PlaneGeometry(50,12,0), new THREE.MeshPhongMaterial({map: wallTextureI}));
wallBack.position.z = -20;
wallBack.position.y = 5.99;
scene.add( wallBack );

// Linke Wand
var wallLeft = new THREE.Mesh(new THREE.PlaneGeometry(40,12,0), new THREE.MeshPhongMaterial({map: wallTextureI}));
wallLeft.rotation.y = 1.57;
wallLeft.position.x = -25;
wallLeft.position.y = 5.99;
// wallLeft.position.z = 10;
scene.add( wallLeft ); 

// Rechte Wand
var wallRight = new THREE.Mesh(new THREE.PlaneGeometry(40,12,0), new THREE.MeshPhongMaterial({map: wallTextureI}));
wallRight.rotation.y = -1.57;
wallRight.position.x = 25;
wallRight.position.y = 5.99;
// wallRight.position.z = 10;
scene.add( wallRight );


// Boden 30.03,20,0
var floor = new THREE.Mesh(new THREE.PlaneGeometry(50.03,40,0), new THREE.MeshPhongMaterial({map: flooringI}));
floor.rotation.x = -1.57;
//floor.position.y = -5.99;
//floor.position.z = 10;
scene.add( floor );
objects.push(floor);

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

var radius = 0, h = 0, segments = 36;
var geometry = new THREE.CylinderGeometry( radius, radius, h, segments );
var material = new THREE.MeshPhongMaterial( { color: 0xFFFFF0 } );

var checker = new THREE.Mesh( geometry, material );

checker.position.set( -5, h / 2, 175 );
scene.add( checker ); EventsControls1.attach( checker );

var checker = new THREE.Mesh( geometry, material );

checker.position.set( -75, h / 2, 175 );
scene.add( checker ); EventsControls1.attach( checker );

//var object3D = new THREE.Object3D;
//var mesh = new THREE.Mesh( geometry, material );
//object3D.add( mesh ); 
//var mesh = new THREE.Mesh( geometry, material );
//mesh.position.y = h; mesh.rotation.x = Math.PI / 2; mesh.rotation.z = Math.PI / 2;
//object3D.add( mesh );
//object3D.position.set( 25, h / 2, 175 );
//scene.add( object3D );  EventsControls1.attach( object3D );





// GUI
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
    moebelIII:      function() { furnitureIII();    }
};

var f1 = gui.addFolder('Boden');
f1.add(param, 'bodenbelagI').name('Boden1');
f1.add(param, 'bodenbelagII').name('Boden2');
f1.add(param, 'bodenbelagIII').name('Boden3');
f1.add(param, 'bodenbelagIV').name('Boden4');
f1.add(param, 'bodenbelagV').name('Boden5');
f1.add(param, 'bodenbelagVI').name('Boden6');

var f2 = gui.addFolder('Wand');
f2.add(param, 'wandbelagI').name('Wand1');
f2.add(param, 'wandbelagII').name('Wand2');
f2.add(param, 'wandbelagIII').name('Wand3');
f2.add(param, 'wandbelagIV').name('Wand4');
f2.add(param, 'wandbelagV').name('Wand5');
f2.add(param, 'wandbelagVI').name('Wand6');
var wallColor = f2.addColor( param, 'color' ).name('Wandfarbe').listen();
    wallColor.onChange(function(value) // onFinishChange
    {   wallBack.material.color.setHex( value.replace("#", "0x") );
        wallLeft.material.color.setHex( value.replace("#", "0x") );
        wallRight.material.color.setHex( value.replace("#", "0x") );
    });

var f3 = gui.addFolder('Möbel');
f3.add(param, 'moebelI').name('test');
f3.add(param, 'moebelII').name('schrank');
f3.add(param, 'moebelIII').name('collada');


// Funktionen GUI
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
    wallBack.material = new THREE.MeshPhongMaterial({map: wallTextureVI});
    wallLeft.material = new THREE.MeshPhongMaterial({map: wallTextureVI});
    wallRight.material = new THREE.MeshPhongMaterial({map: wallTextureVI});
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
    var loader = new THREE.OBJMTLLoader();
    loader.load('models/futon.obj', 'models/futon.mtl', function(object) {
           
        object.position.z = 2;
        //object.position.y = -5.95;
        object.scale.set(0.05,0.05,0.05);
        scene.add(object);
        EventsControls1.attach( object );
    });   
}

function furnitureII(){
    var loaderI = new THREE.OBJMTLLoader();
    loaderI.load('models/lettoCiliegio.obj', 'models/lettoCiliegio.mtl', function(object) {
        
        object.position.z = 5;
        //object.position.y = -5.95;
        object.position.x = 10;
        object.scale.set(0.05,0.05,0.05);
        scene.add(object);
        EventsControls1.attach( object );
    });
}
 
function furnitureIII(){
    
  
}



 function render() {
     
      requestAnimationFrame( render );
EventsControls1.update();

        renderer.render(scene, camera);
};
render();




