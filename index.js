/**
 * Inserts an item into a sorted list of item
 * 
 * @param {number} item - The item to insert
 * @param {array} list - The list to insert into
 * @param {function} fn - The function that sorts the items
 * @return {array} sorted - The sorted list
 */
const insert = (item,list = [], fn = (a,b) => a < b) => {
  // If we have an empty list, we can just
  // return the item inside of an array and
  // it will be sorted
  if(!list.length){
    return [item]
  }
  
  // If it only has one item, we just need
  // to run our fn on that item
  if(list.length === 1){
    return fn(item,list[0]) ? [item,list[0]] : [list[0],item]
  }
  
  // Here we start our algorithm
  // We get the min and max index
  let min = 0,
      max =  list.length - 1
  while(true){
    // Once our min and max have changed
    // swapped ( max is less than min)
    // we know that we have found
    // the correct index
    if(max < min){
      return [
        ...list.slice(0,min),
        item,
        ...list.slice(min)
      ]
    }
    
    // We grab the middle of the min and max
    // and we floor it so we have a whole number
    const currIndex = Math.floor((min + max) / 2),
          // we grab the item at that index to
          // compare against
          currItem = list[currIndex],
          // Then we get a truthy/falsey value
          // to tell us if it is higher or lower
          // in the list
          // 
          // truthy === lower index
          // falsey === higher index
          sort = fn(item,currItem)
          
    /**
     * If our sort function returned truthy,
     * this item is smaller than the other
     */
    if(sort){
      max = currIndex - 1
      continue
    }
    /**
     * If our sort function returned falsey,
     * this item is larger than the other
     */
    if(!sort){
      min = currIndex + 1
      continue
    }
  }
  
  /**
   * Somehow we messed up...
   */
  throw new Error('insert failed somehow!')
}

const fromSorted = (fn = false, list = []) => {
  // Bail early if we do not have a function
  if(!fn){
    throw new Error('You have not given me a function to know if I should grab an item or not!')
  }
  // Bail early if the list is empty
  if(!list.length){
    return list
  }
  let min = 0,
      max = list.length - 1,
      items = [],
      count = 0
    const index = Math.floor((max + min) / 2),
          item = list[index]
    if(fn(item)){
      items.push(item)
      let upIndex = index + 1,
          maybeUp = list.length > upIndex ? list[upIndex] : false
      while(fn(maybeUp)){
        items.push(maybeUp)
        if(items.length === list.length){
          return items
        }
        upIndex++
        maybeUp = list.length > upIndex ? list[upIndex] : false
      }
      let downIndex = index - 1,
          maybeDown = downIndex >= 0 ? list[downIndex] : false
      while(fn(maybeDown)){
        items.unshift(maybeDown)
        if(items.length === list.length){
          return items
        }
        downIndex--
        maybeDown = downIndex >= 0 ? list[downIndex] : false
      }
    }
  
  return items
  
}

module.exports = {
  insert: insert,
  fromSorted: fromSorted
}



