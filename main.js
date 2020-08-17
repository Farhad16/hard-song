function getSongs() {
    document.getElementById('simpleSongList').innerHTML = "";
    document.getElementById('fancySongList').innerHTML = "";
    const songTilte = document.getElementById('songTitle').value;
    const base = {
        api: "https://api.lyrics.ovh/suggest",
        title: songTilte + '/?results=10'
    }

    const simpleList = document.getElementById('simpleSongList');
    const fancyList = document.getElementById('fancySongList');
    fetch(`${base.api}/${base.title}`)
        .then(res => res.json())
        .then(data => {
            const allSongs = data.data;
            console.log(allSongs);
            for (let i = 0; i < 10; i++) {
                const singleSong = allSongs[i]
                const songTitle = singleSong.title
                const albumDetails = singleSong.album
                const album = albumDetails.title;
                const cover_pic = albumDetails.cover_small

                console.log(songTitle);

                const artist = singleSong.artist.name;
                console.log(artist);

                const div = document.createElement("div");
                const songList = document.createElement("div");

                //list of single song

                songList.innerHTML = `<div class="songlist row align-items-center my-3 p-3">
                                        <div class="col-md-9">
                                        <h3 class="lyrics-name">${songTilte}</h3>
                                            <img src="${cover_pic}" alt=""></img>
                                            <p class="author lead" style="font-size:16px">Album : <span style="color: #00FA9A; font-size:18px">${album}</span></p>
                                        </div>
                                        <div class="col-md-3 text-md-right text-center">
                                            <button onclick="showLyrics('${artist}','${songTitle}')" class="btn btn-success">Get Lyrics</button>
                                        </div>
                                    </div>`;

                simpleList.appendChild(songList)


                // fancy list of single song
                div.innerHTML = `<div class="single-result row align-items-center my-3 p-3">
                                            <div class="col-md-9">
                                                <h3 class="lyrics-name">${songTilte}</h3>
                                                <p class="author lead">Album : <span style="color: #00FA9A">${album}</span></p>
                                                <p class="">Singer : <span style="color: #7FFFD4">${artist}</span></p>
                                            </div>
                                            <div class="col-md-3 text-md-right text-center">
                                                <button onclick="showLyrics('${artist}','${songTitle}')" class="btn btn-success">Get Lyrics</button>
                                            </div>
                                        </div>`

                fancyList.appendChild(div);
            }
        })

}

async function showLyrics(artist, title) {
    const api = 'https://api.lyrics.ovh/v1/'
    const x = document.getElementById('songName').innerText = title;
    console.log("x = ", x);
    await fetch(`${api}${artist}/${title}`)
        .then(res => {
            if (res.status != 200) {
                document.getElementById('lyric').innerText = "Lyrics " + res.statusText;
            } else {
                res.json()
                    .then(lyrics => {
                        console.log(lyrics);
                        document.getElementById('lyric').innerText = lyrics.lyrics;
                    })
            }
        })
}