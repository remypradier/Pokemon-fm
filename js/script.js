var track = 0;
var player = document.querySelector('#audioPlayer');

function play(idPlayer, control) 
{
    var player = document.querySelector('#' + idPlayer);
	console.log(track);
    /*
    console.log("play" + player.innerHTML);
    if(player.innerHTML.trim() == "")
    {
        player.innerHTML = " <source src=" + chemin + playlist[track].chemin +" type='audio/ogg'>";
        console.log("trim" + player.innerHTML);
    }
    */
    
    if (player.paused) 
    {
        player.play();
    } 
    else 
    {
        player.pause(); 
    }
}

function volume(idPlayer, vol) 
{
    var player = document.querySelector('#' + idPlayer);
	
    player.volume = vol;	
}

function update(player) 
{
    var duration = player.duration;    // Durée totale
    var time     = player.currentTime; // Temps écoulé
    var fraction = time / duration;
    var percent  = Math.ceil(fraction * 100);

    var progress = document.querySelector('#progressBar');
	
   
    progress.textContent = percent + '%';

    document.querySelector('#progressTime').textContent = formatTime(time);
}

function formatTime(time) 
{
    var hours = Math.floor(time / 3600);
    var mins  = Math.floor((time % 3600) / 60);
    var secs  = Math.floor(time % 60);
	
    if (secs < 10) {
        secs = "0" + secs;
    }
	
    if (hours) {
        if (mins < 10) {
            mins = "0" + mins;
        }
		
        return hours + ":" + mins + ":" + secs; // hh:mm:ss
    } else {
        return mins + ":" + secs; // mm:ss
    }
}

//Barre de progression cliquable

function getMousePosition(event) 
{
    return {
        x: event.pageX,
        y: event.pageY
    };
}

function getPosition(element)
{
    var top = 0, left = 0;
    
    do {
        top  += element.offsetTop;
        left += element.offsetLeft;
    } while (element = element.offsetParent);
    
    return { x: left, y: top };
}

function clickProgress(idPlayer, control, event) 
{
    var parent = getPosition(control);    // La position absolue de la progressBar
    var target = getMousePosition(event); // L'endroit de la progressBar où on a cliqué
    var player = document.querySelector('#' + idPlayer);
  
    var x = target.x - parent.x; 
    var wrapperWidth = document.querySelector('#progressBarControl').offsetWidth;
    
    var percent = Math.ceil((x / wrapperWidth) * 100);    
    var duration = player.duration;
    
    player.currentTime = (duration * percent) / 100;
}


function backward(idPlayer) 
{
    var player = document.querySelector('#' + idPlayer);
    track--;
    player.innerHTML = " <source src=" + chemin + playlist[track].chemin +" type='audio/ogg'>";//A corriger
    play('audioPlayer', this);
}

function forward(idPlayer) 
{
    var player = document.querySelector('#' + idPlayer);
    track++;
    player.innerHTML = " <source src=" + chemin + playlist[track].chemin +" type='audio/ogg'>";//A corriger
    play('audioPlayer', this);
}