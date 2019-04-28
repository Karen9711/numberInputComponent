function isValueNumber(val){
  return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(val+'');
}

Vue.component('input-number',{
  template:`
  <div>
    <input type="text" :value="currentValue" @change="handeleChange">
    <button :disabled=" currentValue <= min " @click="handleDown" class="btn btn-default">-</button>
    <button :disabled="currentValue >= max" @click="handleUp" class="btn btn-default">+</button>
  </div>
  `,//这里的change是原生事件，当输入框change时调用handleChange
  props:{
    min:{
      type:Number,
      default:Infinity,
    },
    max:{
      type:Number,
      default:-Infinity,
    },
    value:{
      type:Number,
      default:0,
    }
  },
  data:function(){
    return {
      currentValue:this.value,
    }
  },
  watch:{
    currentValue:function(val){
      console.log("watcher currentValue:",this.currentValue);
      this.$emit('input',val);//是在使用v-model时改变value
      this.$emit("on-change",val);//不明白这里的事件上报给哪里
    },
    value:function(val){
      console.log("watcher value:",this.value);//这里的value和currenValue的变化是同步的（可能是因为指向同一块内存）
      this.updateValue(val);
    }
  },
  methods:{
    handleUp:function(){
      var val = this.currentValue;
      if(val >= this.max){
        return this.max;
      }
      this.currentValue+=1;
    },
    handleDown:function(){
      var val = this.currentValue;
      if(val <= this.min){
        return this.min;
      }
      this.currentValue-=1;
    },
    handeleChange:function(event){
      console.log("handle Change");
      var val = event.target.value.trim();
      console.log(val);
      console.log("handlechange 中的 trim后的val:",val);
      var max = this.max;
      var min = this.min;
      console.log(isValueNumber(val));
      if(isValueNumber(val)){
        val = Number(val);
        this.currentValue = val;
        console.log("change后的currentValue：",this.currentValue);
        if(val>max){
          this.currentValue = max;
        }
        else if(val<min){
          this.currentValue = min;
        }
        else{
          event.target.value = this.currentValue;
        }
      }
    },
    updateValue:function(val){
      console.log("updateValue");
      if(val >= this.max) val = this.max;
      if(val <= this.min) val = this.min;
      this.currentValue = val;
    },
  },
  mounted:function(){
    console.log("mounted");
    this.updateValue(this.value);
  },//这一段没有也可以
});
var app = new Vue({
  el:'#app',
  data:{
    value:1,
  },
});
