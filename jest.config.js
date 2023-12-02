module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
