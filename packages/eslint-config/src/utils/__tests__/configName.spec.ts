import { configName } from '../configName';

describe('configName', () => {
  it('should return the correct config name with single argument', () => {
    const result = configName('rule');
    expect(result).toBe('@smtf-eslint/rule');
  });

  it('should return the correct config name with multiple arguments', () => {
    const result = configName('rules', 'no-console');
    expect(result).toBe('@smtf-eslint/rules/no-console');
  });

  it('should return the correct config name with no arguments', () => {
    const result = configName();
    expect(result).toBe('@smtf-eslint/');
  });
});
