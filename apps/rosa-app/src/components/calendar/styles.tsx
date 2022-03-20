import { Button } from '@material-ui/core'
import styled from 'styled-components'

export const CalendarContainer = styled.div`
    margin: auto;
    width: 40rem;
    padding: 3rem;
    border: solid;
    border-radius: 1rem;
    background: #ffff;
    box-shadow: 5px 5px 9px 0px rgba(0,0,0,0.45);
`;

export const DivCenter = styled.div`
    text-align: center;
    padding: 1rem;
    margin: 1rem;
`;

export const ButtonCalendar = styled(Button)<any>`
    ${(props: any) => 
        `color: ${props.selected ? '#ffff' : '#00000'} !important; background-color: ${props.selected ? '#757575' : '#ffff'} !important;`}
    text-align: center;
    padding: 1rem;
    margin: 1rem;
    &:hover {
        border: solid
    }
`;

export const StyledP = styled.p`
    margin: 2rem;
`;

