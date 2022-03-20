import { Card } from '@material-ui/core';
import renderer from 'react-test-renderer';

describe('Card component', () => {
    it('should render successfully', () => {
        const component = renderer.create(<Card />)
        expect(component.toJSON()).toMatchSnapshot()
    });
})