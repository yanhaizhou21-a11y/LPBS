const fs = require('node:fs');
const ts = require('typescript');

const source = fs.readFileSync('src/lib/http.ts', 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const loaded = { exports: {} };
new Function('exports', 'module', compiled)(loaded.exports, loaded);

async function check() {
  const valid = await loaded.exports.readJsonResponse(
    new Response(JSON.stringify({ success: true }), { status: 200 }),
    'fallback',
  );
  if (!valid.success) throw new Error('Valid JSON was not parsed.');

  for (const body of ['', '<html>proxy error</html>']) {
    try {
      await loaded.exports.readJsonResponse(new Response(body, { status: 502 }), 'Server tidak merespons');
      throw new Error('Invalid response was accepted.');
    } catch (error) {
      if (!String(error.message).includes('Server tidak merespons')) throw error;
    }
  }

  console.log('readJsonResponse: valid, empty, and invalid-body checks passed');
}

check().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
