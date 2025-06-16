export function parseJson<T, D>(json: unknown, ClassType: new (data: D) => T): T {
  try {
    return new ClassType(json as D);
  } catch (error) {
    throw new Error(`Failed to parse JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}