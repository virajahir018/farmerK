function FoundDuplicate(arr) {

    let duplicate = [];
    let store = [arr[0]];

    for (let i = 1; i < arr.length; i++) {

        let found = false;

        for (let j = 0; j < store.length; j++) {
            if (arr[i] === store[j]) {
                found = true;
                break;
            }
        }

        if (found) {
            duplicate.push(arr[i]);
        } else {
            store.push(arr[i])
        }
    }

    // console.log("Duplicate:", duplicate);
    // console.log("Store:", store);

}
FoundDuplicate([1, 2, 3, 2, 4, 1])

function SecoundLargest(arr) {

    let highest = arr[0];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > highest) {
            highest = arr[i]
        }
    }

    arr.splice(arr.indexOf(highest), 1);

    let secoundL = arr[0];

    for (const i of arr) {
        if (i > secoundL) {
            secoundL = i
        }
    }

    console.log(arr)
    console.log("Highrest : ", highest)
    console.log("Secouns highest : ", secoundL)

    arr.sort((a, b) => a - b);

    console.log(arr[1]);

}
SecoundLargest([23, 5, 21, 8, 20])