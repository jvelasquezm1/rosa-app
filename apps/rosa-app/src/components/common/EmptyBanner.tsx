import { FlexDiv, StyledIcon, StyledBanner, StyledP } from './styles';

export default function EmptyBanner() {
  return (
    <FlexDiv>
      <StyledBanner>
        <StyledIcon />
        <StyledP>These dates are not available for booking</StyledP>
      </StyledBanner>
    </FlexDiv>
  )
}
