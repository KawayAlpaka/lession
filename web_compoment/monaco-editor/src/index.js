// import * as monaco from 'monaco-editor';

// monaco.editor.create(document.getElementById('container'), {
//   value: [
//     'function x() {',
//     '\tconsole.log("Hello world!");',
//     '}'
//   ].join('\n'),
//   language: 'javascript'
// });

window.require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.21.2/min/vs' }});

// Before loading vs/editor/editor.main, define a global MonacoEnvironment that overwrites
// the default worker url location (used when creating WebWorkers). The problem here is that
// HTML5 does not allow cross-domain web workers, so we need to proxy the instantiation of
// a web worker through a same-domain script
window.MonacoEnvironment = {
  getWorkerUrl: function(workerId, label) {
    return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
      self.MonacoEnvironment = {
        baseUrl: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.21.2/min/'
      };
      importScripts('https://cdn.jsdelivr.net/npm/monaco-editor@0.21.2/min/vs/base/worker/workerMain.js');`
    )}`;
  }
};

window.require(["vs/editor/editor.main"], function () {
  monaco.editor.create(document.getElementById('container'), {
    value: [
      'function x() {',
      '\tconsole.log("Hello world!");',
      '}'
    ].join('\n'),
    language: 'javascript'
  });
});