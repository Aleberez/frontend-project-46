import _ from 'lodash'

const buildAST = (data1, data2) => {
  const data1Keys = Object.keys(data1)
  const data2Keys = Object.keys(data2)
  const allKeys = [...new Set([...data1Keys, ...data2Keys])]
  const sortedKeys = _.sortBy([...allKeys])

  const children = sortedKeys.map((key) => {
    const hasKeyInData1 = data1Keys.includes(key)
    const hasKeyInData2 = data2Keys.includes(key)

    if (!hasKeyInData1) {
      return {
        type: 'added',
        key,
        value: data2[key],
      }
    }
    if (!hasKeyInData2) {
      return {
        type: 'removed',
        key,
        value: data1[key],
      }
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        type: 'nested',
        key,
        children: buildAST(data1[key], data2[key]),
      }
    }
    if (data1[key] === data2[key]) {
      return {
        type: 'unchanged',
        key,
        value: data1[key],
      }
    }
    return {
      type: 'changed',
      key,
      oldValue: data1[key],
      newValue: data2[key],
    }
  })
  return children
}

const getTree = (data1, data2) => ({
  type: 'root',
  children: buildAST(data1, data2),
})

export default getTree
