import Toast from './Toast.vue'

const toast = {}

toast.install = (Vue) => {
  //1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  //2.new的方式，根据组件构造器，创建组件对象
  const toast = new toastConstructor()
  //3.手动挂载组件对象，到相应的元素上
  toast.$mount(document.createElement('div'))
  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default toast
