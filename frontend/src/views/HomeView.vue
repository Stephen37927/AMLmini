<template>
  <div class="home">
    <!-- 欢迎旗帜 -->
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

    <!-- 标题栏 按钮 -->
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

    <!-- generator信息 -->

    <!-- <div class="columns is-multiline">
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
      
    </div> -->

    <el-container direction="vertical" style="width:80%;padding-left: 17.5vw;">
      <el-table :data="paginatedData">
        <el-table-column
          prop="name"
          label="Name"
          width="180">
        </el-table-column>
        <el-table-column
          prop="size"
          label="Size"
          width="180">
        </el-table-column>
        <el-table-column
          prop="patterns"
          label="Patterns"
          width="180">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="Created at"
          width="180">
        </el-table-column>
        <el-table-column
          label="Actions"
          width="180">
          <template v-slot:default="scope">
            <el-tooltip class="item" effect="dark" content="Generate" placement="bottom">
              <el-button type="primary" icon="CirclePlusFilled"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Delete" placement="bottom">
              <el-button type="danger" icon="Delete" @click="deleteGenerator(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        
        </el-table-column>
      </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="generators.length"
      layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </el-container>

    
    <transition>
      <div v-if="isGenFormVisible" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Create Your Generator</p>
            <!-- <button @click="toggleFormVisibility" class="delete" aria-label="close"></button> -->
          </header>
          <section class="modal-card-body">
            
            <div class="field">
              <label class="label"> <span class="required">*</span> Name</label>
              <div class="control">
                <input class="input" type="text" placeholder="Name" v-model="form.name" required>
              </div>
            </div>
            <div class="field">
              <label class="label"> <span class="required">*</span> Size</label>
              <div class="control">
                <div class="select is-rounded is-medium">
                  <select v-model="form.size" required>
                    <option v-for="value in options" :key="value" :value="value">
                      {{ value }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label"> <span class="required">*</span> Patterns</label>
              <div class="control">
                <label class="checkbox" v-for="patternOption in patternOptions" :key="patternOption" style="margin-right:10px;">
                  <input type="checkbox"
                    :disabled="isNoneSelected && patternOption !== 'none'"
                    v-model="form.selectedPatterns"
                    :value="patternOption" required>
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
import axios from 'axios'

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
      pageSize: 5,
      currentPage: 1,
      
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
    patternIdToStr(patternIds){
      // patternIds are like [1,2] and the expected output is 'fan-in, fan-out'
      const patternMatches = {
        1: 'fan-in',
        2: 'fan-out'
      };
      return patternIds.map(id => patternMatches[id]).join(', ');
    },
    patternStrToId(patternStr){
      // patternStr is like 'fan-in, fan-out' and the expected output is [1,2]
      const patternMatches = {
        'fan-in': 1,
        'fan-out': 2
      };
      return patternStr.split(', ').map(str => patternMatches[str]);
    },
    saveForm() {

      if (!this.form.size || !this.form.name || !this.form.selectedPatterns.length) {
        alert('Please fill in all required fields.'); // 弹出错误提示
        return;
      }

      const patterns = this.patternStrToId(this.form.selectedPatterns.join(', '));
      const data = {
        name: this.form.name,
        size: this.form.size,
        patterns: patterns
      };
      axios
        .post('/generators/', data)
        .then(response => {
          console.log(response)
          this.getGenerators();
        })
        .catch(error => {
          console.log(error)
          
        })

      this.getGenerators();
      this.toggleFormVisibility();
      
    },
    deleteGenerator(id){
      axios
        .delete(`/generators/${id}/`)
        .then(response => {
          console.log(response)
          this.getGenerators();
        })
        .catch(error => {
          console.log(error)
          
        })
      this.getGenerators();
    },
    getGenerators() {
      axios
        .get('/generators')
        .then(response => {
          this.generators = response.data
            .map(generator => {
              return {
                ...generator,
                patterns: this.patternIdToStr(generator.patterns)
              }
            })
            // 添加排序逻辑
            .sort((a, b) => b.id - a.id);
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
    },
    network(){

    }
  },
  mounted() {
    this.getGenerators()

    document.title = 'Home | AMLmini'
  },
  computed: {
    isNoneSelected() {
      return this.form.selectedPatterns.includes('none')
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.generators.slice(start, end);
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

.required {
  color: red;
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