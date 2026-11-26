function Duplicate(nums) {

    let l = 0;
    let r = l + 1;
    let duplicate = [];

    while (r < nums.length) {

        if (nums[l] === nums[r]) {

            duplicate.push(nums[r]);
        }

        r++;

        if (r === nums.length || nums[l] === nums[l - 1]) {
            l++;
            r = l + 1;
        }

        if (nums[l] === nums[l - 1]) {
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
// console.log(TwoSum([2, 7, 11, 15], 9));
// console.log(TwoSum([3, 2, 4], 6));
// console.log(TwoSum([3, 3], 6));

function subArr(nums) {
    let sum = 0;
    let max = nums[0];
    let l = 0;
    let r = 1;

    for (let i = 0; i < nums.length; i++) {
        sum = nums[i];

        if (sum > max) {
            max = sum
        }

        for (let j = i + 1; j < nums.length; j++) {

            sum += nums[j];

            if (sum > max) {
                max = sum;
                l = i;
                r = j + 1;
            }
        }
    }
    console.log(nums.slice(l, r));
    return max;
}
// console.log(subArr([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
// console.log(subArr([-1]));
// console.log(subArr([1]));
// console.log(subArr([5, 4, -1, 7, 8]));

function subArrPointer(nums) {
    let sum = nums[0];
    let max = nums[0];
    let maxArr = [];

    let l = 0;
    let r = l + 1;

    while (r < nums.length) {

        if (sum > max) {
            max = sum
        }

        sum += nums[r];
        if (sum > max) {
            max = sum;
            maxArr = nums.slice(l, r + 1);
        }
        if (r === nums.length - 1) {
            l++;
            r = l + 1;
            sum = nums[l];
        } else {
            r++;
        }
    }
    // console.log(maxArr)
    return max;
}
// console.log(subArrPointer([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
// console.log(subArr([-1]));
// console.log(subArr([1]));
// console.log(subArr([5, 4, -1, 7, 8]));
// console.log(subArr([-2, 1]));

function subArrKadane(nums) {
    let current = nums[0];
    let max = nums[0];

    let l = 0;
    let r = 0;

    for (let i = 1; i < nums.length; i++) {

        if (nums[i] > current + nums[i]) {
            current = nums[i];
            l = i;
        } else {
            current += nums[i];
        }

        if (current > max) {
            max = current
            r = i;
        }
    }
    console.log(nums.slice(l, r + 1));
    return max;
}
// console.log(subArrKadane([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
// console.log(subArrKadane([-1]));
// console.log(subArrKadane([1]));
// console.log(subArrKadane([5, 4, -1, 7, 8]));
// console.log(subArrKadane([-2, 1]));

function LongestSubstring(s) {
    let left = 0;
    let maxLength = 0;
    let set = new Set();

    for (let right = 0; right < s.length; right++) {

        while (set.has(s[right])) {
            set.delete(s[left]);
            left++;
        }

        set.add(s[right]);

        let windoLength = right - left + 1;

        maxLength = Math.max(maxLength, windoLength);
    }

    return maxLength;
}
// console.log(LongestSubstring("abcabcbb"));

function MinSizeSubSum(target, nums) {
    let left = 0;
    let sum = 0;
    let minLength = Infinity;

    for (let right = 0; right < nums.length; right++) {

        sum += nums[right];

        while (sum >= target) {
            let windoLength = right - left + 1;

            minLength = Math.min(minLength, windoLength);

            sum -= nums[left];
            left++;
        }
    }
    return minLength === Infinity ? 0 : minLength;
}
// console.log(MinSizeSubSum(7, [2, 3, 1, 2, 4, 3]))
// console.log(MinSizeSubSum(11, [1, 1, 1, 1, 1, 1, 1, 1]))

function SubStriVowel(s, k) {

    let left = 0;
    let count = 0;

    for (let i = 0; i < k; i++) {
        if ("a,e,i,o,u".includes(s[i])) {
            count++;
        }
    }

    let maxCount = count;

    for (let i = k; i < s.length; i++) {

        if ("a,e,i,o,u".includes(s[left])) {
            count--;
        }

        left++;

        if ("a,e,i,o,u".includes(s[i])) {
            count++;
        }

        maxCount = Math.max(count, maxCount);
    }
    return maxCount;
}
console.log(SubStriVowel("abciiidef", 3))
console.log(SubStriVowel("a", 1))