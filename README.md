#Sorted Insert

> Because going through the list is so 2001

This package is a simple function along with the tests. It uses list deconstruction and runs inside of `node v7.4.0`. I am unsure of how it will work in versions lower than that or in the browser. 

##Argument Order

This has the argument order of `(item,list,sortingFunction)` which may not be helpful for currying. However I think it works best for my use cases. If you use this function and find that another order is better suited for your use-case, feel free to make a PR/open an Issue and let's discuss it!

##Usage

```
$ yarn add bearded-sorted-insert
```

And then in the project you want it

```
const insert = require('bearded-sorted-insert'),
      list = [0,2],
      item = 1,
      withNewItem = insert(item,list) // [0,1,2]
```

Or if you want to pass in your own sorting function:

```
const friends = [
  {
    name: 'Chris'
  },
  {
    name: 'Kristen'
  },
  {
    name: 'Tim'
  }
],
      newFriend = {
        name: 'Ryan'
      },
      sortingFun = (a,b) => a.name < b.name

insert(newFriend,friends,sortingFun)
// [
//  {name: 'Chris'},
//  {name: 'Kristen'},
//  {name: 'Ryan'},
//  {name: 'Tim'}
// ]

```

##Tests

```
$ yarn run test
```