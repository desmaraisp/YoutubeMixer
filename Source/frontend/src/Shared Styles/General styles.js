import styled, { css } from 'styled-components'

export const onclick_Hover = css`
    cursor: pointer;
`

export const ImageBlock = css`
    display:block;
    width:100%;
`

export const ScrollTableBody = styled.tbody`
    overflow-y: auto;
    display: block;
    height: ${ props => props.heigth }
`