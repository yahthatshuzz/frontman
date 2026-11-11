import { describe, it, expect } from 'vitest';
import { getMockScore, DeliveryScore } from './agents';

describe('Delivery Scoring', () => {
  it('returns a valid score structure', () => {
    const score = getMockScore();
    expect(score).toBeDefined();
    expect(score.overallScore).toBeDefined();
    expect(typeof score.overallScore).toBe('number');
  });

  it('mock score has all required fields', () => {
    const score = getMockScore();
    expect(score.pace).toBeDefined();
    expect(score.fillerWords).toBeDefined();
    expect(score.eyeContact).toBeDefined();
    expect(score.energy).toBeDefined();
    expect(score.tips).toBeDefined();
    expect(score.moments).toBeDefined();
  });

  it('overall score is between 0 and 100', () => {
    const score = getMockScore();
    expect(score.overallScore).toBeGreaterThanOrEqual(0);
    expect(score.overallScore).toBeLessThanOrEqual(100);
  });

  it('eye contact percentage is between 0 and 100', () => {
    const score = getMockScore();
    expect(score.eyeContact.percentage).toBeGreaterThanOrEqual(0);
    expect(score.eyeContact.percentage).toBeLessThanOrEqual(100);
  });

  it('provides exactly 3 tips', () => {
    const score = getMockScore();
    expect(score.tips.length).toBe(3);
    score.tips.forEach((tip) => {
      expect(typeof tip).toBe('string');
      expect(tip.length).toBeGreaterThan(0);
    });
  });

  it('marks timestamped moments with feedback', () => {
    const score = getMockScore();
    expect(score.moments.length).toBeGreaterThanOrEqual(2);
    score.moments.forEach((moment) => {
      expect(typeof moment.timeMs).toBe('number');
      expect(typeof moment.feedback).toBe('string');
    });
  });
});
