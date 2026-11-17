# Neural-networks
### My progression on how neural networks work.

#### I randomly got interested in how I could make an object detection system from scratch. So my first step was to learn how a single neuron works: what weights were, loss functions and gradients for backpropagation.

## 16th November:
The first step was to create a single neuron. For simplification my model used a 1 dimensional array to represent the matrix of the neuron. (And also cuz I didn't know how matrices work when I started this) <br>

I then learned the equation

$$
z = \sum_{i=1}^{n} x_i w_i + b
$$

Where:
- $x_i$ = Input value
- $w_i$ = Weight associated with the input
- $b$ = Bias
- $z$ = Weighted sum plus bias (pre-activation)
- $a$ = Final neuron output
- $n$ = Number of inputs
