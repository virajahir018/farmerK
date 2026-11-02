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

    let largest = 0;
    let secound = 0;

    for (const num of arr) {

        if (num > largest) {
            secound = largest;
            largest = num;
        } else if (num < largest && num > secound) {
            secound = num
        }
    }

    // console.log(arr)
    // console.log("Highrest : ", largest)
    // console.log("Secouns highest : ", secound)

}
SecoundLargest([23, 5, 21, 8, 20])

function Practice(arr, arr1, str) {
    // const s = arr.reduce((t, c) => {
    //     return t += c;
    // }, 0)

    // arr.reverse()

    // console.log(arr.join(" "))

    // console.log(arr.concat(arr1));

    // console.log(arr.flat())

    // let r = str.at(-1)
    // console.log(str.indexOf(r))

    // console.log(str.split("").reverse().join(""));


    let obj = {};

    let num = 80

    for (const i of arr1) {
        obj[i] = (obj[i] || 0) + 1
    }
    obj.num = 80
    // console.log(obj)

}
Practice([10, 20, 30, [40, 50]], [60, 70, 70, 80, 80, 80], ("hello"))

function Even(arr) {
    const r = arr.filter((num) => num % 2 === 0)
    // console.log(r)
}
Even([1, 2, 3, 4, 5, 6])

function Sum(arr) {
    const r = arr.reduce((s, c) => s += c, 0)
    // console.log(r)
}
Sum([10, 20, 30, 40])

function Slargest(arr) {

    let largest = 0;
    let secound = 0;

    for (const num of arr) {

        if (num > largest) {

            secound = largest
            largest = num;
        } else if (num < largest && num > secound) {
            secound = num
        }
    }

    // return console.log(secound)
}
Slargest([23, 5, 8, 23, 23])


function Palindrome(str) {

    const r = str.split("").reverse().join("");

    if (str === r) {
        // console.log(str, "Is palindrome")
    } else {
        // console.log(str, "Is not palindrome")
    }
}
Palindrome("madam")


function Palindrome2(str) {
    let left = 0;
    let right = str.length - 1;
    let match = true;

    while (left < right) {

        if (str[left] !== str[right]) {
            match = false;
            break;
        }

        left++;
        right--;
    }

    if (match) {
        // console.log(str, "is palindrome")
    } else {
        // console.log(str, "is not palindrome")
    }
}
Palindrome2("madamm")


function FoundC(str) {

    let obj = {};

    for (const s of str) {
        obj[s] = (obj[s] || 0) + 1;
    }

    // console.log(obj)
}
FoundC("hello");


function RemoveDuplicate(arr) {

    let n = [];

    for (const num of arr) {
        if (!n.includes(num)) {
            n.push(num);
        }
    }

    // console.log(n)

}
RemoveDuplicate([1, 2, 2, 3, 3]);


function RemoveDuplicate2(arr) {

    const n = [...new Set(arr)];

    // console.log(n)

}
RemoveDuplicate2([1, 2, 2, 3, 3]);


function Anagram(str, check) {

    if (str.length !== check.length) {
        // return console.log(check, "Is not anagram");
    }

    let obj = {};

    for (const char of str) {

        obj[char] = (obj[char] || 0) + 1
    }

    let match = true;

    for (const s of check) {

        if (!obj[s]) {
            match = false;
            break;
        }

        obj[s]--;
    }

    if (match) {
        // console.log(check, "is anagram")
    } else {
        // console.log(check, "is not anagram")
    }

}
Anagram("listen", "silentt");


function Missing(arr) {

    let n = arr.length + 1;

    let nSum = n * (n + 1) / 2;

    let arrSum = arr.reduce((sum, num) => sum + num, 0)

    let result = nSum - arrSum;

    console.log(result)
}
Missing([1, 2, 3, 5]);