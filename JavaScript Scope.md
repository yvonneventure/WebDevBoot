# Scope in JavaScript vs. in Python

## Scope in JavaScript

Should always use `const` and `let`.

|       | Within Function | Outside Function | if/loop/while/for |
|-------|-----------------|------------------|-------------------|
| `const` | local           | global           | local             |
| `let `  | local           | global           | local             |
| `var`   | local           | global           | global            |

## Scope in Python

Everything within block will be **local**, outside will be **global**. 

Use `global` keyword can make a local variable global.

```python
def myfunc():
  global x
  x = 300
  
```
