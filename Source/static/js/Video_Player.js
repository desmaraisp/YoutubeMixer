class Player_Manager {
    Load_Iframe_API() {
        var tag = document.createElement('script');

        window.onYouTubeIframeAPIReady = this.Initialize_Player;

        tag.src = "https://www.youtube.com/iframe_api";
        tag.type = "text/javascript";

        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


    }

    constructor() {
        if (!localStorage.Videos) { localStorage.Videos = '[]' }

        this.Load_Iframe_API();
        this.Player_queue_element = document.getElementById("Player_queue")
    }

    Start_Video(event) {
        event.target.playVideo();
    }

    Current_Video_Done(event) {
        if (event.data == YT.PlayerState.ENDED) {
            this.Set_Player_Video_Index(Number(localStorage.Current_Video_Index) + 1);
        }

    }

    Initialize_Player() {
        let Videos = JSON.parse(localStorage.Videos);

        if (Videos.length === 0) { return;}

        let Selected_Index = localStorage.Current_Video_Index;

        let Current_ID = Videos[Selected_Index]["ID"]

        this.player = new YT.Player('player', {
            videoId: Current_ID,
            playerVars: {
                'playsinline': 1
            },
            events: {
                'onReady': this.Start_Video,
                'onStateChange': this.Current_Video_Done.bind(this),
            }
        });
    }

    Find_Clicked_Video_Index_In_Player(element) {
        let Current_Row = element.parentElement.parentElement

        var i = 0;
        while ((Current_Row = Current_Row.previousElementSibling) != null) {
            ++i;
        }
        return i;
    }

    Create_Video_Table_Row(Video_ID, Video_Title, Video_image) {
        let TemplateString = `
                <tr>
                    <td>
                        <a onclick="player_manager.Handle_Click_On_Video_In_List(this);">${Video_Title}</a>
                    </td>
                </tr>
`;
        this.Player_queue_element.getElementsByTagName("tbody")[0].insertAdjacentHTML('beforeend', TemplateString);
    }

    Set_Player_Video_Index(Selected_Index) {
        let Videos = JSON.parse(localStorage.Videos);
        localStorage.Current_Video_Index = Selected_Index;

        let New_ID = Videos[Selected_Index]["ID"]
        this.player.loadVideoById(New_ID)
    }

    Reset_Video_Player() {
        let tbody_element = this.Player_queue_element.getElementsByTagName("tbody")[0];
        tbody_element.innerHTML = '';

        localStorage.Current_Video_Index = 0;

        let iframe = document.getElementById("player");
        let New_Tag = document.createElement('div');
        New_Tag.setAttribute("id", "player");
        iframe.replaceWith(New_Tag);

        this.Initialize_Player();
    }

    Load_From_Storage() {
        let Videos = JSON.parse(localStorage.Videos);
        for (const video_json of Videos) {
            this.Create_Video_Table_Row(video_json["ID"], video_json["Name"], video_json["Image"]);
        }
    }

    Reload() {
        this.Reset_Video_Player();
        this.Load_From_Storage();
    }


    Handle_Click_On_Video_In_List(element) {
        let index = this.Find_Clicked_Video_Index_In_Player(element);

        this.Set_Player_Video_Index(index);
    }
}