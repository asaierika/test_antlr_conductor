# using ANTLR with "SourceAcademy Conductor"

## starting point:

Forked from https://github.com/dyigitpolat/test_antlr_conductor
Refer to the original repository for the details to set up the conductor before cotinuing.

## for testing:

Pull Source Academy frontend (https://github.com/source-academy/frontend) and make the following changes:
Change line 5 in `flagConductorEvaluatorUrl.ts` to the address of the conductor, which is either https://asaierika.github.io/test_antlr_conductor/index.js (which is auto deployed when changes are pushed to the main branch of this repository), or http://localhost:3000/index.js (after running `npx serve dist --cors` on the conductor locally).
Change line 6 in `flagConductorEnable.ts` to true.
Open http://localhost:8000/playground in browser to test.
