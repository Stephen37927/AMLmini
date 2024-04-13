<template>
  <div class="home">
    <section class="hero is-small is-dark mb-5">
        <div class="hero-body has-text-centered ">
            <p class="title mb-5 ">
                Welcome to AMLmini
            </p>
            <p class="subtitle">
                Your assistant for generating AML datasets
            </p>
        </div>
    </section>

    <div class="columns">
      <div class="column is-flex is-aligned-to-the-left">
          <h1 class="title">Generators</h1>
      </div>
      <div class="column is-flex is-aligned-to-the-right">
          <button class="button is-primary" @click="toggleFormVisibility">
            <strong><i class="fas fa-plus"></i> Create</strong>
          </button>
      </div>
    </div>

    <!-- Main container -->

    <div class="columns is-multiline">
      <div class="is-info">
        <div class="columns genheaders">
          <div class="column is-one-fifth">Name</div>
          <div class="column is-one-fifth">Size</div>
          <div class="column is-one-fifth">Patterns</div>
          <div class="column is-one-fifth">Created at</div>
          <div class="column is-one-fifth">Actions</div>
        </div>
        <GeneratorItem 
          v-for="generator in generators"
          v-bind:key="generator.id"
          v-bind:generator="generator" />
      </div>
      
    </div>

    <transition name="model">
      <div v-if="isGenFormVisible" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Create Your Generator</p>
            <!-- <button @click="toggleFormVisibility" class="delete" aria-label="close"></button> -->
          </header>
          <section class="modal-card-body">
            
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input class="input" type="text" placeholder="Name" v-model="form.name">
              </div>
            </div>
            <div class="field">
              <label class="label">Size</label>
              <div class="control">
                <div class="select is-rounded is-medium">
                  <select v-model="form.size">
                    <option v-for="value in options" :key="value" :value="value">
                      {{ value }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Patterns</label>
              <div class="control">
                <label class="checkbox" v-for="patternOption in patternOptions" :key="patternOption" style="margin-right:10px;">
                  <input type="checkbox"
                    :disabled="isNoneSelected && patternOption !== 'none'"
                    v-model="form.selectedPatterns"
                    :value="patternOption">
                    {{ patternOption }}
                </label>
              </div>
            </div>
            
          </section>
          <footer class="modal-card-foot">
            <div class="buttons">
              <button class="button is-success" @click="saveForm">Save changes</button>
              <button @click="toggleFormVisibility" class="button">Cancel</button>
            </div>
          </footer>
        </div>
      </div>
    </transition>

    <!-- <el-dialog 
      v-model="isGenFormVisible" 
      title="Create Your Generator" 
      @close="toggleFormVisibility"
      :top="'15vh'" 
      :style="{width: '60%'}">

      <el-form ref="formRef" :rules="rules">

          <el-form-item label="Name" :label-width="formLabelWidth">
              <el-input v-model="form.name" placeholder="Create a name for your generator"></el-input>
          </el-form-item>

          <el-form-item label="Size" :label-width="formLabelWidth">
              <el-select v-model="form.size" placeholder="Please select a size of datasets to be generated">
                  <el-option v-for="value in options" :key="value" :label="value" :value="value"></el-option>
              </el-select>
          </el-form-item>

          <el-form-item label="Patterns" :label-width="formLabelWidth">
              <div v-for="patternOption in patternOptions" :key="patternOption">
                  <el-checkbox :label="patternOption"
                              v-model="form.selectedPatterns"
                              :disabled="isNoneSelected && patternOption !== 'none'">
                      {{ patternOption }}
                  </el-checkbox>
              </div>
          </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveForm">Save changes</el-button>
          <!- <el-button @click="toggleFormVisibility">Cancel</el-button> ->
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import GeneratorItem from '@/components/GeneratorItem.vue'
import { useFormLabelWidth } from 'element-plus/es/components/form/src/utils';


export default {
  name: 'Home',
  data() {
    return {
      generators: [],
      isGenFormVisible: false,
      options: [100, 500, 1000],
      patternOptions: ['none', 'fan-in', 'fan-out'],
      patterns: [],
      // formLabelWidth: '120px',
      form: { // 存储表单数据的对象
          name: '',
          size: '',
          selectedPatterns: [], // 将 selectedPatterns 作为 form 对象的属性
      },
      // rules: {
      //   name: [{ required: true, message: 'Please input a name', trigger: 'blur' }],
      //   size: [{ required: true, message: 'Please select a size', trigger: 'change' }],
      //   patterns: [{ required: true, message: 'Please select none or at least one', trigger: 'change' }]
      // }
    }
  },
  components: {
    GeneratorItem
  },
  methods: {
    toggleFormVisibility() {
      this.form = {name: '',size: '',selectedPatterns: []}
      this.isGenFormVisible = !this.isGenFormVisible;
      console.log('Form visibility:', this.isGenFormVisible)
    },
    getGenerators(){
      this.generators = [
        {
          id: 1,
          name: 'fan-in',
          size: '100',
          patterns: 'fan-in',
          created_at: '2024-04-09',
        },
        {
          id: 2,
          name: 'fan-out',
          size: '100',
          patterns: 'fan-out',
          created_at: '2024-04-09',
        }
        
      ]
    },
    saveForm() {
      // 获取当前日期
      const currentDate = new Date();
      // 将当前日期格式化为 yyyy-MM-dd 的格式
      const formattedDate = currentDate.toISOString().split('T')[0];

      // 将格式化后的日期添加到 form 对象的 created_at 属性
      this.form.created_at = formattedDate;

      console.log('Form saved')
      console.log('Form Data:', JSON.stringify(this.form, null, 2));

      this.toggleFormVisibility();
    }

    /* async getGenerators() {
       this.$store.commit('setIsLoading', true)
       await axios
         .get('/api/v1/generators/')
         .then(response => {
           this.generators = response.data
         })
         .catch(error => {
           console.log(error)
         })
       this.$store.commit('setIsLoading', false)
    }*/
  },
  mounted() {
    this.getGenerators()

    document.title = 'Home | AMLmini'
  },
  computed: {
    isNoneSelected() {
      return this.form.selectedPatterns.includes('none')
    }
  },
  watch: {
    isNoneSelected(newValue) {
      if (newValue) {
        // 如果 "none" 被选中，清空其他选中的选项
        this.selectedPatterns = ['none'];
      } else {
        // 如果 "none" 被取消选中，保留现有的选中选项
        this.selectedPatterns = this.selectedPatterns.filter(p => p !== 'none');
      }
    }
  },

}
</script>

<style scoped lang="scss">
.is-aligned-to-the-left,
.is-aligned-to-the-right {
  justify-content: center;
}

.genheaders{
  /* min-width: 20vw; */
  margin-left: 18vw;
  background-color: aquamarine;
  margin-top: 1rem;
}


/* 定义过渡的开始和结束状态 
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 1.0s;
}

.modal-enter-to, .modal-leave-from {
  opacity: 1;
}*/

</style>