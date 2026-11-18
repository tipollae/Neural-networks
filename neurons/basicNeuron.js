
const trainingData = [
    { inputs: [0, 0], expected: 0 },
    { inputs: [0, 1], expected: 0 },
    { inputs: [1, 0], expected: 0 },
    { inputs: [1, 1], expected: 1 }
];

const currentModel = {
    weights: [0.49621192129779623, 0.4921149262462829],
    bias: -0.2430769996112879
}

let prediction = neuron(trainingData[3].inputs, currentModel.weights, currentModel.bias);
console.log(prediction);

async function train(displayModel, displayPrediction) {
    for (let i = 0; i < 100; i++) {
        calculateGradients(trainingData, currentModel);

        console.clear();

        const totalLoss = calculateAverage(
        calculateLossesIndividual(currentModel, currentModel.bias));


        if (displayModel){
        console.log(
`Iteration ${i + 1}
w1: ${currentModel.weights[0]}
w2: ${currentModel.weights[1]}
bias: ${currentModel.bias}

loss: ${totalLoss}
` 
);
}

    if (displayPrediction){

        const res1 = neuron(trainingData[0].inputs, currentModel.weights, currentModel.bias);
        const res2 = neuron(trainingData[1].inputs, currentModel.weights, currentModel.bias);
        const res3 = neuron(trainingData[2].inputs, currentModel.weights, currentModel.bias);
        const res4 = neuron(trainingData[3].inputs, currentModel.weights, currentModel.bias);

        console.log(
        `
0 AND 0. ANSWER: ${Math.round(res1)}
0 AND 1. ANSWER: ${Math.round(res2)}
1 AND 0. ANSWER: ${Math.round(res3)}
1 AND 1. ANSWER: ${Math.round(res4)}
` 
);

    }

        await wait(200);
    }
}

train(true, true);

function neuron(inputs, weights, bias){

    let sum = bias;

    for (let i = 0; i < inputs.length; i++){

        sum += inputs[i] * weights[i];

    }

    return sum;

}

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

function wait (waitTime){
    return new Promise(resolve => setTimeout(resolve, waitTime))
}