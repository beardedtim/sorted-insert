/**
 * Inserts a number into a sorted list of numbers
 * 
 * Does not enter 
 * 
 * @param {number} item - The item to insert
 * @param {array} list - The list to insert into
 * @param {function} fn - The function that sorts the items
 * @return {array} sorted - The sorted list
 */
const insert = (item,list = [], fn = (a,b) => a < b) => {
  
  if(!list.length){
    return [item]
  }
  
  if(list.length === 1){
    return item < list[0] ? [item,list[0]] : [list[0],item]
  }
  
  let min = 0,
      max =  list.length - 1,
      count = 0
  while(count < 100){
    count++
    if(max < min){
      return [
        ...list.slice(0,min),
        item,
        ...list.slice(min)
      ]
    }
    const currIndex = Math.floor((min + max) / 2),
          currItem = list[currIndex],
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

module.exports = insert



