let arr = [10, 20, 30, 40];

let sum = arr.reduce((sum, num) => sum += num, 0)

console.log(sum);


let arr2 = [12, 45, 7, 89, 23];

let lNum = Math.max(...arr2);

// for (let i = 0; i < arr2.length; i++) {

//     if (lNum < arr2[i]) {
//         lNum = arr2[i];
//     }
// }

console.log(lNum)


let arr3 = [1, 2, 3, 4, 5, 6, 7];

let even = arr3.filter((e) => e % 2 == 0);

// for (let i = 0; i < arr3.length; i++) {

//     if (arr3[i] % 2 == 0) {
//         even.push(arr3[i]);
//     }
// }

console.log(even)

let str = "hello";

let rStr = "";

for (let i = str.length - 1; i >= 0; i--) {

    rStr += str[i]
}

console.log(rStr)


let n = 100;


for (let i = 2; i < n; i++) {

    let flag = true;

    for (let j = 2; j < i; j++) {

        if (i % j == 0) {
            flag = false;
            break;
        }
    }


    if (flag) {
        console.log(i, "is prime number")
    } else {
        console.log(i, ("is not prime number"))
    }
}