const expect = require('chai').expect
const insert = require('./index')

describe('insert',()=>{
  
  it('takes in an item, a list, and a sorting function and returns an array',()=>{
    const item = 1,
          list = [],
          sort = (a,b) => a < b
    expect(insert(item,list,sort)).to.deep.equal([1])
  })
  
  it('has a fallback empty list and a sort function',()=>{
    const item = 1
    expect(insert(item)).to.deep.equal([1])
    expect(insert(item,[0])).to.deep.equal([0,1])
  })
  
  it('inserts an item into the list in the sorted position caused by the given function',()=>{
    const list = [0,1,2,4,5],
          item = 3,
          fn = (a,b) => a < b
    expect(insert(item,list,fn)).to.deep.equal([0,1,2,3,4,5])
    
    const objList = [
      {
        name: 'Kristen'
      },
      {
        name: 'Ryan'
      },
      {
        name: 'Tim'
      },
    ],
        newItem = {
          name: 'Chris'
        },
        newFn = (a,b) => a.name < b.name
    expect(insert(newItem,objList,newFn)).to.deep.equal([
      {
        name: 'Chris'
      },
      {
        name: 'Kristen'
      },
      {
        name: 'Ryan'
      },
      {
        name: 'Tim'
      }
    ])
  })
  
  it('can handle the same item as another correctly',()=> {
    const list = [1,2,3,4,5],
          item = 4
    expect(insert(item,list)).to.deep.equal([
      1,
      2,
      3,
      4,
      4,
      5
    ])
  })
  
  it('does not affects the passed in array',()=>{
    const list = [],
          item = 1
    const newList = insert(item,list)
    expect(list.length).to.equal(0)
    expect(newList.length).to.equal(1)
    const newItem = 2,
          newNewList = insert(newItem,newList)
    expect(newList.length).to.equal(1)
    expect(newNewList.length).to.equal(2)
  })
  
})