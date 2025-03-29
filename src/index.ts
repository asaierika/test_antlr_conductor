import { initialise } from "conductor/dist/conductor/runner/util/";
import { SimpleLangEvaluator } from "./SimpleLangEvaluator";

// test
console.log("Custom evaluator loaded successfully!");

const { runnerPlugin, conduit } = initialise(SimpleLangEvaluator);
