import config from '../recommended';

describe('Recommended ESLint Config', () => {
  it('should match the snapshot', () => {
    expect(config).toMatchSnapshot();
  });
});
