
const predictions = [
  [ 4.7, 4.6499999999999995 ],
  [ 4.9399999999999995, 5.329999999999999 ],
  [ 6.96, 7.57 ]
];

const expected = [0, 1, 1];
const probabilities = softmax(predictions);
const averageLoss = calculateAverageLoss(probabilities, expected);
console.log(averageLoss)

function softmax(outputLayer){

    const probabilityMatrix = [];

    const totalSums = [];

    for (let i = 0; i < outputLayer.length; i++){

        let totalExponentiatedScore = 0;

        for (let j = 0; j < outputLayer[i].length; j++){
            totalExponentiatedScore += (Math.E)**outputLayer[i][j];
        }

        totalSums.push(totalExponentiatedScore)   

    }

    for (let i = 0; i < outputLayer.length; i++){

        const probabilities = [];

        for (let j = 0; j < outputLayer[i].length; j++){

            const exponantiatedScore = (Math.E)**outputLayer[i][j];
            const probability = exponantiatedScore/totalSums[i];

            probabilities.push(probability);

        }

        probabilityMatrix.push(probabilities);

    }

    return probabilityMatrix;

}

function crossEntropyLoss(probabilities, expected){

    let probabilityCorrect;

    for (let i = 0; i < probabilities.length; i++){
        if (i == expected){
            probabilityCorrect = probabilities[i]
        }
    }

    const loss = -1*(Math.log(probabilityCorrect));
    return loss;
}

function calculateAverageLoss(probabilities, expected){

    let losses = 0;

    for (let i = 0; i < probabilities.length; i++){

        const loss = crossEntropyLoss(probabilities[i], expected[i]);
        losses += loss;

    }

    return losses/probabilities.length;

}

function calculateAverage(input) {
    
    const sum = input.reduce((accumulator, current) => accumulator + current, 0);
    const ave = sum/input.length;

    return ave;

}
