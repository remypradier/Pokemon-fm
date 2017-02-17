var track = 0;
var maxtrack = 10;
//var playlist = playlists[0];




var player = document.querySelector('#audioPlayer');

function play(idPlayer, control) 
{
    var player = document.querySelector('#' + idPlayer);
	console.log(track);
    //title_player = document.querySelector("#title_player");
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
            player.src = chemin + playlist[track].chemin;
            player.load();
            player.play(); 
            //Affiche les informations de la musique dans le player
            title_player.innerHTML = playlist[track].nom;
            img_player.src = "img/" + playlist[track].chemin_img;
            time_song.innerHTML = playlist[track].duree;
            play_pause.innerHTML = "<i class='fa fa-pause desactive' id='pause' aria-hidden='true'></i>";


    } 
    else 
    {
        player.pause(); 
        play_pause.innerHTML = "<i class='fa fa-play desactive' id='play' aria-hidden='true'></i>";
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
    
    do 
    {
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
    player.src = chemin + playlist[track].chemin;
    play('audioPlayer', this);
}

function forward(idPlayer) 
{
    var player = document.querySelector('#' + idPlayer);
    track++;
    player.src = chemin + playlist[track].chemin;
    play('audioPlayer', this);
}

function autoplay(idPlayer)
{
    var player = document.querySelector('#' + idPlayer);
    while(track <= maxtrack)
    {
        player.src = chemin + playlist[track].chemin;
        play(idPlayer);
        
        track++;
    }
}

//Changer de generation
function next_generation()
{
    if(num_playlist >= 3)
    {
        num_playlist = 0;

    }
    else
    {
        num_playlist++;
    }
    region();
}

function back_generation()
{
    if(num_playlist < 0)
    {
        num_playlist = 3;

    }
    else
    {
        num_playlist--;
    }
    region();
}


