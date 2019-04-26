Page({
  data: {
    // 文本框的数据模型
    search: '',
    // 任务清单数据模型
    todos: [
      { name: 'Learning WEAPP', completed: false },
      { name: 'Learning HTML', completed: true },
      { name: 'Learning CSS', completed: false },
    ],
    leftCount: 2,
    allCompleted: false
  },
  // 拿到文本框里面的值
  // 由于小程序的数据绑定是单向的 必须要给文本注册改变事件
  inputChangeHandle: function (e) {
    this.setData({ search: e.detail.value })
  },

  // 先让按钮点击时执行一段代码
  addTodoHandle: function (e) {
    // 当添加按钮点击事件发生时执行的函数
    if (!this.data.search) return
    var todos = this.data.todos
    todos.push({
      name: this.data.search,
      completed: false
    })
    // 将这个值添加到列表中
    // 必须显式的通过setData去改变数据，这样界面上才会得到变化
    this.setData({ todos: todos, search: '' })

    this.setData({
      todos: todos,
      search: '',
      leftCount: this.data.leftCount + 1
    })
  },

  toggleTodoHandle: function (e) {
    // 切换当前点中的item的完成状态
    var item = this.data.todos[e.currentTarget.dataset.index]
    item.completed = !item.completed
    // 根据当前任务的完成状态增加/减少一个
    var leftCount = this.data.leftCount + (item.completed ? -1 : 1)
    this.setData({ todos: this.data.todos, leftCount: leftCount })
  },

  removeTodoHandle: function (e) {
    var todos = this.data.todos
    // item 就是splice方法中移除掉的元素
    var item = todos.splice(e.currentTarget.dataset.index, 1)[0]
    var leftCount = this.data.leftCount - (item.completed ? 0 : 1)
    // todos 中会移除掉 index 所指向的元素
    this.setData({ todos: todos, leftCount: leftCount })
  },

  toggleAllHandle: function () {
    // this 在这里永远指向的是当前页面对面
    this.data.allCompleted = !this.data.allCompleted
    var todos = this.data.todos
    var _this = this
    todos.forEach(function (item) {
      item.completed = _this.data.allCompleted
    })
    var leftCount = this.data.allCompleted ? 0 : this.data.todos.length
    this.setData({ todos: todos, leftCount: leftCount })
  },

  removeAllHandle () {
    // 第一种
    // var todos = []
    // this.data.todos.forEach(function (item) {
    //   if (!item.completed) {
    //     todos.push(item)
    //   }
    // })
    // this.setData({ todos: todos})

    // 第二种
    var todos = this.data.todos.filter(function (item) {
      return !item.completed
    })
    this.setData({ todos:todos })
  }
})