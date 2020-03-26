import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import GstButton from '@/components/atoms/GstButton.vue'

Vue.use(Vuetify)

describe('GstButton', () => {
  describe('プロパティ', () => {
    describe('type', () => {
      describe('デフォルト', () => {
        it('btnクラスを持つbutton要素で構成されること', () => {
          const button = shallowMount(GstButton)
          expect(button.classes("btn")).toBe(true)
        })

        it('disabled属性が付与されていないこと', () => {
          const button = shallowMount(GstButton)
          expect(button.attributes().disabled).toBeUndefined()
        })

        it('tile属性が付与されていないこと', () => {
          const button = shallowMount(GstButton)
          expect(button.attributes().tile).toBeUndefined()
        })

        it('height属性が40であること', () => {
          const button = shallowMount(GstButton)
          expect(button.attributes().height).toBe("40")
        })

        it('loading属性が付与されていないこと', () => {
          const button = shallowMount(GstButton)
          expect(button.attributes().loading).toBeUndefined()
        })
      })

      describe('カスタマイズ', () => {
        it('test-btnクラスを持つbutton要素で構成されること', () => {
          const button = shallowMount(GstButton, {
            propsData: { classes: "test-btn" }
          })
          expect(button.classes("test-btn")).toBe(true)
        })

        it('disabled属性が付与されていること', () => {
          const button = shallowMount(GstButton, {
            propsData: { disabled: true }
          })
          expect(button.attributes().disabled).toBe("true")
        })

        it('tile属性が付与されていること', () => {
          const button = shallowMount(GstButton, {
            propsData: { tile: true }
          })
          expect(button.attributes().tile).toBe("true")
        })

        it('height属性が100であること', () => {
          const button = shallowMount(GstButton, {
            propsData: { height: 100 }
          })
          expect(button.attributes().height).toBe("100")
        })

        it('loading属性が付与されていること', () => {
          const button = shallowMount(GstButton, {
            propsData: { loading: true }
          })
          expect(button.attributes().loading).toBe("true")
        })
      })
    })
  })

  describe('イベント', () => {
    describe('click', () => {
      it('発行されていること', () => {
        const button = shallowMount(GstButton)
        button.vm.$emit('click', 123)
        expect(button.emitted().click).toBeTruthy()
        expect(button.emitted().click.length).toBe(1)
      })
    })
  })

  describe('slot', () => {
    describe('コンテンツ挿入あり', () => {
      it('挿入されていること', () => {
        const button = shallowMount(GstButton, {
          slots: { default: '<p>Hello World</p>' }
        })
        expect(button.text()).toBe('Hello World')
      })
    })

    describe('コンテンツ挿入なし', () => {
      it('挿入されていないこと', () => {
        const button = shallowMount(GstButton)
        expect(button.text()).toBe('')
      })
    })
  })
})
