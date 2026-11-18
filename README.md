# Neural-networks
### My progression on how neural networks work.

#### I randomly got interested in how I could make an object detection system from scratch. So my first step was to learn how a single neuron works: what weights were, loss functions and gradients for backpropagation.

## 16th November:
### (basicNeuron.js)

The first step was to create a single neuron. For simplification my model used a 1 dimensional array to represent the matrix of the neuron. (And also cuz I didn't know how matrices work when I started this) <br>

```javascript
const currentModel = {
    weights: [0.49621192129779623, 0.4921149262462829],
    bias: -0.2430769996112879
}
```
<br>

I then learned the equation <br>

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

This equation could basically recieve an input, say 0 and 1, and create some sort of prediction with it. Though with this alone, the prediction could easily be wrong. <br>

This was the equation modelled as a function <br>

```javascript
function neuron(inputs, weights, bias){

    let sum = bias;

    for (let i = 0; i < inputs.length; i++){

        sum += inputs[i] * weights[i];

    }

    return sum;

}
```

Next up was learning about loss functions.


### Single Neuron Loss Function

The loss function measures how far a neuron's prediction is from the expected output.

For a single prediction, using Squared Error Loss:

$$
L = (y - \hat{y})^2
$$

Where:
- $L$ = Loss value
- $y$ = Expected output (target)
- $\hat{y}$ = Predicted output from the neuron

**For multiple training samples (Mean Squared Error):**

$$
MSE = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2
$$

Where:
- $n$ = Total number of training samples
- $y_i$ = Expected output for sample $i$
- $\hat{y}_i$ = Predicted output for sample $i$

**Example:**

If the expected output is $1$ and the neuron predicts $0.8$:

$$
L = (1 - 0.8)^2 = 0.04
$$
