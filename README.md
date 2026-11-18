# Neural-networks
### My progression on understanding how neural networks work.

#### I randomly got interested in how I could make an object detection system from scratch. So my first step was to learn how a single neuron works: what weights were, loss functions and gradients for backpropagation.

## 16th November:
### ----- (basicNeuron.js) -----

### Key note: For u nerds out there this neuron model was a model with no activation function because I didn't know what that was at the time.

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

Next up was learning about <strong>loss function.</strong>

The loss function measures how far a neuron's prediction is from the expected output.

For a single prediction, using Squared Error Loss:

$$
L = (y - \hat{y})^2
$$

Where:
- $L$ = Loss value
- $y$ = Expected output (target)
- $\hat{y}$ = Predicted output from the neuron

From this equation, I had to figure out how I could calculate the loss of each input and get the average of those losses. 

So this is what I did:

```javascript
function calculateLoss(prediction, expected) {
    return (prediction - expected) ** 2;
}

function calculateLossesIndividual(model, bias){

    const losses = [];
    const modelWeights = model.weights;

    for (let i = 0; i < trainingData.length; i++){

        const prediction = neuron(trainingData[i].inputs, modelWeights, bias);
        const loss = calculateLoss(prediction, trainingData[i].expected)
        losses.push(loss);

    }

    return losses;

}

function calculateAverage(input) {
    
    const sum = input.reduce((accumulator, current) => accumulator + current, 0);
    const ave = sum/input.length;

    return ave;

}
```

Yes I know that I didn't need to have a seperate average function and basically have an unecessary extra loop, but it was 2AM and I wasn't exactly thinking straight then.

But with that we now could get the losses of each input based of the neurons predictions and get the average loss of those two inputs. Yipe.

<img width="100%" alt="neuron drawing" src="https://github.com/user-attachments/assets/0e1a5741-0867-4df6-a45f-694b61595d55" />

But this model kinda sucks if it can't learn.

We can feed this model two inputs, 0 and 1, and give it basic AND gate problems:

```javascript
const trainingData = [
    { inputs: [0, 0], expected: 0 },
    { inputs: [0, 1], expected: 0 },
    { inputs: [1, 0], expected: 0 },
    { inputs: [1, 1], expected: 1 }
];
```

but if we try get its result to: 1 AND 0, it probably will produce something like -5 depending on the weights. Which isn't very useful.

So what do we do?

Let's get our prediction equation:

$$
z = \sum_{i=1}^{n} x_i w_i + b
$$

For our case of basic AND gate problems, which only have two inputs, let's simplify and change this to:

$$
z = x_1w_1 + x_2w_2 + b
$$

We'll also get out loss equation:


$$
L = (y - z)^2
$$

And substitute our prediction equation in it:

$$
L = (y - x_1w_1 + x_2w_2 + b)^2
$$

Now that we have our loss equation, let's differentiate in respect to each of the variables w1, w2, and b it to get the <strong>the change</strong> in loss.


```math
\frac{\partial z}{\partial w_1}
=
\frac{\partial}{\partial w_1}
(x_1w_1 + x_2w_2 + b)
```

