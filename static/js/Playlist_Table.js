class Playlist_Manager {
    constructor() {
        this.Input_Row = document.getElementById("Input_Row");
        this.Input_Field = document.getElementById("Playlist_Input_Field");
        this.table = document.getElementById("Playlists_Manager");
    }

    Create_New_Row(New_Playlist_ID) {
        let TemplateString = `
                    <tr>
                        <td class="PlaylistID_Container">
                        </td>
                        <td>
                            <button type="button" onclick="playlist_manager.Delete_Row(this);" class="Playlist_Remove">
                                Remove Playlist
                            </button>
                        </td>
                    </tr>
    `;

        this.Input_Row.insertAdjacentHTML('beforebegin', TemplateString);
        let New_Element = this.Input_Row.previousElementSibling;
        New_Element.querySelector("td").textContent = New_Playlist_ID;
    }

    Delete_Row(ClickedElement) {
        ClickedElement.parentElement.parentElement.remove();
    }

    Clear_Input_Row() {
        this.Input_Field.value = "";
    }

    Process_Playlists_Table_After_Add() {
        this.Create_New_Row(this.Input_Field.value);
        this.Clear_Input_Row();
    }

    Load_Playlists_From_Local_Storage() {
        let playlists = JSON.parse(localStorage.Playlists);

        if (!playlists) { return; }
        for (const playlist of playlists) {
            this.Create_New_Row(playlist);
        }
    }

    Save_Playlists_To_LocalStorage() {
        let Elements_That_Contain_Playlists = this.table.getElementsByClassName("PlaylistID_Container");
        let PlaylistIds = [];

        for (const element of Elements_That_Contain_Playlists) {
            PlaylistIds.push(element.textContent);
        }

        localStorage.Playlists = JSON.stringify(PlaylistIds);
    }
}