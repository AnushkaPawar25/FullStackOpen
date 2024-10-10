///////////variables
// const x = 1

// let y = 5

// console.log(x, y)
// y += 1
// console.log(x,y)
// y = "sometext"

// console.log(x, y)


////////////arrays

// const t = [1, -1, 3]

// t.push(5)
// const t2 = t.concat(7)
// // const was able to be modify , const ensures immutability of reference itself, not the data it points to
// console.log(t.length)
// console.log(t[1])
// console.log(t2)

// t.forEach(value => {
//     console.log(value)
// })

// const arr = [1, 2, 3]

// const m1 = arr.map(value => value * 2)

// console.log(m1)

// const m2 = arr.map(value => '<li>' + value + "</li>")
// console.log(m2)

// const arr = [1, 2, 3, 4, 5]

// const [first, second, ...rest] = arr

// console.log(first, second)
// console.log(rest)


////////Objects

// const obj1 = {
//     name : 'Anushka',
//     age : 21,
//     edu : "Btech",
// }

// const obj3 = {
//     name : {
//         first : 'ABC', 
//         last : 'Murderer',
//     },
//     grades : [7.83, 57],
//     dept : "Uni"
// }

// console.log(obj1.name)
// const fieldName = "age"
// console.log(obj1[fieldName])

// obj1.address = "helsinki"
// obj1['screteno'] = 123424

// console.log(obj1.address, obj1.screteno)


// /////////////Functions

// const sum = (p1, p2) =>{
//     console.log(p1)
//     console.log(p2)
//     return p1 + p2
// }

// const result = sum(1, 2)
// console.log(result)


// const square = p => {
//     console.log(p)
//     return p * p
// }

// const result2 = square(3)
// console.log(result2)


// const sqr = p => p * p

// const t = [1, 2, 4]
// const tSquare = t.map(p => p * p)


///////// Object methods and this

const arto = {
    name : "Arto Hellas", 
    age : 35,
    education : 'Phd', 
    greet: function(){
        console.log('hello, my name is' + this.name)
    },

    doAddition: function(a, b){
        console.log(a + b)
    },
}


arto.doAddition(1, 38)
const summation = arto.doAddition
summation(10, 10)

arto.growOlder = function() {
    this.age += 1
}
console.log(arto.age)
arto.growOlder()
console.log(arto.age)
arto.greet()

// will give error as this.name = undefine
// when calling the method through ref the method lose knowledge of original this

const refToGreet = arto.greet
refToGreet()