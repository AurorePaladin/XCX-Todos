Page({
  data: {
    // 文本框的数据模型
    search: '',
    // 任务清单数据模型
    todos: [
      { name: 'Learning WEAPP', completed: false },
      { name: 'Learning HTML', completed: true },
      { name: 'Learning CSS', completed: false },
    ]
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
  },

  toggleTodoHandle: function (e) {
    // 切换当前点中的item的完成状态
    var item = this.data.todos[e.currentTarget.dataset.index]
    item.completed = !item.completed
    this.setData({ todos: this.data.todos })
  }
})