import { About, AboutLink, FlexContainer } from './Footer.style'

export function Footer() {
    return (
        <>
            <About>
                <FlexContainer>
                    <AboutLink target={'_blank'} href='https://philippedesmarais.netlify.app/'>About me</AboutLink>
                    <AboutLink target={'_blank'} href='https://github.com/CephalonAhmes/YoutubeMixer'>Source code</AboutLink>
                </FlexContainer>
            </About>
        </>
    );
}