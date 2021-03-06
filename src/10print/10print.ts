import {
  OutputTerminal,
  Loop,
  TerminalConfig,
  random
} from 'terminaltxt';

let term: OutputTerminal;
const loop: Loop = new Loop(init, update);

function init(): void {
  term = new OutputTerminal(
    {
      width: 40,
      container: document.getElementById('container-10print'),
    } as TerminalConfig, 
    '                                        ' // start at the correct width
  );
  loop.frameRate(100);
  commodorePrintOut();
  loop.running(false);
  simulateWriteOut('10 PRINT CHR$(205.5+RND(1)); : GOTO 10', () => {
    simulateWriteOut('RUN', () => {
      loop.running(true);
    });
  });
}

function commodorePrintOut(): void {
  term.writeln('    **** COMMODORE 64 BASIC V2 ****  ');
  term.newLine();
  term.writeln(' 64K RAM SYSTEM  38911 BASIC BYTES FREE ')
  term.newLine();
  term.writeln('READY.');
  term.newLine();
}

function simulateWriteOut(text: string, callback: Function, endWithNewLine: boolean = true): void {
  if (text.length === 0) {
    if (endWithNewLine) {
      term.newLine();
    }
    callback();
    return;
  } else {
    setTimeout(() => {
      term.write(text.substring(0, 1));
      simulateWriteOut(text.substring(1, text.length), callback);
    }, random(50, 150));
  }
}

function update(): void {
  term.write(random() > 0.5 ? '\\' : '/');
}