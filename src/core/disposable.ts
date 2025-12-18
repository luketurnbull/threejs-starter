/**
 * Interface for objects that hold resources requiring cleanup.
 * Implement this to ensure proper memory management in Three.js scenes.
 */
export interface Disposable {
  dispose(): void;
}

/**
 * Type guard to check if an object implements Disposable
 */
export function isDisposable(obj: unknown): obj is Disposable {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "dispose" in obj &&
    typeof (obj as Disposable).dispose === "function"
  );
}
