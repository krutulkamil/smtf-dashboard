import config from '../react';

describe('React ESLint Config', () => {
  it('should match the snapshot', () => {
    expect(config).toMatchSnapshot();
  });
});
