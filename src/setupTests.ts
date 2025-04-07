import '@testing-library/jest-dom';

// Mock TextEncoder/TextDecoder for tests
if (typeof global.TextEncoder === 'undefined') {
  class MockTextEncoder {
    encode(input: string): Uint8Array {
      return new Uint8Array(Buffer.from(input));
    }
  }
  // @ts-expect-error - custom implementation
  global.TextEncoder = MockTextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  class MockTextDecoder {
    decode(input?: BufferSource): string {
      if (!input) return '';
      return new TextDecoder().decode(input);
    }
  }
  // @ts-expect-error - custom implementation
  global.TextDecoder = MockTextDecoder;
} 