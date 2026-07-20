import React, { useState, useEffect, useRef } from 'react';
import { LogoMark } from './Navbar';
import './Welcome.css';

// Each line: the "command" typed, then the "response" printed instantly after
const LINES = [
  { cmd: 'welcome',  out: 'Welcome to my portfolio' },
  { cmd: 'whoami',   out: 'Matheesha Amarathunga' },
  { cmd: 'status',   out: 'Loading...' },
];

const TYPE_SPEED   = 45;   // ms per character
const LINE_PAUSE   = 350;  // pause after a line's output before next command
const END_PAUSE    = 700;  // pause after last line before auto-finishing

function Welcome({ onFinish }) {
  const [lineIndex, setLineIndex]   = useState(0);
  const [typedCmd, setTypedCmd]     = useState('');
  const [showOut, setShowOut]       = useState(false);
  const [history, setHistory]       = useState([]); // completed {cmd, out} lines
  const [exiting, setExiting]       = useState(false);
  const timeoutRef = useRef(null);

  const finish = () => {
    if (exiting) return;
    setExiting(true);
    sessionStorage.setItem('introSeen', '1');
    setTimeout(onFinish, 600); // matches CSS fade-out duration
  };

  useEffect(() => {
    if (lineIndex >= LINES.length) {
      timeoutRef.current = setTimeout(finish, END_PAUSE);
      return () => clearTimeout(timeoutRef.current);
    }

    const current = LINES[lineIndex];

    if (typedCmd.length < current.cmd.length) {
      timeoutRef.current = setTimeout(() => {
        setTypedCmd(current.cmd.slice(0, typedCmd.length + 1));
      }, TYPE_SPEED);
    } else if (!showOut) {
      timeoutRef.current = setTimeout(() => setShowOut(true), 250);
    } else {
      timeoutRef.current = setTimeout(() => {
        setHistory(h => [...h, current]);
        setTypedCmd('');
        setShowOut(false);
        setLineIndex(i => i + 1);
      }, LINE_PAUSE);
    }

    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typedCmd, showOut, lineIndex]);

  return (
    <div className={`welcome ${exiting ? 'welcome--exit' : ''}`}>
      <div className="welcome__orb welcome__orb--1" />
      <div className="welcome__orb welcome__orb--2" />

      <button className="welcome__skip" onClick={finish}>Skip →</button>

      <div className="welcome__content">
        <div className="welcome__logo">
          <LogoMark size="lg" />
        </div>

        <div className="welcome__terminal">
          {history.map((h, i) => (
            <div className="welcome__line" key={i}>
              <span className="welcome__prompt">&gt;</span> {h.cmd}
              <div className="welcome__output">{h.out}</div>
            </div>
          ))}

          {lineIndex < LINES.length && (
            <div className="welcome__line">
              <span className="welcome__prompt">&gt;</span> {typedCmd}
              {!showOut && <span className="welcome__cursor" />}
              {showOut && (
                <div className="welcome__output">
                  {LINES[lineIndex].out}
                  <span className="welcome__cursor" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Welcome;