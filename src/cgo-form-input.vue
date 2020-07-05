<template>
  <div class="form-group" :class="{'input-group':hasPrependSlot || hasAppendSlot,'input-prepend':hasPrependSlot}">
    <label :for="id" class="no-floating-label" v-if="title">{{title}}</label>
    <slot name="prepend"></slot>
    <input
           :id="id"
           :type="type"
           :autocomplete="autocomplete"
           :disabled="readonly"
           :readonly="readonly"
           :tabindex="tabindex"
           :placeholder="placeHolder || title || id"
           :value="content"
           @input="handleInput($event.target.value)"
           :class="inputClass"
           :maxlength="length"
           :step="step"
    />
    <slot name="append"></slot>
    <label :for="id" class="floating-label" v-if="title">{{title}}</label>
  </div>
</template>

<script>
  export default {
    name: "cgo-form-input",
    props: {
      id: {
        type: String,
        required: true
      },
      autocomplete:{
        type: String
      },
      name: {
        type: String
      },
      type: {
        type: String,
        default: 'text'
      },
      readonly: {
        type: Boolean,
        default: false
      },
      required: {
        type: Boolean,
        default: false
      },
      length: {
        type: Boolean,
        default: false
      },
      tabindex: {
        type: [Number,String]
      },
      value: {
        type: [String,Number]
      },
      placeHolder: {
        type: String,
      },
      title: {
        type: String
      },
      inputClass: {
        type: String
      }
    },
    data: function() {
      return {
        content: undefined,
        isHidden: false,
        configMode: false,
        customTitle:undefined
      }
    },
    mounted: function() {
      this.original = this.value || '';
      this.content = this.original;
    },
    methods: {
      handleInput (value) {
        let val = value;
        const t = this.type;
        if(t==='number'){
          val = parseInt(value);
        }
        this.$emit('input', val);
      }
    },
    computed: {
      hasPrependSlot () {
        return !!this.$slots['prepend']
      },
      hasAppendSlot () {
        return (!!this.$slots['append']);
      },
      step() {
        if(this.type==='number') return "any";
        return null;
      }
    }
  }
</script>

