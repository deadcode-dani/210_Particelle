function setup(){
  angleMode(RADIANS);

  //CREA IL CANVAS IN MODO DINAMICO
  setup_canvas(); 
  //canvas_visualizzato.parent('canvas'); //DA RIATTIVARE CON USO PAGINA INDEX2
  
  console.log(dedacode_hashkey)
  console.log(seed)
  
  randomSeed(num_input);
  noiseSeed(num_input)

  randomSetup();

  
}

function draw(){
  //SETUP CANVAS DINAMICO
  draw_setup_canvas(); 
  
  
  //BARRA DI PRELOAD
  if(preloadActive)
    if(time_preload<=100)
    {
      clear();
      preload_canvas(canvas_effettivo)
      draw_barra_caricamento(this,w/2-(w/4),h/2,w/2,h/10,10,colorWhite,canvas_background,time_preload);
    }
  
  //PULISCE LO SCHERMO DOPO LA BARRA DI PRELOAD
  if((time_preload==101)&&(pedActive))
  {
    clear();
    background(canvas_background);
  }
  

  
  //DISEGNO EFFETTIVO LIVE
  if(((time_preload>100)&&(time_draw<time_draw_end))||(!preloadActive))
  {  
    
    draw_scene(canvas_effettivo)
    //VISUALIZZA CANVAS EFFETTIVO IN CANVAS VISUALIZZATO
    image(canvas_effettivo,0,0)
  
  }
  /*
  //ARRIVATI AL TEMPO MASSIMO DI DISEGNO LIVE IMPOSTA noLoop()
  if(time_draw>=time_draw_end)
  { 
    noLoop();
    
  }
*/
}

//funzione da richiamare all'inizio di setup() per istanziare canvas effettivo e visualizzato
function setup_canvas()
{
   if(canvas_dinamico)
   {
      canvas_visualizzato=createCanvas(windowWidth, windowHeight);
     
      proporzione_effettivo=w/h;
      proporzione_visualizzato=windowWidth/windowHeight;
     
      //SE PROPORZIONE EFFETTIVO >1 SIGNIFICA CHE L'IMMAGINE DI PARTENZA HA UN FORMATO ORIZZONTALE
      let v_flag_oriz=true
      
      if(proporzione_effettivo<1)
        v_flag_oriz=false;
     
      //Se l'immagine iniziale è orizzontale ma la proporzione della finestra di visualizzazione è ancora piu' orizzontale come proporzione allora utilizza il lato verticale per proporzionare
      if((proporzione_effettivo<proporzione_visualizzato)&&(proporzione_effettivo>=1))
        v_flag_oriz=false;
     
      //se l'immagine iniziale è verticale ma la proporzione della finestra di visualizzazione è ancora piu' verticale come proporzione allora utilizza il lato orizzontale per proporzionare
      if((proporzione_effettivo>=proporzione_visualizzato)&&(proporzione_effettivo<1))
        v_flag_oriz=true;
     
      if(v_flag_oriz)
      {
        scale_val=windowWidth/w;
        diff_x=0;
        diff_y=(windowHeight-(h*scale_val))/2;
      }
      else
      {
        scale_val=windowHeight/h;
        diff_x=(windowWidth-(w*scale_val))/2;
        diff_y=0;
      }
      canvas_effettivo = createGraphics(w, h);
     
      background(canvas_background);
      canvas_effettivo.background(canvas_background);
   }
   else
   {
     canvas_visualizzato=createCanvas(w, h);
     canvas_effettivo = createGraphics(w, h);
     
      canvas_visualizzato.background(canvas_background);
      canvas_effettivo.background(canvas_background);
   }
}

//funzione da richiamare all'inizio di draw per effettuare il setup
function draw_setup_canvas()
{
    if(canvas_dinamico)
    {
      translate(diff_x,diff_y);
      scale(scale_val);
    }
}

//funzione per estire salvataggio file dimensioni effettive PNG
function keyPressed() {
  if (key == 's') {
      saveCanvas(canvas_effettivo, '_deadcode_'+name_file+'.png');
  }
}

//Funzione di preload. Calcola e prepara eventuali oggetti e strutture e/o disegna alcuni livelli grafici
function preload_canvas(panel)
{
     //INSERISCI QUI LE FUNZIONI DI PRELOAD PASSANDO IL TEMPO CHE DEVE ESSERE AVANZATO AD OGNI AZIONE O GRUPPO DI AZIONI
    //***INIZIO***
    //drawMainTest_002(panel,time_preload);
    //***FINE***
  
    time_preload++;
}


function draw_scene(panel)
{ 
  //if(time_draw==0)
    //panel.background(canvas_eff_background);
  //INSERISCI QUI LE FUNZIONI DI PRELOAD PASSANDO IL TEMPO CHE DEVE ESSERE AVANZATO AD OGNI AZIONE O GRUPPO DI AZIONI
  //***INIZIO***
  drawMainTest_001(panel,time_draw);
  //***FINE***
  time_draw++;
  

}

//Funzione che disegna la barra di caricamento iniziale da usare nel preload
function draw_barra_caricamento(panel,x,y,lunghezza,larghezza,spessore,c1,c2,p_time)
{
   //Disegna contorno esterno della barra
   panel.background(c2);
   panel.noFill();
   panel.stroke(c1)
   panel.strokeWeight(spessore)
   panel.rect(x, y, lunghezza, larghezza, 20);
  
   //Disegna riempimento interno della barra
   panel.fill(c1);
   panel.stroke(c2);
   rap_x=(lunghezza-(spessore*2))/lunghezza;
   let lunghezza_int=(p_time/100)*lunghezza*rap_x;
   d_y=(larghezza-(larghezza*0.9))/2
   panel.rect(x+spessore, y+d_y, lunghezza_int, larghezza*0.9, 20);
  
}

// All’interno di Main.js o Test.js
function saveMyCanvas() {
  saveCanvas('myCanvas', 'png');
}
// Espone la funzione a livello di window, così è richiamabile da fuori
window.saveMyCanvas = saveMyCanvas;
