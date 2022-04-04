import { PLaylistsMenu } from '../Playlists_Menu/Playlists_Menu'
import { PlayerMenu } from '../Player/Player'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { AppStyle, BodyStyle, FooterStyle } from './App.style'

export default function App() {
    return (
        <AppStyle>
            <BodyStyle>
                <Header />
                <PLaylistsMenu />
                <PlayerMenu />
            </BodyStyle>
            <FooterStyle>
                <Footer />
            </FooterStyle>
        </AppStyle>
    );
}