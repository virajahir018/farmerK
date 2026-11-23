function Duplicate(arr) {

    let l = 0;
    let r = l + 1;
    let duplicate = [];

    while (r < arr.length) {

        if (arr[l] === arr[r]) {

            duplicate.push(arr[r]);
        }

        r++;

        if (r === arr.length || arr[l] === arr[l - 1]) {
            l++;
            r = l + 1;
        }

        if (arr[l] === arr[l - 1]) {
            l++;
            r = l + 1;
        }
    }

    // console.log(duplicate)

}
Duplicate([1, 1, 1, 2, 3, 4, 4, 2]);

function TwoSum(nums, target) {

    let store = new Map();

    for (let i = 0; i < nums.length; i++) {
        let element = target - nums[i];

        if (store.has(element)) {
            return [store.get(element), i];
        }

        store.set(nums[i], i);

    }

    return [];
}
console.log(TwoSum([2, 7, 11, 15], 9));
console.log(TwoSum([3, 2, 4], 6));
console.log(TwoSum([3, 3], 6));

