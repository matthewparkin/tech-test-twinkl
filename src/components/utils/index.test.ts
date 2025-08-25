import { act, renderHook } from "@testing-library/react";
import { useDebounce } from "./";

jest.useFakeTimers();

describe("useDebounce Hook", () => {
    test("returns the initial value immediately", () => {
        const { result } = renderHook(() => useDebounce("initial", 500));
        expect(result.current).toBe("initial");
    });

    test("updates the debounced value after the delay", () => {
        const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
            initialProps: { value: "initial", delay: 500 },
        });
        rerender({ value: "updated", delay: 500 });

        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(result.current).toBe("updated");
    });
});
