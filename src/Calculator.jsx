import React, { useState } from "react";
import "./Calculator.css";
import { evaluate } from "mathjs";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [ansUsed, setAnsUsed] = useState(false);

  const isOperator = (val) => ["+", "-", "×", "÷", "%"].includes(val);
  const sanitize = (exp) =>
    exp.replace(/×/g, "*").replace(/÷/g, "/").replace(/%/g, "%");

  const handleClick = (value) => {
    const lastChar = expression.slice(-1);

    // AC = Clear
    if (value === "AC") {
      setExpression("");
      setResult("");
      setAnsUsed(false);
      return;
    }

    // Backspace
    if (value === "⌫") {
      if (ansUsed) {
        setExpression("");
        setResult("");
        setAnsUsed(false);
      } else {
        setExpression(expression.slice(0, -1));
      }
      return;
    }

    // Equal
    if (value === "=") {
      try {
        let evalExpr = sanitize(expression || "0");
        const last = evalExpr.slice(-1);
        if (["+", "-", "*", "/", "%"].includes(last)) {
          const match = evalExpr.match(/([+\-*/%])([^+\-*/%]+)$/);
          evalExpr += match?.[2] || "0";
        }

        const evaluated = evaluate(evalExpr);

        if (!isFinite(evaluated)) {
          setResult("undefined");
        } else {
          setResult(String(evaluated));
        }

        setAnsUsed(true);
      } catch {
        setResult("Error");
        setAnsUsed(false);
      }
      return;
    }

    // ± (toggle sign)
    if (value === "±") {
      if (ansUsed) {
        setExpression(String(-parseFloat(result)));
        setResult("");
        setAnsUsed(false);
        return;
      }

      try {
        const val = parseFloat(expression);
        if (!isNaN(val)) {
          setExpression(String(-val));
        }
      } catch {}
      return;
    }

    // √
    if (value === "√") {
      try {
        const val = parseFloat(expression || "0");
        setResult(Math.sqrt(val).toString());
        setAnsUsed(true);
      } catch {
        setResult("Error");
        setAnsUsed(false);
      }
      return;
    }

    // . (dot)
    if (value === ".") {
      if (expression === "") {
        setExpression("0.");
        return;
      }

      const parts = expression.split(/[+\-×÷%]/);
      const lastPart = parts[parts.length - 1];
      if (lastPart.includes(".")) return;

      setExpression(expression + ".");
      return;
    }

    // After result
    if (ansUsed) {
      if (isOperator(value)) {
        setExpression(result + value);
      } else {
        setExpression(value);
      }
      setResult("");
      setAnsUsed(false);
      return;
    }

    // First input
    if (expression === "") {
      if (value === "-") return setExpression("-");
      if (isOperator(value)) return setExpression("0" + value);
      return setExpression(value);
    }

    // Prevent double operators
    if (isOperator(value) && isOperator(lastChar)) {
      setExpression(expression.slice(0, -1) + value);
      return;
    }

    // Prevent leading zero like 023
    if (/[0-9]/.test(value)) {
      const parts = expression.split(/([+\-×÷%])/);
      const last = parts[parts.length - 1];

      if (last === "0") {
        parts[parts.length - 1] = value;
        setExpression(parts.join(""));
        return;
      }

      if (/^0[0-9]+$/.test(last)) {
        parts[parts.length - 1] = last.replace(/^0+/, "") + value;
        setExpression(parts.join(""));
        return;
      }
    }

    setExpression(expression + value);
    setResult("");
  };

  const buttons = [
    ["AC", "⌫", "±", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["√", "0", ".", "=", "%"],
  ];

  return (
    <div className="calculator">
      <div className="display">
        <div className="expression">{expression || "0"}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        {buttons.flat().map((btn, i) => (
          <button key={i} onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
