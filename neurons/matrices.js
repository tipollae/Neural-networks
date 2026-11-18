const A = [
    [1, 2]
];

const B = [
    [1, 2, 3, 4],
    [5, 6, 7, 8]
];

console.log(multiplyMatrices(A, B))

function multiplyMatrices(A, B) {

    try{
        const innerDimensionA = A[0].length;
        const innerDimensionB = B.length;

        if (innerDimensionA !== innerDimensionB){
            throw new Error("Inner dimensions aren't equal.")
        }

    }

    catch(error){
        console.error("An error occured: " + error.message);
    }

    const res = [];

    for (let i = 0; i < A.length; i++){

        const rowA = A[i];
        res.push([]);

        for (let j = 0; j < B[0].length; j++){

            let dotProduct = 0;

            for (let k = 0; k < B.length; k++){

                let calc = B[k][j] * rowA[k];
                console.log(B[k][j], rowA[k])
                dotProduct += calc;

            }

            res[i].push(dotProduct);

        }

    }

    return res;

}