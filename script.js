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

      const songInput = document.createElement('input');
      songInput.type = 'text';
      songInput.placeholder = `Platz ${i}: Songname`;

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
    event.preventDefault();
  }

  // Funktion, wenn das Element abgesetzt wird
  function drop(event) {
    event.preventDefault();
    const target = event.target;

    if (target !== draggedItem && target.classList.contains('song-item')) {
      const draggedIndex = parseInt(draggedItem.getAttribute('data-index'));
      const targetIndex = parseInt(target.getAttribute('data-index'));

      // Die Positionen der beiden Items tauschen
      if (draggedIndex !== targetIndex) {
        const draggedInput = draggedItem.querySelector('input');
        const targetInput = target.querySelector('input');

        // Tausch der Inhalte
        const temp = draggedInput.value;
        draggedInput.value = targetInput.value;
        targetInput.value = temp;
      }
    }

    draggedItem.classList.remove('dragging');
  }

  // Funktion, wenn das Ziehen endet
  function dragEnd(event) {
    draggedItem = null;
  }
});
