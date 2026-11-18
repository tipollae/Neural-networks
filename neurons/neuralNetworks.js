const inputs = [[1, 2, 3],[3,4,1],[5,6,1]];

const weights1 = [
    [0.2, 0.4, 0.1, 0.5],
    [0.5, 0.1, 0.3, 0.2],
    [0.3, 0.7, 0.6, 0.4]
];

const biases1 = [[0.1, 0.2, 0.1, 0.3]];

const weights2 = [
    [0.3, 0.5],
    [0.2, 0.1],
    [0.7, 0.4],
    [0.6, 0.8]
];

const biases2 = [[0.2, 0.3]];

const layer1 = denseLayer(inputs, weights1, biases1);

const activation1 = ReLU(layer1);

const layer2 = denseLayer(activation1, weights2, biases2);

console.log(layer1)
console.log(layer2)

function denseLayer(inputs, weights, biases){

    const dotProduct = multiplyMatrices(inputs, weights);
    applyBiases(biases, dotProduct);

    return dotProduct;

}

function multiplyMatrices(A, B) {

    try{
        const innerDimensionA = A[0].length;
        const innerDimensionB = B.length;

        if (innerDimensionA !== innerDimensionB){
            throw new Error(`Inner dimensions are not equal. A(${innerDimensionA}) !== B(${innerDimensionB})`)
        }

    }

    catch(error){
        throw new Error(error.message);
    }

    const res = [];

    for (let i = 0; i < A.length; i++){

        const rowA = A[i];
        res.push([]);

        for (let j = 0; j < B[0].length; j++){

            let dotProduct = 0;

            for (let k = 0; k < B.length; k++){

                let calc = B[k][j] * rowA[k];
                dotProduct += calc;

            }

            res[i].push(dotProduct);

        }

    }

    return res;

}

function addMatrices(A, B){

    try{
        const dimensionsAY = A.length;
        const dimensionsAX = A[0].length
        const dimensionsBY = B.length;
        const dimensionsBX = B[0].length;

        const validInput = !(dimensionsAX == dimensionsBX && dimensionsAY == dimensionsBY);

        if (validInput){
            throw new Error(`Dimensions are not equal. A(${dimensionsAY}, ${dimensionsAX}) !== B(${dimensionsBY}, ${dimensionsBX})`)
        }

    }

    catch(error){
        throw new Error(error.message);
    }

    const res = [];



    for (let i = 0; i < A.length; i++){

        const row = [];

        for (let j = 0; j < A[i].length; j++){
            let sum = A[i][j] + B[i][j];
            row.push(sum);
        }

        res.push(row);
    }

    return res;

}

function applyBiases(biases, output){

    try{
        const dimensionsBIASX = biases[0].length;
        const dimensionsOUTPUTX = output[0].length;

        const validInput = !(dimensionsBIASX == dimensionsOUTPUTX);

        if (validInput){
            throw new Error(`X-axis dimensions are not equal BIAS(${dimensionsBIASX}) !== OUTPUT(${dimensionsOUTPUTX})`)
        }

    }

    catch(error){
        throw new Error(error.message);
    }

    for (let i = 0; i < output.length; i++){

        for (let j = 0; j < biases[0].length; j++){
            output[i][j] += biases[0][j];
        }

    }

    return output;

}

function ReLU(matrix){
    const matrixCopy = matrix.map(row => [...row]);
    for (let i = 0; i < matrixCopy.length; i++){
        for (let j = 0; j < matrixCopy[i].length; j++){
            matrixCopy[i][j] = Math.max(0, matrixCopy[i][j])
        }
    }
    return matrixCopy;
}
