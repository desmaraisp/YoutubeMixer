async function GetAPIResponse(Playlist_IDs) {
    var FormattedString = Playlist_IDs.join("&PlaylistID=");

    const response = await fetch("/api/Get_Combined_Playlist_Contents_From_Request" + "?PlaylistID=" + FormattedString);
    return response.json();
}

async function Get_Videos_From_Playlist(callback) {
    let playlists = JSON.parse(localStorage.getItem("Playlists"));

    if (playlists) {
        const result = await GetAPIResponse(playlists);
        localStorage.Videos = JSON.stringify(result["Contents"]);
        callback.Reload();
    }
}