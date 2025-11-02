import config from '../vitest';

describe('Vitest ESLint Config', () => {
  it('should match the snapshot', () => {
    expect(config).toMatchSnapshot();
  });
});
