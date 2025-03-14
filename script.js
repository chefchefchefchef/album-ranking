document.addEventListener('DOMContentLoaded', () => {
  const numSongsInput = document.getElementById('numSongs');
  const songListContainer = document.getElementById('songListContainer');
  const albumNameInput = document.getElementById('albumName');

  // Funktion, um die Song-Liste zu generieren
  function generateSongList() {
    const numSongs = parseInt(numSongsInput.value);

    // Sicherstellen, dass eine gültige Zahl eingegeben wurde
    if (isNaN(numSongs) || numSongs < 1) {
      return;
    }

    songListContainer.innerHTML = ''; // Liste leeren, bevor neue Songs hinzugefügt werden

    // Song-Plätze hinzufügen
    for (let i = 1; i <= numSongs; i++) {
      const songItem = document.createElement('div');
      songItem.classList.add('song-item');
      songItem.setAttribute('data-index', i);

      // Label für den Platz
      const songLabel = document.createElement('label');
      songLabel.textContent = `Platz ${i}:`;
      songItem.appendChild(songLabel);

      // Eingabefeld für den Songname
      const songInput = document.createElement('input');
      songInput.type = 'text';
      songInput.placeholder = 'Songname';
      songItem.appendChild(songInput);

      songListContainer.appendChild(songItem);

      // Drag and Drop logik hinzufügen
      songItem.setAttribute('draggable', true);
      songItem.addEventListener('dragstart', dragStart);
      songItem.addEventListener('dragover', dragOver);
      songItem.addEventListener('drop', drop);
      songItem.addEventListener('dragend', dragEnd);
    }
  }

  // Update der Song-Liste bei Änderung der Song-Anzahl
  numSongsInput.addEventListener('input', generateSongList);

  // Funktion, wenn das Ziehen startet
  let draggedItem = null;
  function dragStart(event) {
    draggedItem = event.target;
    event.target.classList.add('dragging');
  }

  // Funktion, wenn das Element über einem anderen schwebt
  function dragOver(event) {
    event.preventDefault(); // Verhindert das Standardverhalten
    const target = event.target;

    // Überprüfen, ob das Ziel wirklich ein song-item ist, sonst keine Funktionalität
    if (target.classList.contains('song-item') && target !== draggedItem) {
      target.style.border = "2px dashed #ccc"; // Optional: visuelles Feedback
    }
  }

  // Funktion, wenn das Element abgesetzt wird
  function drop(event) {
    event.preventDefault();
    const target = event.target;

    // Wenn das Ziel der Drag-and-Drop Zone ein Song-Element ist, die Positionen tauschen
    if (target.classList.contains('song-item') && target !== draggedItem) {
      const draggedIndex = parseInt(draggedItem.getAttribute('data-index'));
      const targetIndex = parseInt(target.getAttribute('data-index'));

      // Tausch der Positionen der Song-Eingabefelder
      const draggedInput = draggedItem.querySelector('input');
      const targetInput = target.querySelector('input');

      const tempValue = draggedInput.value;
      draggedInput.value = targetInput.value;
      targetInput.value = tempValue;

      // Tausch der data-index-Werte
      draggedItem.setAttribute('data-index', targetIndex);
      target.setAttribute('data-index', draggedIndex);
    }

    target.style.border = ""; // Visuelles Feedback zurücksetzen
    draggedItem.classList.remove('dragging');
  }

  // Funktion, wenn das Ziehen endet
  function dragEnd(event) {
    const draggedItems = document.querySelectorAll('.song-item');
    draggedItems.forEach(item => item.style.border = ""); // Visuelle Hinweise zurücksetzen
    draggedItem = null;
  }
});

