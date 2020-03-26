import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import GstAlertMessage from '@/components/atoms/GstAlertMessage.vue'

Vue.use(Vuetify)

describe('GstAlertMessage', () => {
  describe('プロパティ', () => {
    describe('type', () => {
      describe('デフォルト', () => {
        it('type属性がinfoであること', () => {
          const alert = shallowMount(GstAlertMessage);
          expect(alert.attributes().type).toBe("info");
        })

        it('messageが空であること', () => {
          const alert = shallowMount(GstAlertMessage);
          expect(alert.vm.message).toBe("");
        })
      })

      describe('カスタム', () => {
        it('type属性がerrorであること', () => {
          const alert = shallowMount(GstAlertMessage, {
            propsData: { alertType: "error" }
          });
          expect(alert.attributes().type).toBe("error");
        })

        it('messageが"HelloWorld"であること', () => {
          const alert = shallowMount(GstAlertMessage, {
            propsData: { message: "HelloWorld" }
          });
          expect(alert.vm.message).toBe("HelloWorld");
        })
      })
    })
  })
})