function confirmarAsistencia() {
  const nombre = prompt("Por favor, escribe tu nombre y apellido para confirmar:");
  
  if (nombre) {
    const mensaje = `Hola, confirmo mi asistencia a los XV Años de Norelis. Soy: ${nombre}`;
    // Abre WhatsApp para elegir el contacto (el chat de origen) y enviar el mensaje
    window.open(`https://wa.me/?text=${encodeURIComponent(mensaje)}`, '_blank');
  }
}

function abrirSobre() {
  const envelope = document.getElementById('envelope-overlay');
  envelope.classList.add('open');
  
  // Permitir scroll nuevamente una vez abierto
  document.body.style.overflowY = 'auto';

  // Asegurar reproducción si no inició antes
  const audio = document.getElementById('musica-fondo');
  if (audio.paused) {
    audio.play().catch(e => console.log("Audio requiere interacción:", e));
  }
}

function toggleMusic() {
  const audio = document.getElementById('musica-fondo');
  const btn = document.getElementById('music-btn');
  
  if (audio.paused) {
    audio.play();
    btn.innerHTML = "🎵";
  } else {
    audio.pause();
    btn.innerHTML = "🔇";
  }
}

function iniciarCuentaRegresiva() {
  const now = new Date();
  const currentYear = now.getFullYear();
  // Fecha objetivo: 25 de Febrero a las 15:30
  let eventDate = new Date(`February 25, ${currentYear} 15:30:00`);

  // Si la fecha ya pasó este año, usar el siguiente (por seguridad)
  if (now > eventDate) {
    eventDate = new Date(`February 25, ${currentYear + 1} 15:30:00`);
  }

  const interval = setInterval(() => {
    const currentTime = new Date().getTime();
    const distance = eventDate.getTime() - currentTime;

    if (distance < 0) {
      clearInterval(interval);
      document.getElementById("countdown").innerHTML = "<p style='color:#d4af37; font-weight:bold;'>¡Es hoy!</p>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
  }, 1000);
}

// Intentar reproducir música automáticamente al cargar (Autoplay)
window.addEventListener('load', () => {
  iniciarCuentaRegresiva();

  const audio = document.getElementById('musica-fondo');
  audio.volume = 0.5;

  // Intento directo al cargar
  audio.play().catch(() => {
    // Si el navegador bloquea el autoplay, esperar a cualquier clic/toque en la pantalla
    const playOnInteraction = () => {
      audio.play();
      document.removeEventListener('click', playOnInteraction);
      document.removeEventListener('touchstart', playOnInteraction);
    };

    document.addEventListener('click', playOnInteraction);
    document.addEventListener('touchstart', playOnInteraction);
  });
});
