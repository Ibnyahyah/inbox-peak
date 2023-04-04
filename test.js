// function percentageCalculator(value) {
//     const per = [0.01, 0.02, 0.05, 0.5, 0.6];
//     const randomNumber = Math.floor(Math.random() * per.length);
//     console.log({ "rnd": per[randomNumber] })
//     const calculatedValue = (per[randomNumber] * value / 100);
//     console.log({ calculatedValue });
//     return calculatedValue;
// }

// percentageCalculator(140000000);

function productOfIntegers(arr) {
    const n = arr.length;
    const prefixProduct = new Array(n).fill(1);
    const suffixProduct = new Array(n).fill(1);
    const result = new Array(n).fill(1);

    for (let i = 1; i < n; i++) {
        prefixProduct[i] = prefixProduct[i - 1] * arr[i - 1];
    }

    for (let i = n - 2; i >= 0; i--) {
        suffixProduct[i] = suffixProduct[i + 1] * arr[i + 1];
    }

    for (let i = 0; i < n; i++) {
        result[i] = prefixProduct[i] * suffixProduct[i];
    }

    return result;
}

const arr = [0, 1, 3, 5, 10];
console.log(productOfIntegers(arr));




function productOfIntegers(arr) {
    const n = arr.length;
    let zeroCount = 0;
    let product = 1;

    for (let i = 0; i < n; i++) {
        if (arr[i] === 0) {
            zeroCount++;
            if (zeroCount > 1) {
                break;
            }
        } else {
            product *= arr[i];
        }
    }

    const result = new Array(n).fill(0);
    if (zeroCount === 0) {
        for (let i = 0; i < n; i++) {
            result[i] = product / arr[i];
        }
    }

    return result;
}
console.log(productOfIntegers([0, 1, 3, 5, 10]))
