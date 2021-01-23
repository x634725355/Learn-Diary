<template>
  <el-date-picker v-model="stampValue" value-format="timestamp" :picker-options="limitedPickerOptions || pickerOptions" v-bind="attrs" @change="change"></el-date-picker>
</template>

<script>
import * as format from '@/filters'
export default {
  name: 'timestampDatePicker',
  props: {
    value: [String, Number, Array],
    name: {
      type: String,
      default: ''
    },
    // 起始限制时间值来源组件的关键字
    minKey: String,
    // 结束限制时间值来源组件的关键字
    maxKey: String,
    pickerOptions: {
      type: Object,
      default: () => ({})
    },
    // 页面内通信总线
    bus: Object,
    // 标识是否作为级联组件使用
    isCombined: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 禁用起始值
      min: '',
      // 禁用结束值
      max: ''
    }
  },
  computed: {
    // 绑定值，转换格式并同步（同步时无需转换格式）
    stampValue: {
      get () {
        if (this.value instanceof Array) {
          return this.value.map(item => format.formatDateToStamp(item))
        } else if (this.value === null) {
          // 被清空值时原组件返回null，此时返回非null值可能会被转为数值0
          return this.value
        } else {
          return format.formatDateToStamp(this.value)
        }
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    // 限制可自定义的属性值
    attrs () {
      const { valueFormat, name, minKey, maxKey, bus, isCombined, pickerOptions, ...rest } = this.$attrs
      return rest
    },
    // 限制可选范围
    limitedPickerOptions () {
      if (this.isCombined) {
        return Object.assign({}, this.pickerOptions, {
          disabledDate: val => {
            return (this.min && val < this.min) || (this.max && val > this.max)
          }
        })
      }
      return this.pickerOptions
    }
  },
  mounted () {
    // 监听通信方法
    this.isCombined && this.bus && this.bus.$on('pickerChanged', this.pickerChanged.bind(this))
    // 加载后触发通信，初始化所有此组件的限制条件
    this.$nextTick(() => {
      this.change(this.stampValue)
    })
  },
  methods: {
    change (val) {
      // 先触发组件间通信方法，再向上传递
      this.isCombined && this.bus && this.bus.$emit('pickerChanged', val, this.name)
      this.$emit('change', val, this.name)
    },
    pickerChanged (val, key) {
      // 防止非限制级联组件和空name的组件被匹配到
      if (!this.isCombined || !key) return
      if (this.maxKey === key) {
        this.max = val
      }
      if (this.minKey === key) {
        this.min = val
      }
    }
  }
}
</script>
