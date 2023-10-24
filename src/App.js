import React, { useState, useEffect, Fragment } from "react";
import { TextField, Button, Container, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Decimal from 'decimal.js';

function App() {
  Decimal.set({ toExpPos: 50, precision: 50 });

  const [number1, setNumber1] = useState("0");
  const [number2, setNumber2] = useState("0");
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState(null);
  const [hint, setHint] = useState(null);

  const handleChangeNumber1 = (e) => setNumber1(e.target.value.replace(",", "."));
  const handleChangeNumber2 = (e) => setNumber2(e.target.value.replace(",", "."));

  const format = (s) => {
    let parts = s.toString().replace(/ /g, '').split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
  };

  const handleCalculation = () => {
    const isBad = (s) => /\s/g.test(s) && format(s) != s;
    if (isBad(number1) || isBad(number2)) {
      setHint([format(number1), format(number2)]);
    } else {
      setHint(null);
    }

    try {
      const n1 = new Decimal(number1.replace(/ /g, ''));
      const n2 = new Decimal(number2.replace(/ /g, ''));
      let res;


      if (operation === "+") {
        res = n1.plus(n2);
      } else if (operation === "-") {
        res = n1.minus(n2);
      } else if (operation === "*") {
        res = n1.times(n2);
      } else if (operation === "/") {
        if (n2.isZero()) res = "Ошибка (O_o): Деление на 0!"
        else res = n1.dividedBy(n2);
      }

      console.log(n1, n2, res);

      if (!(typeof res === 'string')) {
        res = format(res.toDecimalPlaces(6));
      }

      setResult(res);
    } catch (e) {
      setResult("Неверный ввод");
    }
  };

  useEffect(() => {
    handleCalculation();
  }, [number1, number2, operation]);

  return (
    <Container maxWidth="md">
      <Typography variant="h6" align="center" gutterBottom>
        Калькулятор - Олешко Владислав Юрьевич: 4 курс, 4 группа, 2023 год
      </Typography>

      <div style={{ marginTop: "30vh" }}></div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <TextField
          style={{ flex: 1, marginRight: '10px' }}
          variant="outlined"
          label="Число 1"
          value={number1}
          onChange={handleChangeNumber1}
        />
        <FormControl variant="outlined" style={{ flex: 0.3 }}>
          <InputLabel>Операция</InputLabel>
          <Select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            label="Операция"
          >
            <MenuItem value="+">+</MenuItem>
            <MenuItem value="-">-</MenuItem>
            <MenuItem value="*">*</MenuItem>
            <MenuItem value="/">/</MenuItem>
          </Select>
        </FormControl>
        <TextField
          style={{ flex: 1, marginLeft: '10px' }}
          variant="outlined"
          label="Число 2"
          value={number2}
          onChange={handleChangeNumber2}
        />
      </div>

      {hint &&
        <Fragment><Typography variant="caption" style={{ color: "#FFA500" }}>
          Подсказка: неверная расстановка пробелов: &nbsp;
          <Typography variant="solid" color="primary" noWrap>{hint[0]}</Typography> &nbsp;{operation}&nbsp;
          <Typography variant="solid" color="primary" noWrap>{hint[1]}</Typography>
        </Typography></Fragment>
      }

      <Typography variant="h6" gutterBottom>
        Результат: {result}
      </Typography>
    </Container>
  );
}

export default App;
