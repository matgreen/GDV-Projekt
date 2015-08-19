
// Erstellen der Szene 
var scene = new THREE.Scene();

// Kamera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.z = 50;
    camera.position.y = 15;
                     
                                
// Renderer
var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x330033);
    document.body.appendChild( renderer.domElement );
    
// Events
THREEx.WindowResize(renderer, camera);	   

// Steuerung
controls = new THREE.OrbitControls(camera, renderer.domElement);


// Hier wird der Raum erstellt
// 
//Texturen 
var flooringI = THREE.ImageUtils.loadTexture('texture/holz_belagI.jpg');
var flooringII = THREE.ImageUtils.loadTexture('texture/holz_belagII.jpg');
var flooringIII = THREE.ImageUtils.loadTexture('texture/holz_belagIII.jpg');
var flooringIII = THREE.ImageUtils.loadTexture('texture/holz_belagIV.jpg');

var wallTextureI = THREE.ImageUtils.loadTexture('texture/wandI.jpg');


// Rückwand
var wallBack = new THREE.Mesh(new THREE.PlaneGeometry(30,12,0), new THREE.MeshBasicMaterial({map: wallTextureI}));
scene.add( wallBack );

// Linke Wand
var wallLeft = new THREE.Mesh(new THREE.PlaneGeometry(20,12,0), new THREE.MeshBasicMaterial({map: wallTextureI}));
wallLeft.rotation.y = 1.57;
wallLeft.position.x = -15;
wallLeft.position.z = 10;
scene.add( wallLeft ); 

// Rechte Wand
var wallRight = new THREE.Mesh(new THREE.PlaneGeometry(20,12,0), new THREE.MeshBasicMaterial({map: wallTextureI}));
wallRight.rotation.y = -1.57;
wallRight.position.x = 15;
wallRight.position.z = 10;
scene.add( wallRight );

// Boden
var floor = new THREE.Mesh(new THREE.PlaneGeometry(30.03,20,0), new THREE.MeshBasicMaterial({map: flooringI}));
floor.rotation.x = -1.57;
floor.position.y = -5.99;
floor.position.z = 10;
scene.add( floor );







var gui = new dat.GUI();

var param = {
    bodenbelagI:    function() { floorChangeI();    },
    bodenbelagII:   function() { floorChangeII();   },
    bodenbelagIII:  function() { floorChangeIII();  },
    bodenbelagIV:   function() { floorChangeIV()    },
     
    wandbelagI:     function() { wallChangeI();     },
    wandbelagII:    function() { wallChangeII();    },
    wandbelagIII:   function() { wallChangeIII();   },
    wandbelagIV:    function() { wallChangeIV();    },
    color:          '#ff0000',
    
    moebelI:        function() { furnitureI();      },
};

var f1 = gui.addFolder('Boden');
f1.add(param, 'bodenbelagI').name('Boden1');
f1.add(param, 'bodenbelagII').name('Boden2');
f1.add(param, 'bodenbelagIII').name('Boden3');
f1.add(param, 'bodenbelagIV').name('Boden4');

var f2 = gui.addFolder('Wand');
f2.add(param, 'wandbelagI').name('Wand1');
f2.add(param, 'wandbelagII').name('Wand2');
f2.add(param, 'wandbelagIII').name('Wand3');
f2.add(param, 'wandbelagIV').name('ohne Tapete');
var wallColor = f2.addColor( param, 'color' ).name('Wandfarbe').listen();
    wallColor.onChange(function(value) // onFinishChange
    {   wallBack.material.color.setHex( value.replace("#", "0x") );
        wallLeft.material.color.setHex( value.replace("#", "0x") );
        wallRight.material.color.setHex( value.replace("#", "0x") );
    });

var f3 = gui.addFolder('Möbel');
f3.add(param, 'moebelI').name('test');


// Funktionen GUI
function floorChangeI(){
    floor.material = new THREE.MeshBasicMaterial({map: flooringI});
}

function floorChangeII(){
    floor.material = new THREE.MeshBasicMaterial({map: flooringII});
}

function floorChangeIII(){
    floor.material = new THREE.MeshBasicMaterial({map: flooringIII});
}

function floorChangeIV(){
    floor.material = new THREE.MeshBasicMaterial({map: flooringIII});
}

function wallChangeI(){
    wallBack.material = new THREE.MeshBasicMaterial({map: wallTextureI});
    wallLeft.material = new THREE.MeshBasicMaterial({map: wallTextureI});
    wallRight.material = new THREE.MeshBasicMaterial({map: wallTextureI});
}

function wallChangeII(){
    wallBack.material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
    wallLeft.material = new THREE.MeshBasicMaterial({map: wallTextureI});
    wallRight.material = new THREE.MeshBasicMaterial({map: wallTextureI});
}

function wallChangeIII(){
    wallBack.material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
    wallLeft.material = new THREE.MeshBasicMaterial({map: wallTextureI});
    wallRight.material = new THREE.MeshBasicMaterial({map: wallTextureI});
}

function wallChangeIV(){
    wallBack.material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
    wallLeft.material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
    wallRight.material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
}

function furnitureI(){
    var sphere = new THREE.Mesh(new THREE.SphereGeometry(5,5,5), new THREE.MeshPhongMaterial({color: 0xFFFFFF}));
    scene.add(sphere);
}

 function render() {
        requestAnimationFrame( render );


        renderer.render(scene, camera);
};
render();




