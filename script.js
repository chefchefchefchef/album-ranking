document.addEventListener("DOMContentLoaded", function() {
  const songCountSelect = document.getElementById("song-count");
  const songListContainer = document.getElementById("song-list");

  // Funktion, um die Songliste zu aktualisieren
  function updateSongList(count) {
    // Lösche alle vorhandenen Songeinträge
    songListContainer.innerHTML = "";

    // Erstelle die Liste für die Songs basierend auf der ausgewählten Anzahl
    for (let i = 1; i <= count; i++) {
      const songItem = document.createElement("div");
      songItem.classList.add("song-item");

      // Erstelle die Nummer und das Eingabefeld
      songItem.innerHTML = `
        <span>${i}.</span>
        <input type="text" placeholder="Song Name" id="song-${i}" />
      `;

      // Füge das Songitem zur Liste hinzu
      songListContainer.appendChild(songItem);
    }
  }

  // Wenn die Auswahl geändert wird, aktualisiere die Liste
  songCountSelect.addEventListener("change", function() {
    const count = parseInt(songCountSelect.value, 10);
    updateSongList(count);
  });

  // Initialisiere mit der Auswahl 1
  updateSongList(1);
});
