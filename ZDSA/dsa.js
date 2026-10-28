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

    console.log("Duplicate:", duplicate);
    console.log("Store:", store);

}
FoundDuplicate([1, 2, 3, 2, 4, 1])