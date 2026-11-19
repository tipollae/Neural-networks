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
L = (\hat{y} - y)^2
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
L = (z - y)^2
$$

And substitute our prediction equation in it:

$$
L = (x_1w_1 + x_2w_2 + b - y)^2
$$

Now that we have our loss equation, let's differentiate in respect to each of the variables to get <strong>the change</strong> in loss.

Derivative in respect to w1
```math
\frac{\partial L}{\partial w_1}
= 2x_1(x_1w_1 + x_2w_2 + b - y)

```

Derivative in respect to w2
```math
\frac{\partial L}{\partial w_2}
= 2x_2(x_1w_1 + x_2w_2 + b - y)
```

Derivative in respect to b
```math
\frac{\partial L}{\partial b}
= 2(x_1w_1 + x_2w_2 + b - y)
```
<br><br>
Now that we have our gradients, we now know roughly in what direction the weights should change.

So we calculate the new weights:

$$
w_1^{\text{new}} = w_1^{\text{old}} - \eta \frac{\partial L_{\text{avg}}}{\partial w_1}
$$

Where:

- $w_1^{\text{new}}$ = The updated weight
- $w_1^{\text{old}}$ = The current weight
- $\eta$ = Learning rate
- $L_{\text{avg}}$ = Average loss across all training examples
- $\frac{\partial L_{\text{avg}}}{\partial w_1}$ = Average gradient of the loss with respect to the first weight

And this is what all that looks like in code:

```javascript
function calculateGradients(trainingData, model){

    const weightsX = [];
    const weightsY = [];
    const biases = [];

    for (let i = 0; i < trainingData.length; i++){

        const respectToW1 = 2 * trainingData[i].inputs[0] * (
        trainingData[i].inputs[0] * model.weights[0] + trainingData[i].inputs[1] * model.weights[1] + 
        model.bias - trainingData[i].expected
        );

        const respectToW2 = 2 * trainingData[i].inputs[1] * (
        trainingData[i].inputs[0] * model.weights[0] + trainingData[i].inputs[1] * model.weights[1] + 
        model.bias - trainingData[i].expected
        );

        const respectToBias = 2 * (
        trainingData[i].inputs[0] * model.weights[0] + trainingData[i].inputs[1] * model.weights[1] + 
        model.bias - trainingData[i].expected
        );

        weightsX.push(respectToW1);
        weightsY.push(respectToW2);
        biases.push(respectToBias);

    }

    updateModel(model, [weightsX, weightsY, biases], 0.1);
}

function updateModel(model, weights, LEARNING_RATE){
    model.weights[0] = model.weights[0] - (LEARNING_RATE * calculateAverage(weights[0]));
    model.weights[1] = model.weights[1] - (LEARNING_RATE * calculateAverage(weights[1]));
    model.bias = model.bias - (LEARNING_RATE * calculateAverage(weights[2]));
}
```



## 17th - 18th November:
### ----- (neuralLayer.js) -----

Now that I learned how a single neuron worked, next was how multiple neurons work together in a layer, a dense layer so it's called.

I first had to learn how matrices worked and their operations but I really can't be bothered explaining that so just know that I learned them :/

so for getting the prediction of a single neuron it was:

$$
z = \sum_{i=1}^{n} x_i w_i + b
$$

but now we have:

$$
Z = XW + B
$$

this is the formula before activation, and we learn what activation functions are in a bit.

Basically though, this formula allows for multiple neurons in a layer to make a linear output, and another thing. Unlike our previous single neuron example, we're now dealing with a hidden layer (a hidden layer are the layers between the input and output layers), so Z isn't necessarily our final prediction. Instead, it's an output that gets passed on to the next layer. The final prediction is produced at the output layer.

<img width="100%" alt="output drawing matrices" src="https://github.com/user-attachments/assets/745aba5f-5b7f-46f7-83de-52ca0f7254d8" />

consider 4 neurons with weights

<img width="100%" alt="neurons drawing" src="https://github.com/user-attachments/assets/283d3a8a-5e12-46e6-9bb7-ab0e89806665" />

In our single neuron example from before, 1 neuron had two weights, but what would an example of multiple neurons with their own weight look like? Well it'd be this thing.

The matrix on the right represents the weights of each neuron, each column in the matrix are weights that belongs to a single neuron, and each weight basically meant that the neuron is processing different inputs. In this case in my ugly drawing, each neuron is processing 3 inputs, with each input having a weight.

```javascript
const weights = [
    [1,2,3,4],
    [5,1,7,8],
    [1,8,3,0],
]
```
