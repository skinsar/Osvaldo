// Por ahora, este archivo estará vacío o solo contendrá un mensaje de prueba:
console.log("¡JavaScript para Bienvenido a los 80/90 cargado!");

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener referencias a los elementos HTML
    const spinningVinyl = document.getElementById('spinningVinyl');
    const radioStreamPlayer = document.getElementById('radioStreamPlayer');
    const favoriteSongPlayer = document.getElementById('favoriteSongPlayer');

    // Función para iniciar el giro del vinilo
    function startVinylSpin() {
        if (spinningVinyl) {
            spinningVinyl.classList.add('vinyl-spinning');
        }
    }

    // Función para detener el giro del vinilo
    function stopVinylSpin() {
        if (spinningVinyl) {
            spinningVinyl.classList.remove('vinyl-spinning');
        }
    }

    // Función para pausar el otro reproductor cuando uno se reproduce
    function pauseOtherPlayer(currentPlayer) {
        if (currentPlayer === radioStreamPlayer && favoriteSongPlayer) {
            favoriteSongPlayer.pause();
        } else if (currentPlayer === favoriteSongPlayer && radioStreamPlayer) {
            radioStreamPlayer.pause();
        }
    }

    // 2. Añadir Event Listeners para el reproductor de radio
    if (radioStreamPlayer) {
        radioStreamPlayer.addEventListener('play', () => {
            startVinylSpin();
            pauseOtherPlayer(radioStreamPlayer); // Pausa el otro si este se reproduce
        });

        radioStreamPlayer.addEventListener('pause', () => {
            // Solo detenemos el vinilo si el otro reproductor también está pausado
            if (favoriteSongPlayer && favoriteSongPlayer.paused) {
                stopVinylSpin();
            }
        });

        radioStreamPlayer.addEventListener('ended', () => {
            // Detener el giro si la radio (stream) termina, aunque los streams en vivo no suelen "terminar"
            if (favoriteSongPlayer && favoriteSongPlayer.paused) {
                stopVinylSpin();
            }
        });
    }

    // 3. Añadir Event Listeners para el reproductor del tema favorito
    if (favoriteSongPlayer) {
        favoriteSongPlayer.addEventListener('play', () => {
            startVinylSpin();
            pauseOtherPlayer(favoriteSongPlayer); // Pausa el otro si este se reproduce
        });

        favoriteSongPlayer.addEventListener('pause', () => {
            // Solo detenemos el vinilo si el otro reproductor también está pausado
            if (radioStreamPlayer && radioStreamPlayer.paused) {
                stopVinylSpin();
            }
        });

        favoriteSongPlayer.addEventListener('ended', () => {
            // Si la canción favorita termina, detener el giro si la radio también está pausada
            if (radioStreamPlayer && radioStreamPlayer.paused) {
                stopVinylSpin();
            }
        });
    }

    console.log("¡JavaScript para control de audio y vinilo cargado!");
});