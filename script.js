document.addEventListener("DOMContentLoaded", function() {
  const songList = document.getElementById("song-list");

  // Beispielhafte Songs (du kannst diese durch echte Daten ersetzen)
  const songs = [
    { title: "Song 1", rating: 5 },
    { title: "Song 2", rating: 3 },
    { title: "Song 3", rating: 4 }
  ];

  songs.forEach(song => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - Bewertung: ${song.rating}`;
    songList.appendChild(li);
  });
});
