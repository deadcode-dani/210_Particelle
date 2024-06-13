

w = 1500;
h = 1500;

let res_e=6; //ESTROVERO-INTROVERO 
let res_s=10; //SENSORIALE-INTUITIVO
let res_t=8; //RIFLESSIVO-EMOTIVO (DURATA VITA PARTICELLE)
let res_p=10; //OSSERVATORE-GIUDICANTE (COLORE E VELOCITA)
let num_input=1140;

let panel2; //panel2 come layer di appoggio
let p_tempo=0;

let particles = [];
let numParticles = 210;

let maxRadius = w*0.5
let minRadius = w*0.1
let repulsionRadius = w/4;

let attractionForce = 0.7; 
let repulsionForce = 0.2; 
let dragForce = 0.8;
//massima velocità. Limita la velocità massima della particella
let p_max_vel=5; 
let wanderStrength = 0
let fadeRate = 0.3; 
let centerRepulsionForce = 2

let p_a=0.005
let p_b=0.005
let p_intensita=0.9;
let p_intensita_c=0.3;

let col_palette=[
        [[130,10,10],[250,230,200]],
        [[250,250,250],[40,40,40]]
]

let col_list=col_palette[0];
let tempo_max=1000;

let t=0;



//DEFINISCI ELEMENTI INZIALI CASUALI
function randomSetup()
{

   const queryString = window.location.search;
   let params = getURLParams();

       res_e=params.res_e;
       res_s=params.res_s;
       res_t=params.res_t;
       res_p=params.res_p;
       num_input=params.num_input;
    
   randomSeed(num_input);
   noiseSeed(num_input)

  attractionForce=0.1; //fisso
  repulsionForce=3 //fisso
  p_max_vel=1 //fisso
  
  fadeRate=map(res_t,0,15,0.1,0.9);
  
  //introvero intuitivo 
  if((res_e<=7)&&(res_s<=7))
  {
     p_a=map(res_e,0,15,0.01,0.04);
     p_b=p_a/16;
     p_intensita=map(res_t,0,15,0.1,0.4)+0.4;
     p_intensita_c=0.9;
     repulsionForce=floor(map(res_t,0,15,1,4));
     attractionForce=1-map(res_t,0,15,0.02,0.3);
     p_max_vel=floor(map(res_p,0,15,3,7))
     dragForce=0.4;
     p_color_red=floor(map(res_p,0,15,20,210));
     col_list[0]=[red(p_color_red),green(col_list[0]),blue(col_list[0])]
    
     if(res_t<=7)
        minRadius = w*(map(7-res_t,0,8,0.1,0.20));
     else
       minRadius = 0;
  }  
  
    //introvero sensoriale 
  if((res_e<=7)&&(res_s>7))
  {
     p_a=map(res_e,0,15,0.01,0.04);
     p_b=p_a/16;
     p_intensita=0
     p_intensita_c=0
     repulsionForce=floor(map(res_t,0,15,1,4));
     attractionForce=1-map(res_t,0,15,0.02,0.3);
     p_max_vel=floor(map(res_p,0,15,2,7))
     dragForce=map(res_p,0,15,0.3,0.99);
     p_color_red=floor(map(res_p,0,15,20,210));
     col_list[0]=[red(p_color_red),green(col_list[0]),blue(col_list[0])]

       minRadius = 0;
    
    tempo_max=1000-map(res_t,0,15,0,400);
  } 
  
    //estroverso intuitivo 
  if((res_e>7)&&(res_s<=7))
  {
     p_a=map(res_e,0,15,0.008,0.02);
     p_b=p_a;
     p_intensita=map(res_t,0,15,0.1,0.4)+0.4;
     p_intensita_c=0
     repulsionForce=floor(map(res_t,0,15,1,4));
     attractionForce=1-map(res_t,0,15,0.02,0.3);
     p_max_vel=floor(map(res_p,0,15,3,7))
     dragForce=map(res_p,0,15,0.3,0.99);
     p_color_red=floor(map(res_p,0,15,20,210));
     col_list[0]=[red(p_color_red),green(col_list[0]),blue(col_list[0])]

       minRadius = 0;
  }  
  
      //estroverso sensoriale
  if((res_e>7)&&(res_s>7))
  {
     p_a=map(res_e,0,15,0.01,0.04);
     p_b=p_a/16;
     p_intensita=0.9
     p_intensita_c=0
     repulsionForce=floor(map(res_t,0,15,1,4));
     attractionForce=1-map(res_t,0,15,0.02,0.3);
     p_max_vel=floor(map(res_p,0,15,3,7))
     dragForce=0.2-map(res_p,0,15,0.01,0.2);
     p_color_red=floor(map(res_p,0,15,20,210));
     col_list[0]=[red(p_color_red),green(col_list[0]),blue(col_list[0])]

       minRadius = 0;
    tempo_max=1000-map(res_t,0,15,0,400);
  }
  
      for (let i = 0; i < numParticles; i++) {
    particles.push({
      pos: randomVector(maxRadius),
      vel: randomVector(0.5),
      size: randomHash(3, 3),
      alpha: randomHash(50, 200),
      target: floor(randomHash(0,numParticles)),
      col: col_list[0]
    });
  }
} 

function randomVector(maxMagnitude) {
  const angle = randomHash(0,TWO_PI);
  const magnitude = randomHash(0,maxMagnitude);
  const x = magnitude * cos(angle);
  const y = magnitude * sin(angle);
  return createVector(x, y);
}



function drawMainTest_001(panel,p_time)
{

  if(p_time==0)
  {
      panel.background(col_list[1])
      panel.translate(width / 2, height / 2);
      panel.noFill();
      panel.stroke(col_list[0])
      panel.strokeWeight(1)
      panel.rect(-width / 3.6,-height / 3.6,height / 1.8,height / 1.8)
      panel.scale(0.8)
  }


  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    
    // Forza di attrazione verso una particella target
    let target = particles[p.target];
    let dir = p5.Vector.sub(target.pos, p.pos);
    dir.mult(attractionForce);
    p.vel.add(dir);
    
    
    // Forze di repulsione dalle altre particelle
    for (let j = 0; j < particles.length; j++) {
      if (i !== j) {
        let other = particles[j];
        let dir = p5.Vector.sub(p.pos, other.pos);
        let d = dir.mag();
        if (d < repulsionRadius) {
          dir.setMag(repulsionForce / d);
          p.vel.add(dir);
        }
      }
    }

    
    // Movimento casuale (wander)
    let wander = p5.Vector.random2D().mult(wanderStrength);
    p.vel.add(wander);
    
    // Applica attrito e limita la velocità
    p.vel.mult(dragForce);
    p.vel.limit(p_max_vel);
    
    // Aggiorna posizione e contieni nel raggio massimo
    p.pos.add(p.vel);
    if (p.pos.mag() > maxRadius) {
      p.pos.setMag(maxRadius);
      p.vel.mult(-0.5);  // Rimbalza sul bordo
    }
    
    
    // Aggiorna posizione e contieni nel raggio massimo
    p.pos.add(p.vel);
    randomRadius=0//randomHash(-minRadius,0)
    if (p.pos.mag() < minRadius+randomRadius) {
      p.pos.setMag(minRadius+randomRadius);
      p.vel.mult(0.5);  // Rimbalza sul bordo
    }
    
    
    if(noise(p.pos.x*p_a,p.pos.y*p_b)<0.8)
     {    
        p_angle=noise(p.pos.x*p_a,p.pos.y*p_b)*TWO_PI*3;

       dir.x = cos(p_angle);
       dir.y = sin(p_angle);
  
       p_vel = dir.copy();
       p_vel.mult(4*p_intensita);
       p.pos.add(p_vel);
    }  
    
    
      if(noise(p.pos.x*0.001,p.pos.y*0.01)>0.2)
     {    
        p_angle=noise(p.pos.x*0.001,p.pos.y*0.03)*TWO_PI*3;

       dir.x = cos(p_angle);
       dir.y = sin(p_angle);
  
       p_vel = dir.copy();
       p_vel.mult(3*p_intensita_c);
       p.pos.add(p_vel);
    }  
    
    
    // Disegna la particella
    panel.noStroke();
    panel.fill(red(p.col), green(p.col), blue(p.col), p.alpha);
    panel.circle(p.pos.x, p.pos.y, p.size);
    
    // Diminuisci l'alpha e rigenera se troppo trasparente
    p.alpha -= fadeRate;
    if (p.alpha < 0) {
      p.pos =  randomVector(maxRadius);
      p.alpha = randomHash(150, 255);
      p.target = floor(randomHash(0,numParticles));
    }
  }
  
  if(t>=tempo_max)
      noLoop();
  t++;
}

