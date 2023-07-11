export const initial_state = {
  whereami: { x: 50, y: 150, a: 0 },
  objects: [
    {
      type: "stone",
      coords: { x: -20, y: 14 },
      circuit: [
        { x: 5, y: 7 },
        { x: -7, y: 7 },
        { x: -8, y: -9 },
        { x: 8, y: -9 },
      ],
    },
    {
      type: "stone",
      coords: { x: 200, y: 70 },
      circuit: [
        { x: 0, y: 0 },
        { x: 40, y: 0 },
        { x: 60, y: 30 },
        { x: 40, y: 60 },
        { x: 0, y: 60 },
        { x: -20, y: 30 },
      ],
    },
    {
      type: "stone",
      coords: { x: 30, y: 300 },
      circuit: [
        { x: 0, y: 100 },
        { x: -86, y: -50 },
        { x: 86, y: -50 },
      ],
    },
    {
      type: "tree",
      coords: { x: 25, y: 44 },
      circuit: [
        { x: 22, y: 18 },
        { x: -11, y: 17 },
        { x: -15, y: -19 },
        { x: 20, y: -39 },
        { x: 30, y: -19 },
      ],
    },
    {
      type: "lighter",
      coords: { x: -100, y: 84 },
      circuit: [
        { x: 0, y: 10 * 0 },
        { x: 20, y: 30 },
        { x: 50, y: 30 },
        { x: 30, y: 50 },
        { x: 40, y: 80 },
        { x: 0, y: 60 },
        { x: -40, y: 80 },
        { x: -30, y: 50 },
        { x: -50, y: 30 },
        { x: -20, y: 30 },
      ],
    },
  ],
}
