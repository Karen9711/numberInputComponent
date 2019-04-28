function isValueNumber(val){
  return (/(^-?[0-9]+\.{1}\d+$) | (^-?[1-9][0-9]*$) | (^-?0{1}$)/).test(val+'');
}

Vue.component('input-number',{
  template:`
  <div>
    <input type="text" :value="currentValue" @change="handeleChange">
    <button :disabled=" currentValue <= min " @click="handleDown" class="btn btn-default">-</button>
    <button :disabled="currentValue >= max" @click="handleUp" class="btn btn-default">+</button>
  </div>
  `,
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
      this.$emit('input',val);
      this.$emit("on-change",val);
    },
    value:function(val){
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
      var val = event.target.value.trim();
      var max = this.max;
      var min = this.min;
      if(isValueNumber(val)){
        val = Number(val);
        this.currentValue = val;
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
      if(val >= this.max) val = this.max;
      if(val <= this.min) val = this.min;
      this.currentValue = val;
    },
  },
  mounted:function(){
    this.updateValue(this.value);
  },
});
var app = new Vue({
  el:'#app',
  data:{
    value:3,
  },
});
