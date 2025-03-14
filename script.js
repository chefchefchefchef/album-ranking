document.getElementById('numSongs').addEventListener('input', function() {
  const numSongs = parseInt(this.value);
  const songListContainer = document.getElementById('songListContainer');
  
  // Clear previous list
  songListContainer.innerHTML = '';

  // Create song input fields based on the selected number
  for (let i = 1; i <= numSongs; i++) {
    const songItem = document.createElement('div');
    songItem.classList.add('song-item');
    songItem.setAttribute('draggable', 'true');
    songItem.setAttribute('id', `song${i}`);
    songItem.innerHTML = `
      Song ${i}: <input type="text" placeholder="Song name" id="inputSong${i}">
    `;

    // Add drag event listeners to each song item (not input)
    songItem.addEventListener('dragstart', dragStart);
    songItem.addEventListener('dragover', dragOver);
    songItem.addEventListener('dragenter', dragEnter);
    songItem.addEventListener('dragleave', dragLeave);
    songItem.addEventListener('drop', drop);
    songItem.addEventListener('dragend', dragEnd);

    songListContainer.appendChild(songItem);
  }
});

// Variables to handle the drag and drop functionality
let draggedItem = null;

function dragStart(event) {
  draggedItem = event.target;
  setTimeout(() => {
    draggedItem.classList.add('dragging');
  }, 0);
}

function dragEnd() {
  draggedItem.classList.remove('dragging');
  draggedItem = null;
}

function dragOver(event) {
  event.preventDefault();
}

function dragEnter(event) {
  event.preventDefault();
  const target = event.target;
  if (target.classList.contains('song-item') && target !== draggedItem) {
    target.style.borderTop = '2px solid #ff6347';
  }
}

function dragLeave(event) {
  const target = event.target;
  if (target.classList.contains('song-item')) {
    target.style.borderTop = 'none';
  }
}

function drop(event) {
  event.preventDefault();
  const target = event.target;
  if (target.classList.contains('song-item') && target !== draggedItem) {
    // Swap the song items
    const draggedId = draggedItem.id;
    const targetId = target.id;

    const draggedInput = document.getElementById(draggedId).querySelector('input').value;
    const targetInput = document.getElementById(targetId).querySelector('input').value;

    document.getElementById(draggedId).querySelector('input').value = targetInput;
    document.getElementById(targetId).querySelector('input').value = draggedInput;

    target.style.borderTop = 'none';
  }
}
