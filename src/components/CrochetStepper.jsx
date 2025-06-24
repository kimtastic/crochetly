import React, { useState, useEffect, useRef } from 'react';
import pkg from 'react-stitch';
const { GridBlock, GridCell } = pkg;

export default function CrochetStepper({ steps = [] }) {
  const [index, setIndex] = useState(0);
  const wrapperRef = useRef(null);

  useEffect(() => {
    wrapperRef.current?.focus();
  }, []);

  const next = () => setIndex(i => (i + 1 < steps.length ? i + 1 : i));
  const prev = () => setIndex(i => (i - 1 >= 0 ? i - 1 : i));

  const onKey = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      next();
    } else if (e.key === 'Backspace') {
      prev();
    }
  };

  const renderStepContent = (step) => {
    if (typeof step === 'string') {
      switch (step) {
        case "Ch 20":
          return <p>Chain 20 stitches</p>;
        case "Sc into each st":
          return <p>Single crochet into each stitch</p>;
        case "Inc every 5th st":
          return <p>Increase every 5th stitch</p>;
        case "Dec every 3rd st":
          return <p>Decrease every 3rd stitch</p>;
        case "Fasten off and weave ends":
          return <p>Fasten off and weave in the ends</p>;
        default:
          return <p>{step}</p>;
      }
    }

    // Safety fallback for unexpected object
    return <pre>{JSON.stringify(step)}</pre>;
  };

  return (
    <div ref={wrapperRef} tabIndex="0" onKeyDown={onKey} style={{ outline: 'none' }}>
      <GridBlock gridGap="4px" gridColumnRepeat={4}>
        <GridCell gridColumnSpan={4}>
          <strong>Step {index + 1} of {steps.length}</strong>
        </GridCell>
        <GridCell gridColumnSpan={4}>
          {renderStepContent(steps[index])}
        </GridCell>
        <GridCell gridColumnSpan={2}>
          <button onClick={prev} disabled={index === 0}>Back</button>
        </GridCell>
        <GridCell gridColumnSpan={2}>
          <button onClick={next} disabled={index === steps.length - 1}>Next</button>
        </GridCell>
      </GridBlock>

      <style>{`
        button {
          width: 100%;
          padding: 0.6rem;
          margin-top: 0.4rem;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        div {
          max-width: 400px;
          margin: 1rem auto;
          font-family: sans-serif;
        }
        p {
          margin: 0;
        }
      `}</style>
    </div>
  );
}

