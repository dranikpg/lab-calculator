import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Decimal from 'decimal.js';

function App() {
  const [number1, setNumber1] = useState("0");
  const [number2, setNumber2] = useState("0");
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState(null);

  const handleChangeNumber1 = (e) => setNumber1(e.target.value.replace(",", "."));
  const handleChangeNumber2 = (e) => setNumber2(e.target.value.replace(",", "."));

  const handleCalculation = () => {
    try {
      const n1 = new Decimal(number1);
      const n2 = new Decimal(number2);
      let res;

      if (operation === "+") {
        res = n1.plus(n2);
      } else if (operation === "-") {
        res = n1.minus(n2);
      }

      setResult(res.toString());
    } catch (e) {
      setResult(e.toString());
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

      <div style={{marginTop: "30vh"}}></div>
      
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

      <Typography variant="h6" gutterBottom>
        Результат: {result}
      </Typography>
    </Container>
  );
}

export default App;
