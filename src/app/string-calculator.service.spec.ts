import { TestBed } from '@angular/core/testing';
import { StringCalculatorService } from './string-calculator.service';

describe('StringCalculatorService', () => {
  let service: StringCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 0 for an empty string', () => {
    expect(service.add('')).toBe(0);
  });

  it('should return the number itself for a single number', () => {
    expect(service.add('1')).toBe(1);
    expect(service.add('5')).toBe(5);
  });

  it('should return the sum of two comma-separated numbers', () => {
    expect(service.add('1,2')).toBe(3);
  });

  it('should return the sum of multiple comma-separated numbers', () => {
    expect(service.add('1,2,3')).toBe(6);
  });

  it('should handle new lines as delimiters', () => {
    expect(service.add('1\n2,3')).toBe(6);
  });

  it('should handle custom delimiters', () => {
    expect(service.add('//;\n1;2')).toBe(3);
  });

  it('should throw an exception for negative numbers', () => {
    expect(() => service.add('1,-2')).toThrow(new Error('Negative numbers not allowed: -2'));
  });

  it('should show all negative numbers in the exception message', () => {
    expect(() => service.add('1,-2,-3')).toThrow(new Error('Negative numbers not allowed: -2, -3'));
  });

  it('should ignore numbers greater than 1000', () => {
    expect(service.add('2,1001')).toBe(2);
  });

  it('should handle delimiters of any length', () => {
    expect(service.add('//[***]\n1***2***3')).toBe(6);
  });

  it('should handle multiple custom delimiters', () => {
    expect(service.add('//[*][%]\n1*2%3')).toBe(6);
  });
});
