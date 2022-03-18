import styled from 'styled-components'
import { CalendarToday } from '@material-ui/icons';

export const FlexDiv = styled.div`
    display: flex;
`;

export const StyledP = styled.p`
    display: inline;
    margin: 1rem;
`;

export const StyledIcon = styled(CalendarToday)`
    transform: translateY(0.4rem);
`;

export const StyledBanner = styled.div`
    margin: auto;
    box-shadow: 5px 5px 9px 0px rgba(0,0,0,0.45);
    padding: 1.5rem;
    border-radius: 0.5rem;
`;