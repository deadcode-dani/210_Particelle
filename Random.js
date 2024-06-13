//IL SEED VIENE SETTATO IN INDEX.HTML


//FUNZIONE CHE RESTITUISCE UN VALORE RANDOMICO HASH RIPORTANDOLO NELL' INTERVALLO DI VALORI INIZIO FINE
//RESTITUISCE UN VALORE RANDOMICO CONTINUO NELL'INTERVALLO
function randomHash(inizio,fine)
{
    diff=fine-inizio;
    return inizio+randomDec()*diff;
}

//Funzione che restituisce un valore decimale tra 0 e 1
function randomDec() 
{ 
  return random();
}

//Funzione che restiuscie un elemento dell'array in modo casuale
//utile per la scelta di parametri casuali con distribuzione omogena delle probabilità come palette di colori 
//o array con molti elementi
function randomHashArray(arr) 
{ 
  return arr[Math.floor(randomDec() * arr.length)] 
}

//Funzione che prende in input un array di array. il primo elemento sel sottoarray è la probabilità con cui può essere 
//scelto il valore di quel sottoarray
function radomProbArray(arr)
{ 
  let ndec=randomDec();
  let tprob=0;
  for(let i=0;i<arr.length;i++)
  {  
      tprob=tprob+arr[i][0];
      if(tprob>ndec)
        return arr[i][1];
  }
  return null;
}

//FUNZIONE CHE RESTITUISCE UN VALORE RANDOMICO DISCRETO NELL' INTERVALLO DI VALORI INIZIO FINE
//ES: randomHashCoef(10,20, 1) restituisce i valori 10,11,12,13...20
//ES: randomHashCoef(100,200, 0.1) restituisce i valori 10.1,10.2,10.3,10.4...20
function randomHashCoef(inizio,fine, x = 1) 
{ 
    return Math.floor(randomDec() * (fine - inizio + 1) + inizio) * x;
}

//FUNZIONE CHE RESTITUISCE UN VALORE RANDOMICO BOOLEANO, VERO O FALSO
function randomBoolean()
{
    if(randomDec()<0.5)
      return true;
    else
      return false;
}
