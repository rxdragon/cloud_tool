<template>
  <div class="retouch-note">
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-chip class="ma-2" color="#edf0ff" label text-color="#4669FB">
              {{ '眼睛增大幅度：' + orderInfo.retouchClaims.eye }}
            </v-chip>
            <v-chip class="ma-2" color="#edf0ff" label text-color="#4669FB">
              {{ '瘦脸幅度：' + orderInfo.retouchClaims.face }}
            </v-chip>
            <v-chip v-if="orderInfo.requireLabel.pimples" class="ma-2" color="#edf0ff" label text-color="#4669FB">
              祛痣
            </v-chip>
            <v-divider></v-divider>
            <div class="order-note">
              <span class="inline-subtitle">
                修图备注：
              </span>
              <span class="ordernote-content">{{ orderInfo.orderNotes }}</span>
            </div>
            <v-divider></v-divider>
            <!-- 背景图要求 -->
            <div v-if="orderInfo.backgroundColor" class="panel-require">
              <div class="panel-main">
                <div class="panel-main-content">
                  <span class="title">背景图要求：</span>
                  <div class="content require-background-color">
                    <img :src="orderInfo.backgroundColor" alt="" />
                    <v-btn text @click="downloadImg(orderData.backgroundColor)">下载背景图</v-btn>
                  </div>
                </div>
                <div v-if="orderInfo.referencePhoto" class="panel-main-content">
                  <span class="title">参考图：</span>
                  <div class="content require-reference-photo">
                    <v-img
                      class="reference-img"
                      contain
                      :src="orderData.referencePhoto"
                      :lazy-src="orderData.referencePhoto"
                    >
                    </v-img>
                    <v-btn text @click="downloadImg(orderData.referencePhoto)">下载参考图</v-btn>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { SettingModule } from '@/store/modules/setting'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class RetouchNote extends Vue {
  @Prop({ type: Object, required: true }) orderInfo!: any
  get imgCompressDomain () {
    return SettingModule.compressDomain
  }
  downloadImg (val: any) {
    window.location.href = `${val}?attname=`
  }
}
</script>

<style lang="less" scoped>
.panel-require {
  .panel-main {
    padding: 20px;
    margin-top: 12px;
    background-color: #fafafa;
    border-radius: 4px;

    .panel-main-content {
      display: flex;
      padding: 20px 0;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      color: #303133;
      border-bottom: 1px solid @borderColor;

      .title {
        width: 90px;
      }

      .content {
        width: 632px;
      }

      .require-background-color {
        display: flex;
        align-items: center;

        img {
          width: 50px;
          height: 50px;
          margin-right: 10px;
        }
      }

      .require-reference-photo {
        display: flex;
        align-items: flex-end;

        .reference-img {
          width: 200px;
          height: 200px;
        }
      }
    }

    .panel-last-content {
      padding-bottom: 0;
      border: none;
    }
  }
}

.order-note {
  display: flex;
  padding: 12px 10px;
}

.inline-subtitle {
  width: 90px;
}

.ordernote-content {
  width: 100%;
}
</style>
