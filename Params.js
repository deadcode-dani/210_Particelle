/*
    SCRIPT DOVE GESTIRE TUTTI PARAMETRI IN INGRESSO, LE FEATURES E LA SCELTA DEI PARAMETRI CASUALI e LE VARIABILI DI APPOGGIO
*/

//***PARAMETRI CANVAS
//dimensione canvas su cui costruire l'immagine
let w = 3500;
let h = 3500;

//nome del file da utilizzare in fase di salvataggio
let name_file="File_test";

//se canvas_dinamico=true viene usata la dimensione effettiva del frame --> windowWidth, windowHeight
//se canvas non è dinamico viene istanziata la dimenensione del canvas pari a quella dell'immagine. 
//In questo caso l'eventuale scaling dinamico viene gestito dal CSS (vedere style.css)
let canvas_dinamico=false;
//colore sfondo di riempimento in caso di canvas dinamico
let canvas_background=[180,180,180];
let canvas_eff_background=[250,250,250];

//Attivare preload e impostare il numero di cicli del disegno live
let preloadActive=false; //attivare la barra di preload. il tempo di preload va sempre da 0 a 100
let time_draw_end=100; //IMPOSTARE I CICLI DI DISEGNO LIVE

//***FINE PARAMETRI CANVAS
//CANVAS EFFETTIVO e CANVAS VISUALIZZATO
//il Canvas effettivo è quello della dimensione effettiva dell'immagine
//il Canvas visualizzato corrisponde alla dimensione effettiva del frame a disposizione
//se canvas_dinamico=false il canvas visualizzato è uguale a quello effettivo
let canvas_effettivo;
let canvas_visualizzato;

//differenza x,y da utilizzare per centrare il canvas effettivo
let diff_x=0, diff_y=0, scale_val=1;

//tempo preload
let time_preload=0; //il tempo di preload va sempre da 0 a 100
let time_draw=0;

//******VARIABILI
//COLORI
let colorRed=[220,0,0,220];
let colorWhite=[255,255,255];
let colorBlack=[0,0,0];
let colorGrey=[100,100,100];

