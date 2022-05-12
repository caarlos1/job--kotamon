import bus from "../util/bus";

export const useGlobalEvents = () => {
  function emit<T>(event: string, payload: T) {
    bus.emit(event, payload);
  }

  function listen<T, E>(event: string, fn: (payload: T) => E) {
    bus.on(event, fn);
  }

  function off<T, E>(event: string, fn: (payload: T) => E) {
    bus.off(event, fn);
  }

  return { emit, listen, off };
};
