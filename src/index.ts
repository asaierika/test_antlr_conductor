import { initialise } from "conductor/dist/conductor/runner/util/";
import {RustEvaluator} from "./RustEvaluator"

// test
console.log("Custom evaluator loaded successfully!");

const { runnerPlugin, conduit } = initialise(RustEvaluator);
